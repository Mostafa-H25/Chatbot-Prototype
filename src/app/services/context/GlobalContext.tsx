"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Chat from "@/app/interfaces/chat.interface";
import Message from "@/app/interfaces/message.interface";
import Prompt from "@/app/interfaces/prompt.interface";
import { DummyUser } from "@/dummyData/dummyUser";
import ChatTab from "@/app/interfaces/chatTab.interface";

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

  const fetchChats = async () => {
    try {
      const endpoint = `/api/chat/`;
      const options = {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(endpoint, options);
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const fetchPrompts = async () => {
    try {
      const endpoint = `/api/prompt/`;
      const options = {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(endpoint, options);
      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    fetchChats();
    fetchPrompts();
  }, []);

  // const [currentTheme, setCurrentTheme] = useState("Light");

  // const setTheme = (e) => {
  //   setCurrentTheme(e.target.value);
  //   localStorage.setItem("themeMode", e.target.value);
  // }

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
