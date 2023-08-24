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
  filteredFolders: Folder[];
  setFilteredFolders: any;
  filteredChats: Chat[];
  setFilteredChats: any;
  filteredPrompts: Prompt[];
  setFilteredPrompts: any;
}

const initialState = {
  folders: [],
  setFolders: (folders: Folder[]) => {},
  search: "",
  setSearch: (search: string) => {},
  filteredFolders: [],
  setFilteredFolders: (filteredFolders: Folder[]) => {},
  filteredChats: [],
  setFilteredChats: (filteredChats: Chat[]) => {},
  filteredPrompts: [],
  setFilteredPrompts: (filteredPrompts: Prompt[]) => {},
};

const Context = createContext<StateContext>(initialState);

export const useSidebarContext = () => useContext(Context);

interface Props {
  children: ReactNode;
}

export default function SidebarContext({ children }: Props) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [search, setSearch] = useState("");
  const [filteredFolders, setFilteredFolders] = useState<Folder[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);

  return (
    <Context.Provider
      value={{
        folders,
        setFolders,
        search,
        setSearch,
        filteredFolders,
        setFilteredFolders,
        filteredChats,
        setFilteredChats,
        filteredPrompts,
        setFilteredPrompts,
      }}
    >
      {children}
    </Context.Provider>
  );
}
