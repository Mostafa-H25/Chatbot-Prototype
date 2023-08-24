import Message from "./message.interface";
import {User} from './user.interface'
export default interface Chat {
  id: string;
  title: string;
  conversation: Array<Message>;
  modifiedAt: Date;
  user: User;
  createdAt: Date;
  folderId: string;
}
