import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const { method } = req;
    if (method === 'DELETE') {
      const endpoint = `http://localhost:9000/api/v1/auth/logout`;
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await fetch(endpoint, options);
      console.log(res);
      //   if (res.status !== 201) {
      //     return res.status;
      //   }
      //   const data = await res.json();

      //   return NextResponse.json({
      //     message: `You has been registered successfully with the email: ${user.email}.`,
      //   });
    }
  } catch (error) {
    console.log(error);
  }
}
