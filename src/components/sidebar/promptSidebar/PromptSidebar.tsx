"use client";

import { useState } from "react";

import { useGlobalContext } from "@/services/context/GlobalContext";

import PromptSidebarHeader from "./promptSidebarHeader/PromptSidebarHeader";
import Search from "../components/search/Search";
import FoldersPromptsComponent from "./foldersChatsComponent/FoldersPromptsComponent";
import SidebarButton from "../components/sidebarButton/SidebarButton";
import SidebarContext from "@/services/context/SidebarContext";

export default function PromptSideBar() {
  const { prompts, setPrompts } = useGlobalContext();

  const [isRightSideBarOpen, setIsRightSideBarOpen] = useState(true);
  const [folders, setFolders] = useState([]);

  return (
    <SidebarContext>
      <section className="z-40 flex h-full bg-[#343541]">
        {isRightSideBarOpen ? (
          <>
            <SidebarButton
              side={"right"}
              state={isRightSideBarOpen}
              toggleState={setIsRightSideBarOpen}
            />

            <div className="flex w-[260px] flex-col space-y-2 bg-[#202123] p-2 text-[14px] transition-all">
              <PromptSidebarHeader folders={folders} setFolders={setFolders} />

              <Search
                sidebar="promptSidebar"
                folders={folders}
                setFolders={setFolders}
              />

              <FoldersPromptsComponent
                folders={folders}
                setFolders={setFolders}
              />
            </div>
          </>
        ) : (
          <SidebarButton
            side={"right"}
            state={isRightSideBarOpen}
            toggleState={setIsRightSideBarOpen}
          />
        )}
      </section>
    </SidebarContext>
  );
}
