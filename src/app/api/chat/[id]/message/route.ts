import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { method } = req;
  if (method === "POST") {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const { message } = await req.json();
    const endpoint = `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/${id}/message`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
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
