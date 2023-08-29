import { Dispatch, SetStateAction } from 'react';

import { useGlobalContext } from '@/services/context/GlobalContext';

import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useSidebarContext } from '@/services/context/SidebarContext';
import { useSession } from 'next-auth/react';

export default function ChatSidebarHeader() {
  const { user, chats, setChats } = useGlobalContext();
  const { folders, setFolders } = useSidebarContext();
  const { data: session } = useSession();
  const addChat = async () => {
    let counter = chats.length + 1;
    setChats([
      ...chats,
      {
        userId: '1',
        isDeleted: false,
        chatId: String(counter),
        title: `New Conversation ${counter}`,
        modifiedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
  };

  const addFolder = async () => {
    let counter = folders.length + 1;
    setFolders([
      ...folders,
      {
        folderId: String(counter),
        userId: '1',
        type: 'chat',
        createdAt: new Date(),
        isDeleted: false,
        title: `New Folder ${counter}`,
        chatIds: [],
      },
    ]);
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={() => addChat()}
        disabled={session?.user.accessToken === 'undefined'}
        className='flex flex-shrink-0 items-center gap-3 w-[190px] rounded-md border border-white/20 bg-transparent p-3 cursor-pointer select-none text-white transition-colors duration-200 hover:bg-gray-500/10'>
        <AddIcon />
        New Chat
      </button>
      <button
        onClick={() => addFolder()}
        disabled={session?.user.accessToken === 'undefined'}
        className='flex flex-shrink-0 items-center gap-3 ml-2 rounded-md border border-white/20 bg-transparent p-3 cursor-pointer text-sm text-white transition-colors duration-200 hover:bg-gray-500/10'>
        <CreateNewFolderIcon />
      </button>
    </div>
  );
}
