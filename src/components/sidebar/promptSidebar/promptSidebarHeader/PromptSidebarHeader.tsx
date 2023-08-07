import { useGlobalContext } from "@/services/context/GlobalContext";

import Folder from "@/interfaces/folder.interface";
import Prompt from "@/interfaces/prompt.interface";

import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

interface Props {
  folders: Folder[];
  setFolders: any;
}

export default function PromptSidebarHeader({ folders, setFolders }: Props) {
  const { user, prompts, setPrompts } = useGlobalContext();

  function addMainComponent() {
    let counter = prompts.length + 1;
    setPrompts([
      ...prompts,
      {
        id: String(counter),
        title: `New Prompt ${counter}`,
        description: "",
        prompt: "",
        user: user,
        createdAt: new Date(),
      },
    ]);
  }

  function addNewFolder() {
    let counter = folders.length + 1;
    setFolders([
      ...folders,
      {
        id: String(counter),
        title: `New Folder ${counter}`,
        items: [],
        createdAt: new Date(),
      },
    ]);
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => addMainComponent()}
        disabled={user?.isAuthenticated === false}
        className="flex flex-shrink-0 items-center gap-3 w-[190px] rounded-md border border-white/20 bg-transparent p-3 cursor-pointer select-none text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <AddIcon />
        New Prompt
      </button>
      <button
        onClick={() => addNewFolder()}
        disabled={user?.isAuthenticated === false}
        className="flex flex-shrink-0 items-center gap-3 ml-2 rounded-md border border-white/20 bg-transparent p-3 cursor-pointer text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <CreateNewFolderIcon />
      </button>
    </div>
  );
}
