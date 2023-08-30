"use client";

import { useGlobalContext } from "@/services/context/GlobalContext";

import Conversation from "@/components/conversation/Conversation";
import ConversationsTab from "@/components/conversationsTab/ConversationsTab";
import Chat from "@/interfaces/chat.interface";
import { useSelector , useDispatch  } from "react-redux";
export default function ConversationPage({
  params,
}: {
  params: { chatId: string };
}) {
  // const { chats } = useGlobalContext();
  const {chats, theme } = useSelector((state) => state.app);

  //const chat = chats.find((chat) => chat.id === params.conversationId);
  const chat = chats.find((chat: Chat) => chat.chatId === params.chatId);

  return (
    <main className="flex flex-1">
      <div className="relative flex flex-col flex-1 overflow-hidden bg-[#343541]">
        <ConversationsTab id={params.chatId} chat={chat!} />
        <Conversation id={params.chatId} />
      </div>
    </main>
  );
}
