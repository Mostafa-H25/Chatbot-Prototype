"use client";

import { useState } from "react";
import { useGlobalContext } from "@/services/context/GlobalContext";
import SidebarContext from "@/services/context/SidebarContext";

import PromptSidebarHeader from "./promptSidebarHeader/PromptSidebarHeader";
import Search from "../components/search/Search";
import FoldersPromptsComponent from "./foldersChatsComponent/FoldersPromptsComponent";
import SidebarButton from "../components/sidebarButton/SidebarButton";

export default function PromptSideBar() {
  const { theme } = useGlobalContext();

  const [isRightSideBarOpen, setIsRightSideBarOpen] = useState<boolean>(true);

  return (
    <SidebarContext>
      <section
        className={`z-40 flex h-full ${
          theme === "dark" ? "bg-[#343541]" : "bg-white"
        }`}
      >
        {isRightSideBarOpen ? (
          <>
            <SidebarButton
              side={"right"}
              state={isRightSideBarOpen}
              toggleState={setIsRightSideBarOpen}
            />

            <div className="flex w-[260px] flex-col space-y-2 bg-[#202123] p-2 text-[14px] transition-all">
              <PromptSidebarHeader />
              <Search sidebar="promptSidebar" />
              <FoldersPromptsComponent />
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
