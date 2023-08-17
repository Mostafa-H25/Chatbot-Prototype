import { Dispatch, SetStateAction } from "react";

import { useGlobalContext } from "@/services/context/GlobalContext";

import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useSidebarContext } from "@/services/context/SidebarContext";

export default function ChatSidebarHeader() {
  const { user, chats, setChats } = useGlobalContext();
  const { folders, setFolders } = useSidebarContext();
  function addNewChat() {
    let counter = chats.length + 1;
    setChats([
      ...chats,
      {
        id: String(counter),
        title: `New Conversation ${counter}`,
        conversation: [],
        modifiedAt: new Date(),
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
        chatIds: [],
      },
    ]);
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => addNewChat()}
        disabled={user?.isAuthenticated === false}
        className="flex flex-shrink-0 items-center gap-3 w-[190px] rounded-md border border-white/20 bg-transparent p-3 cursor-pointer select-none text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <AddIcon />
        New Chat
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
