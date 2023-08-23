import { useGlobalContext } from "@/app/services/context/GlobalContext";
import { useSidebarContext } from "@/app/services/context/SidebarContext";

import Chat from "@/app/interfaces/chat.interface";
import Folder from "@/app/interfaces/folder.interface";

import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

export default function ChatSidebarHeader() {
  const { chats, setChats } = useGlobalContext();
  const { folders, setFolders } = useSidebarContext();

  const addChat = async () => {
    let counter = chats.length + 1;
    setChats([
      ...chats,
      {
        chatId: String(counter),
        title: `New Conversation ${counter}`,
        conversation: [],
        modifiedAt: new Date(),
        createdAt: new Date(),
      },
    ]);
    // try {
    //   const chat: Partial<Chat> = {
    //     title: `New Conversation ${counter}`,
    //   };
    //   const endpoint = "/api/chat";
    //   const options = {
    //     method: "POST",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ chat }),
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();
    //   // dummy data
    //   const newChat: Chat = {
    //     chatId: String(counter),
    //     userId: "1",
    //     folderId: undefined,
    //     title: `New Conversation ${counter}`,
    //     modifiedAt: new Date(),
    //     createdAt: new Date(),
    //     isDeleted: false,
    //   };
    //   setChats([...chats, newChat]);
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
      },
    ]);
    // try {
    //   const folder: Partial<Folder> = {
    //     title: `New Folder ${counter}`,
    //     type: "CHAT",
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
    //   const newFolder: Folder = {
    //     folderId: String(counter),
    //     userId: "1",
    //     title: `New Folder ${counter}`,
    //     type: "CHAT",
    //     createdAt: new Date(),
    //     isDeleted: false,
    //   };
    //   setFolders([...folders, newFolder]);
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => addChat()}
        className="flex flex-shrink-0 items-center gap-3 w-[190px] rounded-md border border-white/20 bg-transparent p-3 cursor-pointer select-none text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <AddIcon />
        New Chat
      </button>
      <button
        onClick={() => addFolder()}
        className="flex flex-shrink-0 items-center gap-3 ml-2 rounded-md border border-white/20 bg-transparent p-3 cursor-pointer text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <CreateNewFolderIcon />
      </button>
    </div>
  );
}
