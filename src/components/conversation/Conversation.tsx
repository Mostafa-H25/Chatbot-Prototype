"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";

import { useGlobalContext } from "@/services/context/GlobalContext";

import { useRef } from "react";

import Chat from "@/interfaces/chat.interface";

import SendIcon from "@mui/icons-material/Send";

interface Props {
  id: string;
}

export default function Conversation({ id }: Props) {
  const { user, chats, setChats, theme } = useGlobalContext();
  const [messageContent, setMessageContent] = useState("");
  const textareaRef = useRef(null);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "Enter" && e.shiftKey) {
      setMessageContent(messageContent + "\n");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (messageContent.trim() === "") {
      return; // Don't submit empty messages
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    let messageCounter = String(chat?.conversation.length! + 1);
    setChats(
      chats.map((chat: Chat) => {
        if (chat.id === id) {
          chat.conversation.push({
            id: messageCounter,
            user: user,
            content: messageContent,
            createdAt: new Date(),
          });
          chat.modifiedAt = new Date();
          return chat;
        }
        return chat;
      })
    );
    setMessageContent("");
    messageCounter = String(chat?.conversation.length! + 1);
    setChats(
      chats.map((chat: Chat) => {
        if (chat.id === id) {
          chat.conversation.push({
            id: messageCounter,
            user: undefined,
            content: `hi, how are you. i am an artificial intelligence bot 
                      here to support you reach the results you are looking 
                      for. ask me about anything you need to know about. there 
                      seems to be an error. please contact the customer service 
                      to get the error as fixed as soon as possible. thank you.`,
            createdAt: new Date(),
          });
          chat.modifiedAt = new Date();
          return chat;
        }
        return chat;
      })
    );
  };
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const chat = chats.find((chat: Chat) => chat.id === id);

  chat?.conversation.sort((a, b) => {
    return Number(b.createdAt) - Number(a.createdAt);
  });

  return (
    <>
      {chats.find((chat: Chat) => chat.id.includes(id)) ? (
        <>
          <div
            className={`relative flex flex-col flex-1 h-full w-full border-t border-t-neutral-800  p-4 text-center ${
              theme === "dark" ? " bg-[#343541]" : "bg-white text-black/80"
            }`}
          >
            {/* Messages */}
            <div className="flex flex-col-reverse justify-start flex-1 mb-12 overflow-y-auto scrollbar">
              {chat?.conversation?.map((message) => {
                if (message) {
                  return (
                    <div
                      key={message.id}
                      className={`flex flex-col items-end gap-2 self-${
                        message.user === undefined ? "start" : "end"
                      } m-2 max-w-[512px] border border-neutral-600 rounded-md bg-gray-800/10 py-3 px-4 whitespace-pre-line`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-400">
                        {String(message.createdAt)}
                      </p>
                    </div>
                  );
                }
              })}
            </div>

            {/* Input Message */}
            <form
              onSubmit={(event: FormEvent<HTMLFormElement>) =>
                handleFormSubmit(event)
              }
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
          </div>
        </>
      ) : (
        <>
          <div
            className={`flex flex-col justify-center items-center flex-1 ${
              theme === "dark"
                ? " bg-[#343541] text-white"
                : "bg-white text-black/80"
            }`}
          >
            <p className="text-2xl font-bold ">
              This Conversation does not exist.
            </p>
            <Link
              href={"/chats"}
              className="text-xl font-bold text-sky-700 underline"
            >
              Home
            </Link>
          </div>
        </>
      )}
    </>
  );
}
