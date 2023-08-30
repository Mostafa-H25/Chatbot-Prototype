"use client";

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

import PromptModal from "@/interfaces/promptModal.interface";
import { sidebarReducer } from "./reducer";
import { MODAL_ACTION_TYPE } from "./action";

export interface StateContext {
  isSettingsModalOpen: boolean;
  isAuthenticationModalOpen: boolean;
  isPromptModalOpen: PromptModal;
  isModalOpen: boolean;
}

const initialState = {
  isSettingsModalOpen: false,
  isAuthenticationModalOpen: false,
  isPromptModalOpen: { conditional: false, prompt: undefined },
  isModalOpen: false,
};

const Context = createContext<{
  modalState: StateContext;
  modalDispatch: Dispatch<any>;
}>({
  modalState: initialState,
  modalDispatch: () => {},
});

export const useModalContext = () => useContext(Context);

interface Props {
  children: ReactNode;
}

export default function ModalContext({ children }: Props) {
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  useEffect(() => {
    if (
      state.isSettingsModalOpen ||
      state.isAuthenticationModalOpen ||
      state.isPromptModalOpen.conditional
    ) {
      dispatch({ type: MODAL_ACTION_TYPE.OPEN_MODAL });
    } else {
      dispatch({ type: MODAL_ACTION_TYPE.CLOSE_MODAL });
    }
  }, [
    state.isSettingsModalOpen,
    state.isAuthenticationModalOpen,
    state.isPromptModalOpen.conditional,
  ]);

  return (
    <Context.Provider
      value={{
        modalState: state,
        modalDispatch: dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}
