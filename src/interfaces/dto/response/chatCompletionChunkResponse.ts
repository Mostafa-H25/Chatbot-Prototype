export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      index: number;
      delta: {
        content: string;
      };
      finish_reason: string;
    }
  ];
}
