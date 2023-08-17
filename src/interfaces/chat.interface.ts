import Message from "./message.interface";

export default interface Chat {
  id: string;
  title: string;
  conversation: Array<Message>;
  modifiedAt: Date;
  user: User;
  createdAt: Date;
  folderId: string;
}
