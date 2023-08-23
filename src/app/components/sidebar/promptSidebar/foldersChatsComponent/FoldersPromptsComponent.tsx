import { useGlobalContext } from "@/app/services/context/GlobalContext";
import { useSidebarContext } from "@/app/services/context/SidebarContext";
import Folder from "@/app/interfaces/folder.interface";
import Prompt from "@/app/interfaces/prompt.interface";

import FolderComponent from "./folderComponent/FolderComponent";
import PromptComponent from "./PromptComponent/PromptComponent";
import NoData from "../../components/noData/NoData";

export default function FoldersPromptsComponent() {
  const { prompts } = useGlobalContext();
  const { folders, search, filteredPrompts } = useSidebarContext();

  return (
    <div className="flex-grow overflow-auto">
      {prompts.length > 0 || folders.length > 0 ? (
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

          {/* Prompt */}
          <div className="pt-2">
            <div className="flex flex-col gap-1 w-full">
              {search ? (
                <>
                  {filteredPrompts.length > 0 ? (
                    <>
                      {filteredPrompts.map((prompt: Prompt) => (
                        <div key={prompt.promptId}>
                          <PromptComponent prompt={prompt} />
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
                  {prompts.map((prompt: Prompt) => (
                    <div key={prompt.promptId}>
                      <PromptComponent prompt={prompt} />
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
