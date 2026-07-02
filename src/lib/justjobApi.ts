import { API_BASE_URL } from "./config";

export interface ApiJob {
  job_id: string;
  job_title: string | null;
  job_url: string | null;
  created_at: string;
  company_name: string;
  company_website: string | null;
  category: string | null;
  description: string | null;
}

export interface PagedJobsResponse {
  items: ApiJob[];
  count: number;
}

export interface ApiResult<T = Record<string, unknown>> {
  ok: boolean;
  status: number;
  data: T;
}
export interface UpdateApiResult {
  ok: boolean;
  status: number;
  message: string;
}
export function extractError(
  data: Record<string, unknown>,
  fallback = "Something went wrong. Please try again."
): string {
  if (typeof data.detail === "string") return data.detail;
  if (typeof data.error === "string") return data.error;
  if (typeof data.message === "string") return data.message;
  const first = Object.values(data)[0];
  if (Array.isArray(first) && typeof first[0] === "string") return first[0];
  return fallback;
}

export function extractToken(data: Record<string, unknown>): string | null {
  const token =
    data.access ??
    data.token ??
    data.access_token ??
    (typeof data.data === "object" &&
    data.data &&
    ((data.data as Record<string, unknown>).access ??
      (data.data as Record<string, unknown>).token));
  return typeof token === "string" ? token : null;
}

async function parseJson(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text(); // Get raw response first
  
  try {
    // Attempt to parse as JSON
    const data = JSON.parse(text);
    
    // If it's a plain string, wrap it in a 'message' property
    if (typeof data === "string") {
      return { message: data };
    }
    
    // If it's an object, return it as is
    return data as Record<string, unknown>;
  } catch {
    // If it's not JSON, assume it's a plain text error message
    return { message: text || res.statusText || "An unexpected error occurred" };
  }
}

export async function loginUser(body: {
  number: string;
  pin: string;
}): Promise<ApiResult> {
  const res = await fetch(`${API_BASE_URL}/api/justjob/login/user/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, data: await parseJson(res) };
}

export async function forgotPassword(body: {
  phone_number: string;
}): Promise<ApiResult> {
  const res = await fetch(`${API_BASE_URL}/api/justjob/forgot/password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, data: await parseJson(res) };
}

export async function updatePassword({
  number,
  pin,
  confirm_pin,
}: {
  number: string;
  pin: string;
  confirm_pin: string;
}): Promise<UpdateApiResult> {
  const res = await fetch(`${API_BASE_URL}/api/justjob/update/password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ number, pin, confirm_pin }),
  });

  const data = await parseJson(res);
  console.log(data)
  return {
    ok: res.ok,
    status: res.status,
    message: extractError(data)
  };
}

export async function resetPassword(body: {
  phone_number: string;
  pin: string;
}): Promise<ApiResult> {
  const res = await fetch(`${API_BASE_URL}/api/justjob/reset/password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, data: await parseJson(res) };
}

export async function getJobs(
  params: { search?: string; category?: string; page?: number; page_size?: number },
  token?: string
): Promise<ApiResult<PagedJobsResponse>> {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.category) qs.set("category", params.category);
  if (params.page) qs.set("page", String(params.page));
  if (params.page_size) qs.set("page_size", String(params.page_size));

  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `${API_BASE_URL}/api/justjob/jobs/${qs.toString() ? `?${qs}` : ""}`,
    { headers, cache: "no-store" }
  );

  const data = (await parseJson(res)) as unknown as PagedJobsResponse;
  return { ok: res.ok, status: res.status, data };
}

export async function getSingleJob(
  jobId: string,
  token?: string
): Promise<ApiResult<ApiJob>> {
  const qs = new URLSearchParams({ job_id: jobId });
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `${API_BASE_URL}/api/justjob/single/job/?${qs}`,
    { headers, cache: "no-store" }
  );

  const data = (await parseJson(res)) as unknown as ApiJob;
  return { ok: res.ok, status: res.status, data };
}
