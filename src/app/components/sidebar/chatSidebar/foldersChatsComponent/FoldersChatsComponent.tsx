import { useGlobalContext } from "@/app/services/context/GlobalContext";
import { useSidebarContext } from "@/app/services/context/SidebarContext";
import Chat from "@/app/interfaces/chat.interface";
import Folder from "@/app/interfaces/folder.interface";

import FolderComponent from "./folderComponent/FolderComponent";
import ChatComponent from "./ChatComponent/ChatComponent";
import NoData from "../../components/noData/NoData";

export default function FoldersChatsComponent() {
  const { chats } = useGlobalContext();
  const { folders, search, filteredChats } = useSidebarContext();

  return (
    <div className="flex-grow overflow-auto">
      {chats.length > 0 || folders.length > 0 ? (
        <>
          {/* Folders */}
          <div className="flex border-b border-white/20 pb-2">
            <div className="flex flex-col w-full pt-2">
              {folders.map((folder: Folder) => (
                <div key={folder.folderId}>
                  <FolderComponent folder={folder} />
                </div>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <div className="pt-2">
            <div className="flex flex-col gap-1 w-full">
              {search ? (
                <>
                  {filteredChats.length > 0 ? (
                    <>
                      {filteredChats.map((chat: Chat) => (
                        <div key={chat.chatId}>
                          <ChatComponent chat={chat} />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <NoData />
                    </>
                  )}
                </>
              ) : (
                <>
                  {chats.map((chat: Chat) => (
                    <div key={chat.chatId}>
                      <ChatComponent chat={chat} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <NoData />
        </>
      )}
    </div>
  );
}
