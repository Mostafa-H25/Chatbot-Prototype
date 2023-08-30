import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { method } = req;
  if (method === "PUT") {
    const { prompt } = await req.json();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const endpoint = `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/prompt/${id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
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

export async function DELETE(req: Request) {
  const { method } = req;
  if (method === "DELETE") {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const endpoint = `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/prompt/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(endpoint, options);
    if (res.status !== 200) {
      return res.status;
    }
    const data = await res.json();

    return NextResponse.json({
      message: data,
    });
  }
}
