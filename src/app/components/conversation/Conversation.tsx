"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/app/services/context/GlobalContext";
import Chat from "@/app/interfaces/chat.interface";

import MessageInput from "./components/input/Input";
import Messages from "./components/messages/Messages";

interface Props {
  id: string;
}

export default function Conversation({ id }: Props) {
  const { chats, messages, setMessages, theme } = useGlobalContext();

  const fetchMessages = async () => {
    try {
      const endpoint = `/api/chat/${id}`;
      const options = {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(endpoint, options);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  if (messages) {
    messages.sort((a, b) => {
      return Number(b.createdAt) - Number(a.createdAt);
    });
  }

  return (
    <>
      {chats.find((chat: Chat) => chat.chatId.includes(id)) ? (
        <>
          <div className="relative flex flex-col flex-1 w-full border-t border-t-neutral-800 bg-[#343541] p-4">
            {/* Messages */}
            <Messages messages={messages} />

            {/* Input Message */}
            <MessageInput id={id} />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center flex-1 ">
            <p className="text-2xl font-bold text-white">
              This Conversation does not exist.
            </p>
            <Link
              href={"/"}
              className="text-xl font-bold text-sky-700 underline "
            >
              Home
            </Link>
          </div>
        </>
      )}
    </>
  );
}
