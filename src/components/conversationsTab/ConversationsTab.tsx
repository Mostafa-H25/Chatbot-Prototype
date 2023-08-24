"use client";

import { useEffect } from "react";
import Link from "next/link";

import { useGlobalContext } from "@/services/context/GlobalContext";
import Chat from "@/interfaces/chat.interface";
import ChatTab from "@/interfaces/chatTab.interface";

import AssistantIcon from "@mui/icons-material/Assistant";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { ChatTab } from "@/interfaces/chatTab.interface";
import { useSidebarContext } from "@/services/context/SidebarContext";
import { useSelector , useDispatch } from "react-redux";
import { setChatTabs } from "@/services/redux/reducers/appSlice";
interface Props {
  id: string;
  chat: Chat;
}

export default function ConversationsTab({ id, chat }: Props) {
 // const { chatTabs, setChatTabs, theme } = useGlobalContext();
  const { chatTabs ,theme } = useSelector((state)=>state.app);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!chatTabs.find((chatTab) => chatTab.id === chat?.chatId))
      dispatch(setChatTabs([...chatTabs, { id: chat!.chatId, title: chat!.title }]));
  }, [id ]);
  console.log(chatTabs)

  const handleClick = (id: string) => {
    dispatch((dispatch, getState) => {
      const currentState: ChatTab[] = getState().app.chatTabs.filter(
        (chatTab) => chatTab.id !== id
      );
      dispatch(setChatTabs(currentState));

      // const chatTabs = useSelector((state)=> state.app) // Get updated chatTabs from the state
      if (chat.chatId === id) {
        if (chatTabs.length === 1) {
          router.push("/chats");
        } else {
          router.push(chatTabs[chatTabs.length - 2].id);
        }
      }
    })
  };

  return (
    <div
      className={`flex mt-2 w-full h-fit bg-[#343541] ${
        theme === "dark" ? " bg-[#343541]" : "bg-white"
      }`}
    >
      {Array.isArray(chatTabs) && chatTabs.map((chatTab) => (
        <div
          key={chatTab.id}
          className="relative flex justify-between items-center "
        >
          <Link
            href={`/chats/${chatTab.id}`}
            className={
              chatTab.title === chat?.title
                ? "flex justify-start items-center w-56  rounded-t-md bg-[#202123] py-1 px-2 cursor-pointer hover:bg-[#4e5058]/50 text-xs font-bold"
                : "flex justify-start items-center w-56   rounded-t-md bg-[#4e5058] py-1 px-2 cursor-pointer hover:bg-[#4e5058]/50 text-xs"
            }
          >
            <AssistantIcon fontSize="small" />
            <p>{chatTab.title}</p>
          </Link>
          <button
            onClick={() => handleClick(chatTab.id)}
            className="absolute right-2 top-1 bottom-1 z-10"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      ))}
    </div>
  );
}