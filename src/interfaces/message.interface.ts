import {User} from '@/interfaces/user.interface'
export default interface Message {
  id: string;
  content: string;
  user: User | undefined;
  createdAt: Date;
}
