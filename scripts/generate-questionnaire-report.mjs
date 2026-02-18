#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PAGE_SIZE = 1000;

const STOPWORDS = new Set([
  "para",
  "como",
  "pero",
  "porque",
  "donde",
  "desde",
  "hasta",
  "entre",
  "sobre",
  "cuando",
  "tener",
  "hacer",
  "puede",
  "puedo",
  "seria",
  "estar",
  "esta",
  "este",
  "estos",
  "estas",
  "ellos",
  "ellas",
  "nosotros",
  "ustedes",
  "ellos",
  "ellas",
  "mucho",
  "muchos",
  "poco",
  "pocos",
  "ademas",
  "tambien",
  "solo",
  "toda",
  "todas",
  "todos",
  "cada",
  "otra",
  "otro",
  "otras",
  "otros",
  "nada",
  "siempre",
  "nunca",
  "sobre",
  "luego",
  "aqui",
  "alli",
  "esto",
  "eso",
  "esa",
  "ese",
  "una",
  "uno",
  "unos",
  "unas",
  "con",
  "sin",
  "del",
  "que",
  "por",
  "los",
  "las",
  "sus",
  "mis",
  "muy",
  "mas",
  "menos",
  "dia",
  "dias",
  "trabajo",
  "tarea",
  "tareas",
]);

function parseArgs() {
  const argMap = {};
  for (const arg of process.argv.slice(2)) {
    const [key, value] = arg.split("=");
    if (!key?.startsWith("--")) continue;
    argMap[key.slice(2)] = value ?? "true";
  }
  return {
    specialty: argMap.specialty || "",
    output: argMap.output || "",
  };
}

function loadEnvLocal(envPath) {
  const envMap = {};
  if (!fs.existsSync(envPath)) return envMap;

  const content = fs.readFileSync(envPath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    envMap[key] = value;
  }
  return envMap;
}

function toPercentage(value, total) {
  if (!total) return "0.0%";
  return `${((value / total) * 100).toFixed(1)}%`;
}

function incrementCount(counter, key) {
  if (!key) return;
  counter.set(key, (counter.get(key) || 0) + 1);
}

function countSingle(rows, key) {
  const counter = new Map();
  for (const row of rows) {
    incrementCount(counter, row.answers?.[key]);
  }
  return counter;
}

function countTopLevel(rows, key) {
  const counter = new Map();
  for (const row of rows) {
    incrementCount(counter, row?.[key]);
  }
  return counter;
}

function countMulti(rows, key) {
  const counter = new Map();
  for (const row of rows) {
    const values = row.answers?.[key];
    if (!Array.isArray(values)) continue;
    for (const value of values) incrementCount(counter, value);
  }
  return counter;
}

function mapToSortedEntries(counter) {
  return [...counter.entries()].sort((a, b) => b[1] - a[1]);
}

