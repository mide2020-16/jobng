import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ ok: false, requiresAuth: true, error: "You must be logged in to post a job." }, { status: 401 });
    }

    const body = await req.json();
    const { title, company, location, category, description, responsibilities, requirements } = body;

    if (!title || !company || !location || !category || !description || !responsibilities || !requirements) {
      return NextResponse.json({ ok: false, error: "Required fields missing." }, { status: 400 });
    }

    // Simulate backend processing
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ 
      ok: true, 
      message: "Job posted successfully. Your listing will be reviewed within 24 hours.", 
      jobId: "DEMO-" + Date.now() 
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Network error. Please try again." }, { status: 500 });
  }
}
