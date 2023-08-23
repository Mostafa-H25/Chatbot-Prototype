"use client";

import { useGlobalContext } from "@/app/services/context/GlobalContext";

import Conversation from "@/app/components/conversation/Conversation";
import ConversationsTab from "@/app/components/conversationsTab/ConversationsTab";
import Chat from "@/app/interfaces/chat.interface";

export default function ConversationPage({
  params,
}: {
  params: { chatId: string };
}) {
  const { chats } = useGlobalContext();

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
