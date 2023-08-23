"use client";

import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import Chat from "@/app/interfaces/chat.interface";
import Folder from "@/app/interfaces/folder.interface";
import Prompt from "@/app/interfaces/prompt.interface";
import { useGlobalContext } from "./GlobalContext";

interface StateContext {
  folders: Folder[];
  setFolders: any;
  search: string;
  setSearch: any;
  title: string;
  setTitle: any;
  editTitle: boolean;
  setEditTitle: any;
  deleteConfirm: boolean;
  setDeleteConfirm: any;
  filteredFolders: Folder[];
  setFilteredFolders: any;
  filteredChats: Chat[];
  setFilteredChats: any;
  filteredPrompts: Prompt[];
  setFilteredPrompts: any;
  onSearch: any;
}

const initialState = {
  folders: [],
  setFolders: (folders: Folder[]) => {},
  search: "",
  setSearch: (search: string) => {},
  title: "",
  setTitle: (title: string) => {},
  editTitle: false,
  setEditTitle: (editTitle: boolean) => {},
  deleteConfirm: false,
  setDeleteConfirm: (deleteConfirm: boolean) => {},
  filteredFolders: [],
  setFilteredFolders: (filteredFolders: Folder[]) => {},
  filteredChats: [],
  setFilteredChats: (filteredChats: Chat[]) => {},
  filteredPrompts: [],
  setFilteredPrompts: (filteredPrompts: Prompt[]) => {},
  onSearch: () => {},
};

const Context = createContext<StateContext>(initialState);

export const useSidebarContext = () => useContext(Context);

interface Props {
  children: ReactNode;
}

export default function SidebarContext({ children }: Props) {
  const { chats, prompts } = useGlobalContext();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState<string>("");
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [filteredFolders, setFilteredFolders] = useState<Folder[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [tabBackgroundColor, setTabBackgroundColor] = useState("#343541");

  const onSearch = (e: ChangeEvent<HTMLInputElement>, sidebar: string) => {
    if (sidebar === "chatSidebar") {
      setSearch((prevState) => {
        const currentState = e.target.value;
        return currentState;
      });
      setFilteredChats((prevState) => {
        const currentState = chats.filter((chat: Chat) =>
          chat.title.toLowerCase().includes(search.toLowerCase())
        );
        return currentState;
      });
    } else if (sidebar === "promptSidebar") {
      setSearch((prevState) => {
        const currentState = e.target.value;
        return currentState;
      });
      setFilteredPrompts((prevState) => {
        const currentState = prompts.filter((prompt: Prompt) =>
          prompt.title.toLowerCase().includes(search.toLowerCase())
        );
        return currentState;
      });
    }
  };

  return (
    <Context.Provider
      value={{
        folders,
        setFolders,
        search,
        setSearch,
        title,
        setTitle,
        editTitle,
        setEditTitle,
        deleteConfirm,
        setDeleteConfirm,
        filteredFolders,
        setFilteredFolders,
        filteredChats,
        setFilteredChats,
        filteredPrompts,
        setFilteredPrompts,
        onSearch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
