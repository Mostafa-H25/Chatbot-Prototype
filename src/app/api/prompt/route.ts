import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { method } = req;
  if (method === "GET") {
    const endpoint = `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/prompt`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(endpoint, options);
    if (!res.ok) {
      return res.status;
    }
    const data = await res.json();

    return NextResponse.json({
      message: data,
    });
  }
}
export async function POST(req: Request) {
  const { method } = req;
  if (method === "POST") {
    const { prompt } = await req.json();
    const endpoint = `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/prompt`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    };

    const res = await fetch(endpoint, options);
    if (res.status !== 201) {
      return res.status;
    }
    const data = await res.json();

    return NextResponse.json({
      message: data,
    });
  }
}
