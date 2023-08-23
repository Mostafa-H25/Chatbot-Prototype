"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import { useGlobalContext } from "@/app/services/context/GlobalContext";
import Chat from "@/app/interfaces/chat.interface";
import Message from "@/app/interfaces/message.interface";

import SendIcon from "@mui/icons-material/Send";

interface Props {
  id: string;
}

export default function MessageInput({ id }: Props) {
  const { chats, setChats, messages, setMessages } = useGlobalContext();
  const [messageContent, setMessageContent] = useState<string>("");
  const textareaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    } else if (e.key === "Enter" && e.shiftKey) {
      setMessageContent(messageContent + "\n");
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageContent.trim() === "") {
      return; // Don't submit empty messages
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    let messageCounter = String(messages.length! + 1);
    try {
      setIsLoading(true);
      const message = messageContent;
      const endpoint = `/api/chat/${id}/message`;
      const options = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      };
      const response = await fetch(endpoint, options);
      const data = await response.json();
      // dummy data
      const newMessage: Message = {
        messageId: messageCounter,
        chatId: String(id),
        userId: "1",
        question: messageContent,
        answer: "Hello Iam AI. Iam going to destroy the world.",
        createdAt: new Date(),
        isDeleted: false,
      };
      setMessages({ ...messages, newMessage });
      setChats(
        chats.map((chat: Chat) => {
          if (chat.chatId === id) {
            chat.modifiedAt = newMessage.createdAt;
            return chat;
          }
          return chat;
        })
      );
      setIsLoading(false);
      setMessageContent("");
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => handleFormSubmit(event)}
      className="absolute bottom-4 flex justify-center items-center gap-3 self-center box-border mt-4 w-full bg-[#343541] text-[14px] leading-3 text-white"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        id="messageContent"
        name="messageContent"
        placeholder="Ask me anything . . ."
        value={messageContent}
        onKeyDown={handleKeyPress}
        onChange={handleTextareaChange}
        className="w-full overflow-hidden scrollbar-none border border-neutral-600 rounded-md leading-2  py-3 px-4 focus:outline-none  resize-none p-3 bg-gray-100  text-[#343541] whitespace-pre-line"
        style={{ minHeight: "2rem" }}
      />
      <button type="submit" className="cursor-pointer">
        <SendIcon />
      </button>
    </form>
  );
}
