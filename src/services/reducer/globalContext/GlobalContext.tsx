"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import Chat from "@/interfaces/chat.interface";
import Prompt from "@/interfaces/prompt.interface";
import ChatTab from "@/interfaces/chatTab.interface";
import Message from "@/interfaces/message.interface";
import { globalReducer } from "./reducer";
import { GLOBAL_ACTION_TYPE } from "./action";
import { DummyUser } from "@/dummyData/dummyUser";

export interface StateContext {
  user: User | undefined;
  chats: Chat[];
  messages: Message[];
  prompts: Prompt[];
  chatTabs: ChatTab[];
}

const initialState = {
  user: undefined,
  chats: [],
  messages: [],
  prompts: [],
  chatTabs: [],
};

const Context = createContext<{
  globalState: StateContext;
  globalDispatch: Dispatch<any>;
}>({
  globalState: initialState,
  globalDispatch: () => {},
});

export const useGlobalContext = () => useContext(Context);

interface Props {
  children: ReactNode;
}

export default function GlobalContext({ children }: Props) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

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
      dispatch({
        type: GLOBAL_ACTION_TYPE.RETRIEVE_USER_CHATS,
        payload: { data },
      });
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
      dispatch({
        type: GLOBAL_ACTION_TYPE.RETRIEVE_USER_PROMPTS,
        payload: { data },
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (state.user) {
      fetchChats();
      fetchPrompts();
    }
  }, []);

  return (
    <Context.Provider
      value={{
        globalState: state,
        globalDispatch: dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
