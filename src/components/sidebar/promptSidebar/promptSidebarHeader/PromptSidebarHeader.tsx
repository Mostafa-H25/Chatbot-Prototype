import { useGlobalContext } from '@/services/context/GlobalContext';

import Folder from '@/interfaces/folder.interface';
import Prompt from '@/interfaces/prompt.interface';

import AddIcon from '@mui/icons-material/Add';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useSidebarContext } from '@/services/context/SidebarContext';
import { useSession } from 'next-auth/react';

export default function PromptSidebarHeader() {
  const { data: session } = useSession();

  const { user, prompts, setPrompts } = useGlobalContext();
  const { folders, setFolders } = useSidebarContext();

  const addPrompt = async () => {
    let counter = prompts.length + 1;
    setPrompts([
      ...prompts,
      {
        promptId: String(counter),
        title: `New Prompt ${counter}`,
        description: '',
        prompt: '',
        user: user,
        createdAt: new Date(),
      },
    ]);
    // try {
    //   const prompt: Partial<Prompt> = {
    //     title: `New Prompt ${counter}`,
    //   };
    //   const endpoint = "/api/prompt";
    //   const options = {
    //     method: "POST",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ prompt }),
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();

    //   // dummy data
    //   const newPrompt: Prompt = {
    //     promptId: String(counter),
    //     userId: "1",
    //     folderId: undefined,
    //     title: `New Prompt ${counter}`,
    //     description: "",
    //     prompt: "",
    //     createdAt: new Date(),
    //     isDeleted: false,
    //   };
    //   setPrompts([...prompts, newPrompt]);
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
  };

  const addFolder = async () => {
    let counter = folders.length + 1;
    setFolders([
      ...folders,
      {
        folderId: String(counter),
        title: `New Folder ${counter}`,
        items: [],
        createdAt: new Date(),
        chatIds: [],
        backgroundColor: '',
      },
    ]);
    // try {
    //   const folder: Partial<Folder> = {
    //     title: `New Folder ${counter}`,
    //     type: "PROMPT",
    //   };
    //   const endpoint = "/api/folder";
    //   const options = {
    //     method: "POST",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ folder }),
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();

    //   // dummy data
    //   const newFolder = {
    //     folderId: String(counter),
    //     userId: "1",
    //     title: `New Folder ${counter}`,
    //     type: "PROMPT",
    //     createdAt: new Date(),
    //   };
    //   setFolders([...folders, newFolder]);
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={() => addPrompt()}
        disabled={session?.user.accessToken === 'undefined'}
        className='flex flex-shrink-0 items-center gap-3 w-[190px] rounded-md border border-white/20 bg-transparent p-3 cursor-pointer select-none text-white transition-colors duration-200 hover:bg-gray-500/10'>
        <AddIcon />
        New Prompt
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
