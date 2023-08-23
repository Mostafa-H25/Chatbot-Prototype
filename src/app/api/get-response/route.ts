import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function POST(req: Request, res: Response) {
  if (!config.apiKey) {
    return res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
  }

  const requestContent = req.body?.messages.content;

  if (requestContent.trim().length === 0) {
    return res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      },
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "text-davinci-003",
      messages: requestContent,
      temperature: 1,
      stream: true,
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
