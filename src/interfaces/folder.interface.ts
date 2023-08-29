import Chat from './chat.interface';

export default interface Folder {
  folderId: string;
  userId: string;
  title: string;
  type: string;
  createdAt: Date;
  isDeleted: boolean;
  chatIds: string[];
  backgroundColor: string;
}
