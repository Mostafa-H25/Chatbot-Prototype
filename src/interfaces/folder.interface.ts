import Chat from "./chat.interface";

export default interface Folder {
  id: string;
  title: string;
  items: Array<Chat>;
  user: User;
  createdAt: Date;
  chatIds: string[];
  backgroundColor: string;
}
