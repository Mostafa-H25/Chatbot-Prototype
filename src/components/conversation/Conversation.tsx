"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";
import Link from "next/link";

import { useGlobalContext } from "@/services/context/GlobalContext";

import Chat from "@/interfaces/chat.interface";

import SendIcon from "@mui/icons-material/Send";

interface Props {
  id: string;
}

export default function Conversation({ id }: Props) {
  const { user, chats, setChats } = useGlobalContext();

  const [messageContent, setMessageContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageContent(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    setIsLoading(true);
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
    setIsLoading(false);
  };

  const chat = chats.find((chat: Chat) => chat.id === id);

  chat?.conversation.sort((a, b) => {
    return Number(b.createdAt) - Number(a.createdAt);
  });

  return (
    <>
      {chats.find((chat: Chat) => chat.id.includes(id)) ? (
        <>
          <div className="relative flex flex-col flex-1 w-full border-t border-t-neutral-800 bg-[#343541] p-4">
            {/* Messages */}
            <div className="flex flex-col-reverse justify-start flex-1 mb-12 overflow-y-auto scrollbar">
              {chat?.conversation?.map((message) => {
                if (message) {
                  return (
                    <div
                      key={message.id}
                      className={`flex flex-col items-end gap-2 self-${
                        message.user === undefined ? "start" : "end"
                      } m-2 max-w-[512px] border border-neutral-600 rounded-md bg-gray-800/10 py-3 px-4`}
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
                handleSubmit(event)
              }
              className="absolute bottom-4 flex justify-center items-center gap-3 self-center box-border mt-4 w-full bg-[#343541] text-[14px] leading-3 text-white"
            >
              <input
                type="text"
                id="messageContent"
                name="messageContent"
                placeholder="Ask me anything . . ."
                value={messageContent}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                // onKeyUpCapture={(event: KeyboardEvent<HTMLInputElement>) =>
                //   handleKeyPress(event)
                // }
                className="w-full border border-neutral-600 rounded-md bg-[#343541] py-3 px-4 focus:outline-none focus:bg-[#202123]"
              />
              <button type="submit" className="cursor-pointer">
                <SendIcon />
              </button>
            </form>
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
