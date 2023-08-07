export default interface Message {
  id: string;
  content: string;
  user: User | undefined;
  createdAt: Date;
}
