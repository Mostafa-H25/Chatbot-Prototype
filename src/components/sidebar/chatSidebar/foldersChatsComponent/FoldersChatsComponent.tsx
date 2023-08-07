"use client";

import { ReactNode, useState } from "react";

import { useGlobalContext } from "@/services/context/GlobalContext";

import Chat from "@/interfaces/chat.interface";
import Folder from "@/interfaces/folder.interface";

import FolderComponent from "./folderComponent/FolderComponent";
import ChatComponent from "./ChatComponent/ChatComponent";
import NoData from "../../components/noData/NoData";
import { useSidebarContext } from "@/services/context/SidebarContext";

interface Props {
  folders: Array<Folder>;
  setFolders: any;
}

export default function FoldersChatsComponent({ folders, setFolders }: Props) {
  const { chats } = useGlobalContext();
  const { search, filteredChats } = useSidebarContext();

  return (
    <div className="flex-grow overflow-auto">
      {chats.length > 0 || folders.length > 0 ? (
        <>
          {/* Folders */}
          <div className="flex border-b border-white/20 pb-2">
            <div className="flex flex-col w-full pt-2">
              {folders.map((folder: Folder) => (
                <div key={folder.id}>
                  <FolderComponent
                    folder={folder}
                    folders={folders}
                    setFolders={setFolders}
                  />
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
                        <div key={chat.id}>
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
                    <div key={chat.id}>
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
