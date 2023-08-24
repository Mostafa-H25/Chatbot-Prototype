import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  console.log("req");
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log(req.body);
  if (!openai.apiKey) {
    return NextResponse.json(
      {
        error: {
          message:
            "OpenAI API key not configured, please follow instructions in README.md",
        },
      },
      { status: 400 }
    );
  }

  // const requestContent = req.body?.message.getReader();
  const requestContent = "Hello, i need help with my code?";

  if (requestContent.trim().length === 0) {
    return NextResponse.json(
      {
        error: {
          message: "Please enter a valid animal",
        },
      },
      { status: 400 }
    );
  }
  console.log(requestContent);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: requestContent },
      ],
      stream: true,
      temperature: 1,
    });

    for await (const chunk of completion) {
      console.log(chunk.choices[0].delta.content);
    }
  } catch (error) {
    console.log(error);
    // if (error.response) {
    //   console.error(error.response.status, error.response.data);
    //   res.status(error.response.status).json(error.response.data);
    // } else {
    //   console.error(`Error with OpenAI API request: ${error.message}`);
    //   res.status(500).json({
    //     error: {
    //       message: "An error occurred during your request.",
    //     },
    //   });
    // }
  }
}

POST();
