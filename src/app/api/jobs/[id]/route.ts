import { NextResponse } from "next/server";
import { getSingleJob } from "@/lib/justjobApi";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const authHeader = req.headers.get("authorization") ?? undefined;
  const token = authHeader?.replace(/^Bearer\s+/i, "");

  const result = await getSingleJob(id, token);

  if (result.status === 401) {
    return NextResponse.json(
      { ok: false, requiresAuth: true, error: "Sign in to view this job." },
      { status: 401 }
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Job not found." },
      { status: result.status === 404 ? 404 : result.status }
    );
  }

  return NextResponse.json({ ok: true, job: result.data });
}