function formatCounterSection(title, counter, totalResponses) {
  const entries = mapToSortedEntries(counter);
  if (entries.length === 0) return `### ${title}\n\nSin datos.\n`;
  const lines = entries.map(
    ([label, count]) => `- ${label}: ${count} (${toPercentage(count, totalResponses)})`,
  );
  return `### ${title}\n\n${lines.join("\n")}\n`;
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function getTopEntries(counter, limit = 3) {
  return mapToSortedEntries(counter).slice(0, limit);
}

function getTopEntry(counter) {
  return getTopEntries(counter, 1)[0] || null;
}

function getAnswersValue(row, key, fallbackKey) {
  if (row?.answers?.[key] !== undefined) return row.answers[key];
  if (fallbackKey && row?.answers?.[fallbackKey] !== undefined) return row.answers[fallbackKey];
  return undefined;
}

function countSingleWithFallback(rows, key, fallbackKey) {
  const counter = new Map();
  for (const row of rows) {
    incrementCount(counter, getAnswersValue(row, key, fallbackKey));
  }
  return counter;
}

function countMultiWithFallback(rows, key, fallbackKey) {
  const counter = new Map();
  for (const row of rows) {
    const values = getAnswersValue(row, key, fallbackKey);
    if (!Array.isArray(values)) continue;
    for (const value of values) incrementCount(counter, value);
  }
  return counter;
}

function buildAnalytics(rows) {
  const total = rows.length;
  const specialtyCount = countTopLevel(rows, "specialty");
  const q1 = countSingle(rows, "q1_profile");
  const q2 = countMulti(rows, "q2_main_pain");
  const q3 = countMulti(rows, "q3_repetitive_tasks");
  const q4_1 = countSingleWithFallback(rows, "q4_1_ai_usage", "q4_ai_usage");
  const q4_2 = countMultiWithFallback(rows, "q4_2_used_tools");
  const q5 = countMultiWithFallback(rows, "q5_assistant_help", "q5_ideal_ai_help");
  const q6 = countSingleWithFallback(rows, "q6_main_barrier", "q7_main_barrier");
  const q7 = countMultiWithFallback(rows, "q7_use_cases");

  const openAnswers = rows
    .flatMap((r) => [
      getAnswersValue(r, "q8_1_open_answer", "q8_open_answer"),
      getAnswersValue(r, "q8_2_open_answer"),
    ])
    .filter((v) => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);
  const topTerms = extractTopTerms(openAnswers);

  const habitual = q4_1.get("Si, de forma habitual") || 0;
  const occasional = q4_1.get("Si, alguna vez") || 0;
  const noUse = (q4_1.get("No, nunca") || 0) + (q4_1.get("He oido hablar, pero no la uso") || 0);
  const readinessScore = total ? Math.round(((habitual + occasional) / total) * 100) : 0;

  const topPain = getTopEntry(q2);
  const topRepeat = getTopEntry(q3);
  const topBarrier = getTopEntry(q6);
  const topUseCase = getTopEntry(q7);

  return {
    total,
    counters: { specialtyCount, q1, q2, q3, q4_1, q4_2, q5, q6, q7 },
    openAnswers,
    topTerms,
    readiness: {
      score: readinessScore,
      habitual,
      occasional,
      noUse,
    },
    highlights: {
      topPain,
      topRepeat,
      topBarrier,
      topUseCase,
      topIdealHelp: getTopEntries(q5, 3),
    },
  };
}

function buildInsightsSection(analytics) {
  const { total, highlights, readiness } = analytics;
  if (!total) return "## Insights automaticos\n\nSin datos para generar insights.\n";

  const lines = ["## Insights automaticos", ""];

  if (highlights.topPain) {
    lines.push(
      `- Dolor dominante: **${highlights.topPain[0]}** con ${highlights.topPain[1]} respuestas (${toPercentage(highlights.topPain[1], total)}).`,
    );
  }
  if (highlights.topRepeat) {
    lines.push(
      `- Tarea mas repetitiva: **${highlights.topRepeat[0]}** con ${highlights.topRepeat[1]} menciones (${toPercentage(highlights.topRepeat[1], total)}).`,
    );
  }
  if (highlights.topUseCase) {
    lines.push(
      `- Caso de uso mas demandado para la charla: **${highlights.topUseCase[0]}** (${toPercentage(highlights.topUseCase[1], total)}).`,
    );
  }
  if (highlights.topBarrier) {
    lines.push(
      `- Barrera principal: **${highlights.topBarrier[0]}** (${toPercentage(highlights.topBarrier[1], total)}).`,
    );
  }

  lines.push(
    `- Nivel de madurez de adopcion IA (uso habitual + ocasional): **${readiness.score}%** (${readiness.habitual + readiness.occasional}/${total}).`,
  );

  lines.push("", "### Recomendaciones de accion", "");
  lines.push("- Pilotar primero el caso de uso mas votado en Q7 con un equipo pequeno (2-4 semanas).");
  lines.push(
    "- Atacar la barrera principal con una intervencion concreta: formacion corta, guia de privacidad o integracion tecnica.",
  );
  lines.push(
    "- Construir una plantilla o flujo para la tarea repetitiva dominante y medir ahorro en minutos por profesional.",
  );
  lines.push("");

  return lines.join("\n");
}

function buildSummaryCsv(analytics) {
  const rows = [["question", "option", "count", "percentage"]];
  const sections = [
    ["specialty", analytics.counters.specialtyCount],
    ["q1_profile", analytics.counters.q1],
    ["q2_main_pain", analytics.counters.q2],
    ["q3_repetitive_tasks", analytics.counters.q3],
    ["q4_1_ai_usage", analytics.counters.q4_1],
    ["q4_2_used_tools", analytics.counters.q4_2],
    ["q5_assistant_help", analytics.counters.q5],
    ["q6_main_barrier", analytics.counters.q6],
    ["q7_use_cases", analytics.counters.q7],
  ];

  for (const [question, counter] of sections) {
    for (const [option, count] of mapToSortedEntries(counter)) {
      rows.push([question, option, String(count), toPercentage(count, analytics.total)]);
    }
  }

  return rows.map((line) => line.map(csvEscape).join(",")).join("\n");
}

function buildResponsesCsv(rows) {
  const header = [
    "id",
    "created_at",
    "specialty",
    "q1_profile",
    "q2_main_pain",
    "q2_other",
    "q3_repetitive_tasks",
    "q3_other",
    "q4_1_ai_usage",
    "q4_2_used_tools",
    "q4_2_other",
    "q5_assistant_help",
    "q5_other",
    "q6_main_barrier",
    "q7_use_cases",
    "q7_other",
    "q8_1_open_answer",
    "q8_2_open_answer",
  ];

  const lines = [header];
  for (const row of rows) {
    const answers = row.answers || {};
    lines.push([
      row.id || "",
      row.created_at || "",
      row.specialty || "",
      answers.q1_profile || "",
      Array.isArray(answers.q2_main_pain) ? answers.q2_main_pain.join(" | ") : "",
      answers.q2_other || "",
      Array.isArray(answers.q3_repetitive_tasks) ? answers.q3_repetitive_tasks.join(" | ") : "",
      answers.q3_other || "",
      getAnswersValue(row, "q4_1_ai_usage", "q4_ai_usage") || "",
      Array.isArray(getAnswersValue(row, "q4_2_used_tools")) ? getAnswersValue(row, "q4_2_used_tools").join(" | ") : "",
      getAnswersValue(row, "q4_2_other") || "",
      Array.isArray(getAnswersValue(row, "q5_assistant_help", "q5_ideal_ai_help")) ? getAnswersValue(row, "q5_assistant_help", "q5_ideal_ai_help").join(" | ") : "",
      getAnswersValue(row, "q5_other") || "",
      getAnswersValue(row, "q6_main_barrier", "q7_main_barrier") || "",
      Array.isArray(getAnswersValue(row, "q7_use_cases")) ? getAnswersValue(row, "q7_use_cases").join(" | ") : "",
      getAnswersValue(row, "q7_other") || "",
      getAnswersValue(row, "q8_1_open_answer", "q8_open_answer") || "",
      getAnswersValue(row, "q8_2_open_answer") || "",
    ]);
  }

  return lines.map((line) => line.map(csvEscape).join(",")).join("\n");
}

function extractTopTerms(textList, maxTerms = 12) {
  const termCounter = new Map();
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

async function fetchAllResponses({ supabaseUrl, supabaseServiceRoleKey, specialty }) {
  const all = [];
  let offset = 0;

  while (true) {
    const query = new URLSearchParams({
      select: "id,specialty,answers,created_at",
      order: "created_at.asc",
    });
    if (specialty) query.append("specialty", `eq.${specialty}`);

    const response = await fetch(
      `${supabaseUrl}/rest/v1/talks_questionnaire_responses?${query.toString()}`,
      {
        method: "GET",
        headers: {
          apikey: supabaseServiceRoleKey,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          Range: `${offset}-${offset + PAGE_SIZE - 1}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Error consultando Supabase (${response.status}): ${details}`);
    }

    const batch = await response.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return all;
}

function buildMarkdownReport(rows, specialtyFilter, analytics) {
  const total = analytics.total;
  const createdAtList = rows
    .map((r) => r.created_at)
    .filter(Boolean)
    .map((v) => new Date(v))
    .filter((d) => !Number.isNaN(d.getTime()));
  const firstDate = createdAtList[0];
  const lastDate = createdAtList[createdAtList.length - 1];

  const { specialtyCount, q1, q2, q3, q4_1, q4_2, q5, q6, q7 } = analytics.counters;
  const openAnswers = analytics.openAnswers;
  const topTerms = analytics.topTerms;

  const header = [
    "# Informe local de cuestionarios IA",
    "",
    `- Fecha de generacion: ${new Date().toISOString()}`,
    `- Especialidad filtrada: ${specialtyFilter || "todas"}`,
    `- Total respuestas analizadas: ${total}`,
    firstDate ? `- Primera respuesta: ${firstDate.toISOString()}` : "- Primera respuesta: N/A",
    lastDate ? `- Ultima respuesta: ${lastDate.toISOString()}` : "- Ultima respuesta: N/A",
    "",
  ].join("\n");

  const sections = [
    formatCounterSection("Distribucion por especialidad", specialtyCount, total),
    formatCounterSection("Q1 - Perfil profesional", q1, total),
    formatCounterSection("Q2 - Dolor principal", q2, total),
    formatCounterSection("Q3 - Tareas repetitivas", q3, total),
    formatCounterSection("Q4.1 - Uso actual de IA", q4_1, total),
    formatCounterSection("Q4.2 - Herramientas usadas", q4_2, total),
    formatCounterSection("Q5 - Escenario ideal de ayuda", q5, total),
    formatCounterSection("Q6 - Barrera principal", q6, total),
    formatCounterSection("Q7 - Casos de uso para la charla", q7, total),
  ].join("\n");

  const termsSection =
    topTerms.length === 0
      ? "### Q8 - Terminos mas repetidos (preguntas abiertas)\n\nSin datos.\n"
      : [
          "### Q8 - Terminos mas repetidos (preguntas abiertas)",
          "",
          ...topTerms.map(([term, count]) => `- ${term}: ${count}`),
          "",
        ].join("\n");

  const openAnswersSection =
    openAnswers.length === 0
      ? "### Q8 - Respuestas abiertas (8.1 + 8.2)\n\nSin datos.\n"
      : [
          "### Q8 - Respuestas abiertas (8.1 + 8.2)",
          "",
          ...openAnswers.map((text, index) => `${index + 1}. ${text}`),
          "",
        ].join("\n");

  const insights = buildInsightsSection(analytics);

  const notes = [
    "## Sugerencias para conclusiones",
    "",
    "- Prioriza los 3 bloques con mas volumen en Q2 y Q3 para detectar tareas de alto impacto.",
    "- Cruza Q7 (casos de uso) con Q6 (barreras) para decidir pilotos realistas.",
    "- Usa Q8 para extraer necesidades concretas no cubiertas por las opciones cerradas.",
    "",
  ].join("\n");

  return [header, sections, insights, termsSection, openAnswersSection, notes].join("\n");
}

async function main() {
  const args = parseArgs();
  const scriptPath = fileURLToPath(import.meta.url);
  const projectRoot = path.resolve(path.dirname(scriptPath), "..");
  const envPath = path.join(projectRoot, ".env.local");
  const localEnv = loadEnvLocal(envPath);

  const supabaseUrl = process.env.SUPABASE_URL || localEnv.SUPABASE_URL;
  const supabaseServiceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || localEnv.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Faltan variables SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY. Revisa packages/web/.env.local",
    );
  }

  const rows = await fetchAllResponses({
    supabaseUrl,
    supabaseServiceRoleKey,
    specialty: args.specialty,
  });

  const analytics = buildAnalytics(rows);
  const report = buildMarkdownReport(rows, args.specialty, analytics);
  const summaryCsv = buildSummaryCsv(analytics);
  const responsesCsv = buildResponsesCsv(rows);
  const reportsDir = path.join(projectRoot, "reports");
  fs.mkdirSync(reportsDir, { recursive: true });

  const filename =
    args.output ||
    `questionnaire-report-${new Date().toISOString().replace(/[:.]/g, "-")}.md`;
  const mdOutputPath = path.isAbsolute(filename) ? filename : path.join(reportsDir, filename);
  const parsedOutput = path.parse(mdOutputPath);
  const baseNoExt = path.join(parsedOutput.dir, parsedOutput.name);
  const summaryCsvPath = `${baseNoExt}.summary.csv`;
  const responsesCsvPath = `${baseNoExt}.responses.csv`;
  const insightsJsonPath = `${baseNoExt}.insights.json`;

  fs.writeFileSync(mdOutputPath, report, "utf8");
  fs.writeFileSync(summaryCsvPath, summaryCsv, "utf8");
  fs.writeFileSync(responsesCsvPath, responsesCsv, "utf8");
  fs.writeFileSync(
    insightsJsonPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        specialtyFilter: args.specialty || "todas",
        totalResponses: analytics.total,
        readiness: analytics.readiness,
        highlights: analytics.highlights,
        topTerms: analytics.topTerms,
      },
      null,
      2,
    ),
    "utf8",
  );

  // eslint-disable-next-line no-console
  console.log(`Informe generado: ${mdOutputPath}`);
  // eslint-disable-next-line no-console
  console.log(`CSV resumen generado: ${summaryCsvPath}`);
  // eslint-disable-next-line no-console
  console.log(`CSV respuestas generado: ${responsesCsvPath}`);
  // eslint-disable-next-line no-console
  console.log(`JSON insights generado: ${insightsJsonPath}`);
  // eslint-disable-next-line no-console
  console.log(`Respuestas analizadas: ${rows.length}`);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Error generando informe:", error instanceof Error ? error.message : error);
  process.exit(1);
});
