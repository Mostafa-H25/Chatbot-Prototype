"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Chat from "@/interfaces/chat.interface";
import Message from "@/interfaces/message.interface";
import Prompt from "@/interfaces/prompt.interface";
import { DummyUser } from "@/dummyData/dummyUser";
import ChatTab from "@/interfaces/chatTab.interface";

interface StateContext {
  user: User | undefined;
  setUser: any;
  chats: Chat[];
  setChats: any;
  messages: Message[];
  setMessages: any;
  prompts: Prompt[];
  setPrompts: any;
  chatTabs: ChatTab[];
  setChatTabs: any;
  theme: string;
  toggleTheme: any;
}

const initialState = {
  user: undefined,
  setUser: (user: User) => {},
  chats: [],
  setChats: (chats: Chat[]) => {},
  messages: [],
  setMessages: (messages: Message[]) => {},
  prompts: [],
  setPrompts: (prompts: Prompt[]) => {},
  chatTabs: [],
  setChatTabs: (chatTabs: ChatTab[]) => {},
  theme: "",
  toggleTheme: () => {},
};

const AppContext = createContext<StateContext>(initialState);

export const useGlobalContext = () => useContext(AppContext);

interface Props {
  children: ReactNode;
}

export default function GlobalContext({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(DummyUser);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [chatTabs, setChatTabs] = useState<ChatTab[]>([]);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // const fetchChats = async () => {
  //   try {
  //     const endpoint = `/api/chat/`;
  //     const options = {
  //       method: "GET",
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const response = await fetch(endpoint, options);
  //     const data = await response.json();
  //     setChats(data);
  //   } catch (error) {
  //     console.log("ERROR", error);
  //   }
  // };
  // const fetchPrompts = async () => {
  //   try {
  //     const endpoint = `/api/prompt/`;
  //     const options = {
  //       method: "GET",
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const response = await fetch(endpoint, options);
  //     const data = await response.json();
  //     setPrompts(data);
  //   } catch (error) {
  //     console.log("ERROR", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchChats();
  //   fetchPrompts();
  // }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        messages,
        setMessages,
        prompts,
        setPrompts,
        chatTabs,
        setChatTabs,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
