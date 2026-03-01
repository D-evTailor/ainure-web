import type { Row, CounterEntry, AnalyticsResult } from "./types";

const STOPWORDS = new Set([
  "para", "como", "pero", "porque", "donde", "desde", "hasta", "entre",
  "sobre", "cuando", "tener", "hacer", "puede", "puedo", "seria", "estar",
  "esta", "este", "estos", "estas", "ellos", "ellas", "nosotros", "ustedes",
  "mucho", "muchos", "poco", "pocos", "ademas", "tambien", "solo", "toda",
  "todas", "todos", "cada", "otra", "otro", "otras", "otros", "nada",
  "siempre", "nunca", "sobre", "luego", "aqui", "alli", "esto", "eso",
  "esa", "ese", "una", "uno", "unos", "unas", "con", "sin", "del", "que",
  "por", "los", "las", "sus", "mis", "muy", "mas", "menos", "dia", "dias",
  "trabajo", "tarea", "tareas", "cosa", "cosas", "algo", "mismo", "misma",
  "poder", "podria", "seria", "haber", "tiene", "tiempo", "forma",
  "manera", "tipo", "mejor", "mayor", "menor",
]);

function incrementCount(counter: Map<string, number>, key: string): void {
  if (!key) return;
  counter.set(key, (counter.get(key) ?? 0) + 1);
}

function mapToSortedEntries(counter: Map<string, number>): CounterEntry[] {
  return [...counter.entries()].sort((a, b) => b[1] - a[1]);
}

function getAnswersValue(
  row: Row,
  key: string,
  fallbackKey?: string,
): unknown {
  if (row.answers?.[key] !== undefined) return row.answers[key];
  if (fallbackKey && row.answers?.[fallbackKey] !== undefined)
    return row.answers[fallbackKey];
  return undefined;
}

function countSingle(rows: Row[], key: string): Map<string, number> {
  const counter = new Map<string, number>();
  for (const row of rows) {
    const value = row.answers?.[key];
    if (typeof value === "string") incrementCount(counter, value);
  }
  return counter;
}

function countMulti(rows: Row[], key: string): Map<string, number> {
  const counter = new Map<string, number>();
  for (const row of rows) {
    const values = row.answers?.[key];
    if (!Array.isArray(values)) continue;
    for (const value of values) {
      if (typeof value === "string") incrementCount(counter, value);
    }
  }
  return counter;
}

function countTopLevel(rows: Row[], key: string): Map<string, number> {
  const counter = new Map<string, number>();
  for (const row of rows) {
    const value = (row as Record<string, unknown>)[key];
    if (typeof value === "string") incrementCount(counter, value);
  }
  return counter;
}

function countSingleWithFallback(
  rows: Row[],
  key: string,
  fallbackKey?: string,
): Map<string, number> {
  const counter = new Map<string, number>();
  for (const row of rows) {
    const value = getAnswersValue(row, key, fallbackKey);
    if (typeof value === "string") incrementCount(counter, value);
  }
  return counter;
}

function countMultiWithFallback(
  rows: Row[],
  key: string,
  fallbackKey?: string,
): Map<string, number> {
  const counter = new Map<string, number>();
  for (const row of rows) {
    const values = getAnswersValue(row, key, fallbackKey);
    if (!Array.isArray(values)) continue;
    for (const value of values) {
      if (typeof value === "string") incrementCount(counter, value);
    }
  }
  return counter;
}

function extractTopTerms(
  textList: string[],
  maxTerms = 12,
): CounterEntry[] {
  const termCounter = new Map<string, number>();
  for (const text of textList) {
    const tokens = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 4 && !STOPWORDS.has(token));
    for (const token of tokens) {
      incrementCount(termCounter, token);
    }
  }
  return mapToSortedEntries(termCounter).slice(0, maxTerms);
}

function getTopEntries(
  counter: Map<string, number>,
  limit = 3,
): CounterEntry[] {
  return mapToSortedEntries(counter).slice(0, limit);
}

function getTopEntry(counter: Map<string, number>): CounterEntry | null {
  return getTopEntries(counter, 1)[0] ?? null;
}

export function buildAnalytics(rows: Row[]): AnalyticsResult {
  const total = rows.length;
  const specialtyCount = countTopLevel(rows, "specialty");
  const q1 = countSingle(rows, "q1_profile");
  const q2 = countMulti(rows, "q2_main_pain");
  const q3 = countMulti(rows, "q3_repetitive_tasks");
  const q4_1 = countSingleWithFallback(rows, "q4_1_ai_usage", "q4_ai_usage");
  const q4_2 = countMultiWithFallback(rows, "q4_2_used_tools");
  const q5 = countMultiWithFallback(
    rows,
    "q5_assistant_help",
    "q5_ideal_ai_help",
  );
  const q6 = countSingleWithFallback(
    rows,
    "q6_main_barrier",
    "q7_main_barrier",
  );
  const q7 = countMultiWithFallback(rows, "q7_use_cases");

  const openAnswersQ8_1 = rows
    .map((r) => getAnswersValue(r, "q8_1_open_answer", "q8_open_answer"))
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);

  const openAnswersQ8_2 = rows
    .map((r) => getAnswersValue(r, "q8_2_open_answer"))
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);

  const allOpenAnswers = [...openAnswersQ8_1, ...openAnswersQ8_2];
  const topTerms = extractTopTerms(allOpenAnswers);

  const habitual =
    q4_1.get("Sí, de forma habitual") ??
    q4_1.get("Si, de forma habitual") ??
    0;
  const occasional =
    q4_1.get("Sí, alguna vez") ?? q4_1.get("Si, alguna vez") ?? 0;
  const noUse =
    (q4_1.get("No, nunca") ?? 0) +
    (q4_1.get("He oído hablar, pero no la uso") ??
      q4_1.get("He oido hablar, pero no la uso") ??
      0);
  const readinessScore = total
    ? Math.round(((habitual + occasional) / total) * 100)
    : 0;

  return {
    total,
    counters: {
      specialtyCount: mapToSortedEntries(specialtyCount),
      q1: mapToSortedEntries(q1),
      q2: mapToSortedEntries(q2),
      q3: mapToSortedEntries(q3),
      q4_1: mapToSortedEntries(q4_1),
      q4_2: mapToSortedEntries(q4_2),
      q5: mapToSortedEntries(q5),
      q6: mapToSortedEntries(q6),
      q7: mapToSortedEntries(q7),
    },
    openAnswersQ8_1,
    openAnswersQ8_2,
    topTerms,
    readiness: {
      score: readinessScore,
      habitual,
      occasional,
      noUse,
    },
    highlights: {
      topPain: getTopEntry(q2),
      topRepeat: getTopEntry(q3),
      topBarrier: getTopEntry(q6),
      topUseCase: getTopEntry(q7),
      topIdealHelp: getTopEntries(q5, 3),
    },
  };
}
