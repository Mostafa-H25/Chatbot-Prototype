'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Chat from '@/interfaces/chat.interface';
import Prompt from '@/interfaces/prompt.interface';
import PromptModal from '@/interfaces/promptModal.interface';
import Message from '@/interfaces/message.interface';
import { DummyUser } from '@/dummyData/dummyUser';
import User from '@/interfaces/user.interface';

import ChatTab from "@/interfaces/chatTab.interface";

interface StateContext {
  user: User | undefined;
  setUser: any;
  chats: Chat[];
  setChats: any;
  setMessages: any;
  prompts: Prompt[];
  setPrompts: any;
  chatTabs: ChatTab[];
  setChatTabs: any;
  theme: string;
  toggleTheme: any;

  messages: Message[];
  isMessageUpading: boolean;
  addMessages: (message: Message) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
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
  theme: '',
  toggleTheme: () => {},

  isMessageUpading: false,
  addMessages: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
};

const AppContext = createContext<StateContext>(initialState);

export const useGlobalContext = () => useContext(AppContext);

interface Props {
  children: ReactNode;
}

export default function GlobalContext({ children }: Props) {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState<User | undefined>(DummyUser);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [chatTabs, setChatTabs] = useState<ChatTab[]>([]);

  const [isMessageUpading, setIsMessageUpdating] = useState<boolean>(false);

  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isAuthenticationModalOpen, setIsAuthenticationModalOpen] =
    useState<boolean>(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState({
    conditional: false,
    prompt: undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const addMessages = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.messageId != id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevText: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.messageId === id) {
          return { ...message, text: updateFn(message.text) };
        }
        return message;
      })
    );
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
        addMessages,
        removeMessage,
        updateMessage,
        isMessageUpading,
        setIsMessageUpdating,
        
      }}>
      {children}
    </AppContext.Provider>
  );
}
