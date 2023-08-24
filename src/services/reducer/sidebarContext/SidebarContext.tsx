"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

import Chat from "@/interfaces/chat.interface";
import Folder from "@/interfaces/folder.interface";
import Prompt from "@/interfaces/prompt.interface";
import { sidebarReducer } from "./reducer";

export interface StateContext {
  folders: Folder[];
  search: string;
  title: string;
  editTitle: boolean;
  delete: boolean;
  filteredFolders: Folder[];
  filteredChats: Chat[];
  filteredPrompts: Prompt[];
}

const initialState = {
  folders: [],
  editTitle: false,
  title: "",
  delete: false,
  search: "",
  filteredFolders: [],
  filteredChats: [],
  filteredPrompts: [],
};

const Context = createContext<{
  sidebarState: StateContext;
  sidebarDispatch: Dispatch<any>;
}>({ sidebarState: initialState, sidebarDispatch: () => {} });

export const useSidebarContext = () => useContext(Context);

interface Props {
  children: ReactNode;
}

export default function SidebarContext({ children }: Props) {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  return (
    <Context.Provider
      value={{
        sidebarState: state,
        sidebarDispatch: dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
