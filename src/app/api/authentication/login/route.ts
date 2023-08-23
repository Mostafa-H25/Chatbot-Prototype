import { serialize } from "cookie";
import { NextApiResponse } from "next";

export async function POST(req: Request) {
  const MAX_AGE = 60 * 60 * 24 * 7;
  try {
    const { method } = req;
    if (method === "POST") {
      const { user } = await req.json();
      const endpoint = `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/v1/auth/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user }),
      };

      const res = await fetch(endpoint, options);
      if (!res.ok) {
        console.log(res.status);
        return res.status;
      }
      const data = await res.json();
      const authorization = res.headers.get("authorization");

      if (authorization) {
        const serialized = serialize("authorization", authorization, {
          httpOnly: true,
          sameSite: "strict",
          path: "/",
          maxAge: MAX_AGE,
        });

        return new Response(JSON.stringify({ message: "You are logged in." }), {
          status: 200,
          headers: { "Set-Cookie": serialized },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
