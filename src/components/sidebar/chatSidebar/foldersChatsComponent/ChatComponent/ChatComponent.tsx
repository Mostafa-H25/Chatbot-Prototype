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

import { setChats } from "@/services/redux/reducers/appSlice";
import { useDispatch , useSelector } from "react-redux";
import {setFolders} from '@/services/redux/reducers/slideBaReducer'
interface Props {
  chat: Chat;
}

export default function ChatComponent({ chat }: Props) {

  const { chats } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const { folders } = useSelector((state) => state.slide);
  const [title, setTitle] = useState("");
  const [deleteChatConfirm, setDeleteChatConfirm] = useState(false);
  const [openEditTitle, setOpenEditTitle] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function editChatName(e: MouseEvent<HTMLButtonElement>, id: string ) {
    // Find the chat to be edited
    const chatToEdit = chats.find((chat) => chat.chatId  === id);

    if (chatToEdit) {
      const updatedChat = {
        ...chatToEdit,
        title: title, // Replace title with the new title
      };

      // Create a new array of chats with the updated chat
      const updatedChats = chats.map((chat) =>
        chat.chatId === id ? updatedChat : chat
      );

      // Dispatch the action to update the chats
      dispatch(setChats(updatedChats));
    }
    setOpenEditTitle(false);
  }

  // const editChatName = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
  //   e.preventDefault();
  //   // try {
  //   //   const chat: Chat = chats.find((chat: Chat) => chat.chatId === id)!;
  //   //   if (chat) chat.title = e.currentTarget.value;
  //   //   const endpoint = `/api/chat/${id}`;
  //   //   const options = {
  //   //     method: "PUT",
  //   //     header: {
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //     body: JSON.stringify({ chat }),
  //   //   };
  //   //   const response = await fetch(endpoint, options);
  //   //   const data = await response.json();
  //   //   // dummy data
  //   //   const updatedChat: Chat = {
  //   //     ...chat,
  //   //     [e.currentTarget.name]: e.currentTarget.value,
  //   //   };
  //   //   setChats(
  //   //     chats.map((chat: Chat) => {
  //   //       if (chat.chatId === id) {
  //   //         chat = updatedChat;
  //   //         return chat;
  //   //       }
  //   //       return chat;
  //   //     })
  //   //   );
  //   // } catch (error) {
  //   //   console.log("ERROR", error);
  //   // }
  //   setChats(
  //     chats.map((chat: Chat) => {
  //       if (chat.chatId === id) {
  //         chat.title = title;
  //         return chat;
  //       }
  //       return chat;
  //     })
  //   );
  //   setOpenEditTitle(false);
  // };


  const deleteChat = async (id: string) => {
    dispatch(setChats(chats.filter((chat: Chat) => chat.chatId !== id)));
    // try {
    //   const endpoint = `/api/chat/${id}`;
    //   const options = {
    //     method: "DELETE",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();
    //   // dummy data
    //   setChats(chats.filter((chat: Chat) => chat.chatId !== id));
    // } catch (error) {
    //   console.log("ERROR", error);
    // }

    const updatedFolders = folders.map((folder) => ({
      ...folder,
      chatIds: folder.chatIds.filter((chatId) => chatId !== id),
    }));
    dispatch(setFolders(updatedFolders));
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", chat.chatId);
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
                  editChatName(event, chat.chatId)
                }
                type="submit"
                className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
              >
                <CheckIcon />
              </button>
              <button
                onClick={() => setOpenEditTitle(false)}
                className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
              >
                <ClearIcon />
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              href={`/chats/${chat.chatId}`}
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
                    onClick={() => deleteChat(chat.chatId)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => setDeleteChatConfirm(false)}
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
                    onClick={() => setOpenEditTitle(true)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => setDeleteChatConfirm(true)}
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
