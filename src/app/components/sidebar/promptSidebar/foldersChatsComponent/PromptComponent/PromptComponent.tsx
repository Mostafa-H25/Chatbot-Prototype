import { ChangeEvent, MouseEvent } from "react";
import { useGlobalContext } from "@/app/services/context/GlobalContext";
import { useModalContext } from "@/app/services/context/ModalContext";
import { useSidebarContext } from "@/app/services/context/SidebarContext";
import Prompt from "@/app/interfaces/prompt.interface";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

interface Props {
  prompt: Prompt;
}

export default function PromptComponent({ prompt }: Props) {
  const { prompts, setPrompts } = useGlobalContext();
  const { setIsPromptModalOpen } = useModalContext();
  const {
    title,
    setTitle,
    editTitle,
    setEditTitle,
    deleteConfirm,
    setDeleteConfirm,
  } = useSidebarContext();

  const handleClick = () => {
    setIsPromptModalOpen({ conditional: true, prompt: prompt });
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  const editPromptName = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    // try {
    //   const prompt: Prompt = prompts.find(
    //     (prompt: Prompt) => prompt.promptId === id
    //   )!;
    //   if (prompt) prompt.title = e.currentTarget.value;
    //   const endpoint = `/api/prompt/${id}`;
    //   const options = {
    //     method: "PUT",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ prompt }),
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();
    //   // dummy data
    //   const updatedPrompt: Prompt = {
    //     ...prompt,
    //     [e.currentTarget.name]: e.currentTarget.value,
    //   };
    //   setPrompts(
    //     prompts.map((prompt: Prompt) => {
    //       if (prompt.promptId === id) {
    //         prompt = updatedPrompt;
    //         return prompt;
    //       }
    //       return prompt;
    //     })
    //   );
    // } catch (error) {
    //   console.log("ERROR", error);
    // }

    setPrompts(
      prompts.map((prompt: Prompt) => {
        if (prompt.promptId === id) {
          prompt.title = title;
          return prompt;
        }
        return prompt;
      })
    );
    setEditTitle(false);
  };

  const deletePrompt = async (id: string) => {
    setPrompts(prompts.filter((prompt: Prompt) => prompt.promptId !== id));
    // try {
    //   const endpoint = `/api/prompt/${id}`;
    //   const options = {
    //     method: "DELETE",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();
    //   // dummy data
    //   setPrompts(prompts.filter((prompt: Prompt) => prompt.promptId !== id));
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
  };

  return (
    <>
      <div className="relative flex items-center">
        {editTitle ? (
          <>
            <button
              className="flex items-center gap-3 w-full rounded-lg bg-[#343541]/90 p-3 cursor-pointer text-sm transition-colors duration-200 hover:bg-[#343541]/90"
              draggable="true"
            >
              <TipsAndUpdatesIcon />
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                autoFocus
                className="mr-12 flex-1 overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-white outline-none focus:border-neutral-100"
              />
            </button>

            <div className="absolute right-1 z-10 flex text-gray-300">
              <button
                onClick={(event: MouseEvent<HTMLButtonElement>) =>
                  editPromptName(event, prompt.promptId)
                }
                type="submit"
                className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
              >
                <CheckIcon />
              </button>
              <button
                onClick={() => setEditTitle(false)}
                className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
              >
                <ClearIcon />
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => handleClick()}
              className="flex items-center gap-3 w-full rounded-lg bg-[#343541]/90 p-3 cursor-pointer text-sm transition-colors duration-200 hover:bg-[#343541]/90"
            >
              <TipsAndUpdatesIcon />
              <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] leading-3 pr-12">
                {prompt.title}
              </div>
            </button>

            {deleteConfirm ? (
              <>
                <div className="absolute right-1 z-10 flex text-gray-300">
                  <button
                    onClick={() => deletePrompt(prompt.promptId)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <ClearIcon />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="absolute right-1 z-10 flex text-gray-300">
                  <button
                    onClick={() => setEditTitle(true)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(true)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
