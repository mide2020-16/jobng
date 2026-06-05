import { NextResponse } from "next/server";
import { getJobs } from "@/lib/justjobApi";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const page_size = searchParams.get("page_size") ? Number(searchParams.get("page_size")) : 20;

  const authHeader = req.headers.get("authorization") ?? undefined;
  const token = authHeader?.replace(/^Bearer\s+/i, "");

  const result = await getJobs({ search, category, page, page_size }, token);

  if (result.status === 401) {
    return NextResponse.json(
      { ok: false, requiresAuth: true, error: "Sign in to browse jobs." },
      { status: 401 }
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Could not load jobs." },
      { status: result.status }
    );
  }

  return NextResponse.json({ ok: true, ...result.data });
}
