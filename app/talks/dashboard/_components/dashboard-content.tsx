"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  LabelList,
} from "recharts";
import {
  RefreshCw,
  Maximize,
  Users,
  Gauge,
  Hash,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  SPECIALTIES,
  SPECIALTY_LABELS,
  type Specialty,
  type DashboardPayload,
  type CounterEntry,
} from "@/lib/talks/types";

const REFRESH_MS = 30_000;

const BRAND_COLOR = "hsl(108, 30%, 38%)";
const BRAND_COLOR_MUTED = "hsl(108, 30%, 38% / 0.65)";

const DONUT_COLORS = [
  "hsl(108, 30%, 42%)",
  "hsl(112, 24%, 35%)",
  "hsl(150, 25%, 35%)",
  "hsl(44, 70%, 55%)",
  "hsl(28, 75%, 55%)",
  "hsl(200, 30%, 42%)",
  "hsl(270, 20%, 42%)",
  "hsl(0, 0%, 45%)",
];

function donutColor(index: number): string {
  return DONUT_COLORS[index % DONUT_COLORS.length];
}

function toBarData(entries: CounterEntry[], max?: number) {
  const sliced = max ? entries.slice(0, max) : entries;
  return sliced.map(([name, value]) => ({ name, value }));
}

// --- Horizontal Bar Chart (reusable) ---
// Labels above each bar instead of on Y axis to avoid truncation

