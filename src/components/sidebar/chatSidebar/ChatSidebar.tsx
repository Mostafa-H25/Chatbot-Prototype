"use client";

import { useState } from "react";

import ChatSidebarHeader from "./chatSidebarHeader/ChatSidebarHeader";
import Search from "../components/search/Search";
import FoldersChatsComponent from "./foldersChatsComponent/FoldersChatsComponent";
import ChatSidebarFooter from "./chatSidebarFooter/ChatSidebarFooter";
import SidebarButton from "../components/sidebarButton/SidebarButton";
import SidebarContext from "@/services/context/SidebarContext";

export default function ChatSidebar() {
  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(true);
  const [folders, setFolders] = useState([]);

  return (
    <SidebarContext>
      <section className="z-40 flex h-full bg-[#343541]">
        {isLeftSideBarOpen ? (
          <>
            <div className="flex w-[260px] flex-col space-y-2 bg-[#202123] p-2 text-[14px] transition-all">
              <ChatSidebarHeader folders={folders} setFolders={setFolders} />

              <Search
                sidebar="chatSidebar"
                folders={folders}
                setFolders={setFolders}
              />

              <FoldersChatsComponent
                folders={folders}
                setFolders={setFolders}
              />

              <ChatSidebarFooter />
            </div>

            <SidebarButton
              side={"left"}
              state={isLeftSideBarOpen}
              toggleState={setIsLeftSideBarOpen}
            />
          </>
        ) : (
          <SidebarButton
            side={"left"}
            state={isLeftSideBarOpen}
            toggleState={setIsLeftSideBarOpen}
          />
        )}
      </section>
    </SidebarContext>
  );
}
