export default interface Prompt {
  promptId: string;
  userId: string;
  folderId: string | undefined;
  title: string;
  description: string;
  prompt: string;
  createdAt: Date;
  isDeleted: boolean;
}