function HorizontalBarSection({
  title,
  entries,
  maxItems = 8,
}: {
  title: string;
  entries: CounterEntry[];
  maxItems?: number;
}) {
  const data = toBarData(entries, maxItems);
  const config: ChartConfig = { value: { label: "Respuestas", color: BRAND_COLOR } };
  const rowHeight = 52;
  const chartHeight = Math.max(200, data.length * rowHeight);
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  if (data.length === 0) {
    return (
      <Card className="border-border bg-card/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-text-muted">Sin datos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {data.map((item) => {
            const isTop = item.value === maxValue;
            const widthPercent = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            return (
              <div key={item.name}>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <span className="text-xs leading-tight text-text-secondary">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-xs font-semibold tabular-nums text-text-primary">
                    {item.value}
                  </span>
                </div>
                <div className="h-5 w-full overflow-hidden rounded bg-surface-overlay/50">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: isTop ? BRAND_COLOR : BRAND_COLOR_MUTED,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Donut Pie Chart ---

function DonutSection({
  title,
  entries,
  centerLabel,
}: {
  title: string;
  entries: CounterEntry[];
  centerLabel?: string;
}) {
  const data = entries.map(([name, value]) => ({ name, value }));
  const config: Record<string, { label: string; color: string }> = {};
  for (let i = 0; i < data.length; i++) {
    config[data[i].name] = { label: data[i].name, color: donutColor(i) };
  }

  if (data.length === 0) {
    return (
      <Card className="border-border bg-card/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-text-muted">Sin datos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="80%"
              strokeWidth={2}
              stroke="hsl(0 0% 2%)"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={donutColor(i)} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        {centerLabel && (
          <p className="-mt-2 text-center text-xs text-text-muted">{centerLabel}</p>
        )}
        <div className="mt-3 space-y-1.5">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: donutColor(i) }}
              />
              <span className="flex-1 text-text-secondary">{d.name}</span>
              <span className="font-semibold tabular-nums text-text-primary">{d.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Radial Bar (AI Readiness) ---

function RadialReadinessSection({
  readiness,
  entries,
}: {
  readiness: DashboardPayload["readiness"];
  entries: CounterEntry[];
}) {
  const data = entries.map(([name, value], i) => ({
    name,
    value,
    fill: donutColor(i),
  }));
  const config: Record<string, { label: string; color: string }> = {};
  for (let i = 0; i < data.length; i++) {
    config[data[i].name] = { label: data[i].name, color: donutColor(i) };
  }

  return (
    <Card className="border-border bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">
          Q4.1 — Nivel de uso de IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ChartContainer config={config} className="mx-auto aspect-square max-h-[220px]">
            <RadialBarChart
              data={data}
              innerRadius="25%"
              outerRadius="85%"
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, Math.max(...data.map((d) => d.value), 1)]} tick={false} axisLine={false} />
              <RadialBar dataKey="value" cornerRadius={4} />
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-ainure-300">{readiness.score}%</p>
              <p className="text-xs text-text-muted">Readiness</p>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          {data.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <div
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: donutColor(i) }}
              />
              <span className="flex-1 text-text-secondary">{d.name}</span>
              <span className="font-semibold tabular-nums text-text-primary">{d.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Top Keywords List (replaces Treemap) ---

function TopKeywordsSection({
  title,
  entries,
}: {
  title: string;
  entries: CounterEntry[];
}) {
  const top = entries.slice(0, 8);
  const maxCount = top.length > 0 ? top[0][1] : 1;

  if (top.length === 0) {
    return (
      <Card className="border-border bg-card/80">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="py-8 text-center text-sm text-text-muted">Sin datos</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {top.map(([term, count], i) => {
            const widthPercent = (count / maxCount) * 100;
            return (
              <div key={term} className="flex items-center gap-3">
                <Hash className="h-3 w-3 shrink-0 text-ainure-300/60" />
                <div className="flex-1">
                  <div className="mb-0.5 flex items-baseline justify-between">
                    <span className="text-sm font-medium text-text-primary">{term}</span>
                    <span className="text-xs tabular-nums text-text-muted">{count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-overlay/50">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${widthPercent}%`,
                        backgroundColor: i === 0 ? BRAND_COLOR : BRAND_COLOR_MUTED,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Open Answers Panel (separated Q8.1 and Q8.2) ---

function AnswersList({ answers }: { answers: string[] }) {
  if (answers.length === 0) {
    return <p className="py-6 text-center text-sm text-text-muted">Sin respuestas</p>;
  }
  return (
    <ul className="max-h-80 space-y-2 overflow-y-auto">
      {answers.map((answer, i) => (
        <li
          key={i}
          className="rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-text-secondary"
        >
          {answer}
        </li>
      ))}
    </ul>
  );
}

function OpenAnswersPanel({
  answersQ8_1,
  answersQ8_2,
}: {
  answersQ8_1: string[];
  answersQ8_2: string[];
}) {
  const totalCount = answersQ8_1.length + answersQ8_2.length;
  if (totalCount === 0) return null;

  return (
    <Card className="border-border bg-card/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-text-secondary">
          Q8 — Respuestas abiertas ({totalCount})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="q8_1">
          <TabsList className="mb-4 w-full border border-border bg-surface-elevated">
            <TabsTrigger value="q8_1" className="flex-1 text-xs">
              Q8.1 — Tarea a eliminar ({answersQ8_1.length})
            </TabsTrigger>
            <TabsTrigger value="q8_2" className="flex-1 text-xs">
              Q8.2 — Varita mágica ({answersQ8_2.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="q8_1">
            <AnswersList answers={answersQ8_1} />
          </TabsContent>
          <TabsContent value="q8_2">
            <AnswersList answers={answersQ8_2} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// --- KPI Cards ---

function KpiCard({
  label,
  value,
  subtitle,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="border-border bg-card/80">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ainure-500/30 bg-ainure-900/25">
          <Icon className="h-6 w-6 text-ainure-300" />
        </div>
        <div>
          <p className="text-xs text-text-muted">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-text-primary">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-text-secondary">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Loading Skeleton ---

function DashboardSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="border-border bg-card/80">
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// --- Main Dashboard Content ---

type DashboardContentProps = {
  pin: string;
};

export function DashboardContent({ pin }: DashboardContentProps) {
  const [specialty, setSpecialty] = useState<Specialty>("all");
  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchData = useCallback(
    async (selectedSpecialty: Specialty) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/talks/dashboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin, specialty: selectedSpecialty }),
        });
        if (!response.ok) {
          const body = (await response.json().catch(() => ({}))) as {
            error?: string;
          };
          setError(body.error ?? "Error al cargar datos");
          return;
        }
        const payload = (await response.json()) as DashboardPayload;
        setData(payload);
        setLastRefreshed(new Date());
      } catch {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    },
    [pin],
  );

  // Initial fetch + auto-refresh
  useEffect(() => {
    fetchData(specialty);

    intervalRef.current = setInterval(() => {
      fetchData(specialty);
    }, REFRESH_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [specialty, fetchData]);

  function handleSpecialtyChange(value: string) {
    setSpecialty(value as Specialty);
  }

  function handleManualRefresh() {
    fetchData(specialty);
  }

  function handleFullscreen() {
    document.documentElement.requestFullscreen?.();
  }

  const timeSinceRefresh = lastRefreshed
    ? `${Math.round((Date.now() - lastRefreshed.getTime()) / 1000)}s`
    : "—";

  return (
    <div className="app-page">
      <div className="app-container">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">
                Dashboard <span className="text-ainure-300">TALKS</span>
              </h1>
              <p className="text-sm text-text-muted">
                Resultados del cuestionario en tiempo real
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Tabs value={specialty} onValueChange={handleSpecialtyChange}>
                <TabsList className="border border-border bg-surface-elevated">
                  {SPECIALTIES.map((s) => (
                    <TabsTrigger key={s} value={s} className="text-xs">
                      {SPECIALTY_LABELS[s]}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">
                  Hace {timeSinceRefresh}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleManualRefresh}
                  disabled={loading}
                  className="h-8 w-8 border-border"
                >
                  <RefreshCw
                    className={cn("h-3.5 w-3.5", loading && "animate-spin")}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFullscreen}
                  className="h-8 w-8 border-border"
                >
                  <Maximize className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {!data && loading ? (
            <DashboardSkeleton />
          ) : data ? (
            <>
              {/* KPIs */}
              <div className="grid gap-6 sm:grid-cols-2">
                <KpiCard
                  label="Total respuestas"
                  value={data.total}
                  subtitle={`Especialidad: ${SPECIALTY_LABELS[data.specialty]}`}
                  icon={Users}
                />
                <KpiCard
                  label="AI Readiness Score"
                  value={`${data.readiness.score}%`}
                  subtitle={`${data.readiness.habitual} habitual · ${data.readiness.occasional} ocasional`}
                  icon={Gauge}
                />
              </div>

              {/* Row 1: Q1 Profile + Q4.1 Readiness */}
              <div className="grid gap-6 lg:grid-cols-2">
                <DonutSection
                  title="Q1 — Perfil profesional"
                  entries={data.counters.q1}
                  centerLabel={`n = ${data.total}`}
                />
                <RadialReadinessSection
                  readiness={data.readiness}
                  entries={data.counters.q4_1}
                />
              </div>

              {/* Row 2: Q2 Pain (full width) */}
              <HorizontalBarSection
                title="Q2 — Dolor principal del día a día"
                entries={data.counters.q2}
                maxItems={8}
              />

              {/* Row 3: Q3 Tasks (full width) */}
              <HorizontalBarSection
                title="Q3 — Tareas repetitivas a automatizar"
                entries={data.counters.q3}
                maxItems={8}
              />

              {/* Row 4: Q5 Ideal Help + Q6 Barrier */}
              <div className="grid gap-6 lg:grid-cols-2">
                <HorizontalBarSection
                  title="Q5 — Escenario ideal de ayuda con IA"
                  entries={data.counters.q5}
                  maxItems={6}
                />
                <DonutSection
                  title="Q6 — Barrera principal para adoptar IA"
                  entries={data.counters.q6}
                />
              </div>

              {/* Row 5: Q7 Use Cases (full width) */}
              <HorizontalBarSection
                title="Q7 — Casos de uso más demandados para la charla"
                entries={data.counters.q7}
              />

              {/* Row 6: Q4.2 Tools + Q8 Keywords */}
              <div className="grid gap-6 lg:grid-cols-2">
                <HorizontalBarSection
                  title="Q4.2 — Herramientas de IA ya utilizadas"
                  entries={data.counters.q4_2}
                />
                <TopKeywordsSection
                  title="Q8 — Temas recurrentes (respuestas abiertas)"
                  entries={data.topTerms}
                />
              </div>

              {/* Row 7: Open Answers (tabbed Q8.1 / Q8.2) */}
              <OpenAnswersPanel
                answersQ8_1={data.openAnswersQ8_1}
                answersQ8_2={data.openAnswersQ8_2}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
