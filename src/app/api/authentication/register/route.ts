import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { method } = req;
    if (method === "POST") {
      const { user } = await req.json();
      const endpoint = `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/v1/auth/register`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      };

      const res = await fetch(endpoint, options);
      if (res.status !== 201) {
        return res.status;
      }
      const data = await res.json();

      return NextResponse.json({
        message: `You has been registered successfully with the email: ${user.email}.`,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
