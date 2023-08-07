"use client";

import { ChangeEvent, MouseEvent, ReactNode, useState } from "react";

import { useGlobalContext } from "@/services/context/GlobalContext";

import Prompt from "@/interfaces/prompt.interface";

import PromptModal from "@/components/modal/promptModal/PromptModal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

interface Props {
  prompt: Prompt;
}

export default function PromptComponent({ prompt }: Props) {
  const { prompts, setPrompts, isPromptModalOpen, setIsPromptModalOpen } =
    useGlobalContext();
  const [title, setTitle] = useState(prompt.title);
  const [deletePromptConfirm, setDeletePromptConfirm] = useState(false);
  const [openEditTitle, setOpenEditTitle] = useState(false);

  const handleClick = () => {
    setIsPromptModalOpen({ conditional: true, prompt: prompt });
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function editPromptName(e: MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault();
    setPrompts(
      prompts.map((prompt: Prompt) => {
        if (prompt.id === id) {
          prompt.title = title;
          return prompt;
        }
        return prompt;
      })
    );
    setOpenEditTitle(false);
  }

  function deletePrompt(id: number) {
    setPrompts(prompts.filter((prompt: Prompt) => prompt.id !== id));
  }

  return (
    <>
      <div className="relative flex items-center">
        {openEditTitle ? (
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
                  editPromptName(event, prompt.id)
                }
                type="submit"
                className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
              >
                <CheckIcon />
              </button>
              <button
                onClick={() => setOpenEditTitle(!openEditTitle)}
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

            {deletePromptConfirm ? (
              <>
                <div className="absolute right-1 z-10 flex text-gray-300">
                  <button
                    onClick={() => deletePrompt(prompt.id)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => setDeletePromptConfirm(!deletePromptConfirm)}
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
                    onClick={() => setOpenEditTitle(!openEditTitle)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => setDeletePromptConfirm(!deletePromptConfirm)}
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
