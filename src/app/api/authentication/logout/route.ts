import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { method } = req;
    if (method === "POST") {
      const cookieStore = cookies();
      const authorization = cookieStore.get("authorization")?.value;

      if (authorization) {
        const endpoint = `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/v1/auth/logout`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authorization }),
        };

        const res = await fetch(endpoint, options);
        if (!res.ok) {
          return res.status;
        }
        cookies().delete("authorization");

        return NextResponse.json({
          message: `You are logged out.`,
        });
      }
    }
  } catch (error) {
    console.log("ERROR", error);
  }
}
