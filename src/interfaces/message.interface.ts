import {User} from '@/interfaces/user.interface'
export default interface Message {
  messageId: string;
  chatId: string;
  userId: string;
  question: string;
  answer: string;
  createdAt: Date;
  isDeleted: boolean;
}
