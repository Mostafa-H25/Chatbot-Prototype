"use client";

import { useEffect , useRef , useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/services/context/GlobalContext";
import Chat from "@/interfaces/chat.interface";
import { setChats } from "@/services/redux/reducers/appSlice";
import { useSelector , useDispatch } from "react-redux";
import { setMessages } from "@/services/redux/reducers/appSlice";
import MessageInput from "./components/input/Input";
import Messages from "./components/messages/Messages";

interface Props {
  id: string;
}

export default function Conversation({ id }: Props) {
  //const { user, chats, theme } = useGlobalContext();
  const { user, chats, theme , messages} = useSelector((state)=> state.app);
  const dispatch = useDispatch()
  const [messageContent, setMessageContent] = useState("");
  const textareaRef = useRef(null);
  // const { chats, messages, setMessages, theme } = useGlobalContext();

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

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   if (messageContent.trim() === "") {
  //     return; // Don't submit empty messages
  //   }
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = "auto";
  //   }
  //   let messageCounter = String(chat?.conversation.length! + 1);
  //   dispatch(setChats(
  //     chats.map((chat: Chat) => {
  //       if (chat.id === id) {
  //         return {
  //           ...chat,
  //           conversation: [
  //             ...chat.conversation,
  //             {
  //               id: messageCounter,
  //               user: user,
  //               content: messageContent,
  //               createdAt: new Date(),
  //             }
  //           ],
  //           modifiedAt: new Date(),
  //         };
  //       }
  //       return chat;
  //     })
  //   ));
  //   setMessageContent("");
  //   messageCounter = String(chat?.conversation.length! + 1);
  //   dispatch(setChats(
  //     chats.map((chat: Chat) => {
  //       if (chat.id === id) {
  //         return {
  //           ...chat,
  //           conversation: [
  //             ...chat.conversation,
  //             {
  //               id: messageCounter,
  //               user: undefined,
  //               content: `hi, how are you. i am an artificial intelligence bot
  //                         here to support you reach the results you are looking
  //                         for. ask me about anything you need to know about. there
  //                         seems to be an error. please contact the customer service
  //                         to get the error as fixed as soon as possible. thank you.`,
  //               createdAt: new Date(),
  //             },
  //           ],
  //           modifiedAt: new Date(),
  //         };
  //       }
  //       return chat;
  //     })
  //   ));
  // };
  // const handleFormSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   handleSubmit();
  // };

  // const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setMessageContent(e.target.value);
  //   e.target.style.height = "auto";
  //   e.target.style.height = `${e.target.scrollHeight}px`;
  // };

  const chat = chats.find((chat: Chat) => chat.id === id);

  // chat?.conversation.sort((a, b) => {
  //   return Number(b.createdAt) - Number(a.createdAt);
  // });
  const chatToSort = chats.find((chat) => chat.id === id);
  useEffect(() => {
    fetchMessages();
  }, []);

  if (messages) {
    messages.sort((a, b) => {
      return Number(b.createdAt) - Number(a.createdAt);
    });
  }

  if (chatToSort) {
    // Create a copy of the conversation array and sort it
    const sortedConversation = [...chatToSort.conversation].sort(
      (a, b) => Number(b.createdAt) - Number(a.createdAt)
    );

    // Update the chat object with the sorted conversation
    const updatedChat = {
      ...chatToSort,
      conversation: sortedConversation,
    };

    // Find the index of the chat in the array
    const chatIndex = chats.findIndex((chat) => chat.id === id);

    if (chatIndex !== -1) {
      // Create a new copy of the chats array with the updated chat
      const updatedChats = [...chats];
      updatedChats[chatIndex] = updatedChat;

      // Now you can update your Redux state with the updatedChats array
      // dispatch(setChats(updatedChats));
    }
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