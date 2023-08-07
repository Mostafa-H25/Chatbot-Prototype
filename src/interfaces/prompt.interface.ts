export default interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  user: User;
  createdAt: Date;
}
