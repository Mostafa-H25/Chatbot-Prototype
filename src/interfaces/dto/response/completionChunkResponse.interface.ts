export interface CompletionChunkResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      text: string;
      index: number;
      logprobs: null;
      finish_reason: string;
    }
  ];
}
