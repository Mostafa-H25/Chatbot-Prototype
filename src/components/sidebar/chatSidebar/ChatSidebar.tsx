"use client";

import { useState } from "react";

import ChatSidebarHeader from "./chatSidebarHeader/ChatSidebarHeader";
import Search from "../components/search/Search";
import FoldersChatsComponent from "./foldersChatsComponent/FoldersChatsComponent";
import ChatSidebarFooter from "./chatSidebarFooter/ChatSidebarFooter";
import SidebarButton from "../components/sidebarButton/SidebarButton";
import SidebarContext, {
  useSidebarContext,
} from "@/services/context/SidebarContext";
import { useGlobalContext } from "@/services/context/GlobalContext";
import { useSelector } from "react-redux";

export default function ChatSidebar() {
  const [isLeftSideBarOpen, setIsLeftSideBarOpen] = useState(true);
  //const { theme } = useGlobalContext();
  const { theme } = useSelector((state) => state.app);
  return (
    // <SidebarContext>
      <section
        className={`z-40 flex h-full ${
          theme === "dark" ? "bg-[#343541]" : "bg-white"
        }`}
      >
        {isLeftSideBarOpen ? (
          <>
            <div className="flex w-[260px] flex-col space-y-2 bg-[#202123] p-2 text-[14px] transition-all">
              <ChatSidebarHeader  />

              <Search
                sidebar="chatSidebar"
              />

              <FoldersChatsComponent
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
    // </SidebarContext>
  );
}
