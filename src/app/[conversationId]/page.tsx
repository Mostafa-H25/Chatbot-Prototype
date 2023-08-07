"use client";
import { usePathname } from "next/navigation";

import { useGlobalContext } from "@/services/context/GlobalContext";

import Conversation from "@/components/conversation/Conversation";
import ConversationsTab from "@/components/conversationsTab/ConversationsTab";

export default function ConversationPage({
  params,
}: {
  params: { conversationId: string };
}) {
  const { chats } = useGlobalContext();

  const chat = chats.find((chat) => chat.id === params.conversationId);

  return (
    <main className="flex flex-1">
      <div className="relative flex flex-col flex-1 overflow-hidden bg-[#343541]">
        <ConversationsTab id={params.conversationId} chat={chat!} />
        <Conversation id={params.conversationId} />
      </div>
    </main>
  );
}
