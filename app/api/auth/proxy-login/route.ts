import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const backendRes = await axios.post("https://localhost:7256/user/login", body, {
    withCredentials: true,
    validateStatus: () => true,
  });

  const response = NextResponse.json(backendRes.data, { status: backendRes.status });

  // Forward set-cookie header if present
  const setCookie = backendRes.headers["set-cookie"];
  if (setCookie) {
    if (Array.isArray(setCookie)) {
      setCookie.forEach(cookie => response.headers.append("set-cookie", cookie));
    } else {
      response.headers.set("set-cookie", setCookie);
    }
  }

  return response;
}