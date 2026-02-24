import { NextResponse } from "next/server";
import { z } from "zod";
import { buildAnalytics } from "@/lib/talks/analytics";
import type { Row, DashboardPayload, Specialty } from "@/lib/talks/types";

const SUPABASE_TIMEOUT_MS = 10_000;
const PAGE_SIZE = 1000;

const requestSchema = z.object({
  pin: z.string().min(1).max(20),
  specialty: z
    .enum(["all", "otorrinolaringologia", "hematologia"])
    .default("all"),
});

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

async function fetchAllResponses(
  supabaseUrl: string,
  supabaseServiceRoleKey: string,
  specialty: Specialty,
): Promise<Row[]> {
  const all: Row[] = [];
  let offset = 0;

  while (true) {
    const query = new URLSearchParams({
      select: "id,specialty,answers,created_at",
      order: "created_at.asc",
    });
    if (specialty !== "all") {
      query.append("specialty", `eq.${specialty}`);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SUPABASE_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(
        `${supabaseUrl}/rest/v1/talks_questionnaire_responses?${query.toString()}`,
        {
          method: "GET",
          headers: {
            apikey: supabaseServiceRoleKey,
            Authorization: `Bearer ${supabaseServiceRoleKey}`,
            Range: `${offset}-${offset + PAGE_SIZE - 1}`,
          },
          cache: "no-store",
          signal: controller.signal,
        },
      );
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const details = await response.text();
      throw new Error(
        `Supabase query failed (${response.status}): ${details}`,
      );
    }

    const batch = (await response.json()) as Row[];
    if (!Array.isArray(batch) || batch.length === 0) break;

    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }

  return all;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type invalido." },
      { status: 415 },
    );
  }

  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload invalido." },
        { status: 400 },
      );
    }

    const expectedPin = process.env.DASHBOARD_PIN;
    if (!expectedPin || parsed.data.pin !== expectedPin) {
      return NextResponse.json(
        { error: "PIN incorrecto." },
        { status: 401 },
      );
    }

    const supabaseUrl = getEnv("SUPABASE_URL");
    const supabaseServiceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

    const rows = await fetchAllResponses(
      supabaseUrl,
      supabaseServiceRoleKey,
      parsed.data.specialty,
    );

    const analytics = buildAnalytics(rows);

    const payload: DashboardPayload = {
      ...analytics,
      specialty: parsed.data.specialty,
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(payload);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { error: "Tiempo de espera agotado." },
        { status: 504 },
      );
    }
    console.error("[dashboard] Unexpected error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "Error interno al cargar el dashboard." },
      { status: 500 },
    );
  }
}
