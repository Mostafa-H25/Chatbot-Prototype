import Prompt from "./prompt.interface";

export default interface PromptModal {
  conditional: boolean;
  prompt: Prompt | undefined;
}
