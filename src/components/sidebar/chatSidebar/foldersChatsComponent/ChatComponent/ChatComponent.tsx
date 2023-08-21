"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import Link from "next/link";

import { useGlobalContext } from "@/services/context/GlobalContext";

import Chat from "@/interfaces/chat.interface";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ChatIcon from "@mui/icons-material/Chat";
import { useSidebarContext } from "@/services/context/SidebarContext";

interface Props {
  chat: Chat;
}

export default function ChatComponent({ chat }: Props) {
  const { chats, setChats } = useGlobalContext();
  const { folders, setFolders } = useSidebarContext();

  const [title, setTitle] = useState("");
  const [deleteChatConfirm, setDeleteChatConfirm] = useState(false);
  const [openEditTitle, setOpenEditTitle] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function editChatName(e: MouseEvent<HTMLButtonElement>, id: string) {
    // e.preventDefault();
    setChats(
      chats.map((chat: Chat) => {
        if (chat.id === id) {
          chat.title = title;
          return chat;
        }
        return chat;
      })
    );
    setOpenEditTitle(false);
  }

  function deleteChat(id: string) {
    setChats(chats.filter((chat: Chat) => chat.id !== id));

    const updatedFolders = folders.map((folder) => ({
      ...folder,
      chatIds: folder.chatIds.filter((chatId) => chatId !== id),
    }));
    setFolders(updatedFolders);
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", chat.id);
  };

  return (
    <>
      <div
        className="relative flex items-center"
        draggable
        onDragStart={handleDragStart}
      >
        {openEditTitle ? (
          <>
            <button
              className="flex items-center gap-3 w-full rounded-lg bg-[#343541]/90 p-3 cursor-pointer text-sm transition-colors duration-200 hover:bg-[#343541]/90"
              draggable="true"
            >
              <ChatIcon />
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
                  editChatName(event, chat.id)
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
            <Link
              href={`/chats/${chat.id}`}
              className="flex items-center gap-3 w-full rounded-lg bg-[#343541]/90 p-3 cursor-pointer text-sm transition-colors duration-200 hover:bg-[#343541]/90"
            >
              <ChatIcon />
              <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] leading-3 pr-12">
                {chat.title}
              </div>
            </Link>

            {deleteChatConfirm ? (
              <>
                <div className="absolute right-1 z-10 flex text-gray-300">
                  <button
                    onClick={() => {
                      deleteChat(chat.id);
                    }}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => setDeleteChatConfirm(!deleteChatConfirm)}
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
                    onClick={() => setDeleteChatConfirm(!deleteChatConfirm)}
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
