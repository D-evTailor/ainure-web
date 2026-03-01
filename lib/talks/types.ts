export type Specialty = "all" | "otorrinolaringologia" | "hematologia";

export const SPECIALTIES: Specialty[] = [
  "all",
  "otorrinolaringologia",
  "hematologia",
];

export const SPECIALTY_LABELS: Record<Specialty, string> = {
  all: "Todas",
  otorrinolaringologia: "ORL",
  hematologia: "Hematología",
};

export type CounterEntry = [label: string, count: number];

export type AnalyticsResult = {
  total: number;
  counters: {
    specialtyCount: CounterEntry[];
    q1: CounterEntry[];
    q2: CounterEntry[];
    q3: CounterEntry[];
    q4_1: CounterEntry[];
    q4_2: CounterEntry[];
    q5: CounterEntry[];
    q6: CounterEntry[];
    q7: CounterEntry[];
  };
  openAnswersQ8_1: string[];
  openAnswersQ8_2: string[];
  topTerms: CounterEntry[];
  readiness: {
    score: number;
    habitual: number;
    occasional: number;
    noUse: number;
  };
  highlights: {
    topPain: CounterEntry | null;
    topRepeat: CounterEntry | null;
    topBarrier: CounterEntry | null;
    topUseCase: CounterEntry | null;
    topIdealHelp: CounterEntry[];
  };
};

export type DashboardPayload = AnalyticsResult & {
  specialty: Specialty;
  fetchedAt: string;
};

export type Row = {
  id: string;
  created_at: string;
  specialty: string;
  answers: Record<string, unknown>;
};
