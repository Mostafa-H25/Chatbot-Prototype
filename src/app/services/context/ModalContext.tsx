"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import PromptModal from "@/app/interfaces/promptModal.interface";

interface StateContext {
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: any;
  isAuthenticationModalOpen: boolean;
  setIsAuthenticationModalOpen: any;
  isPromptModalOpen: PromptModal;
  setIsPromptModalOpen: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
}

const initialState = {
  isSettingsModalOpen: false,
  setIsSettingsModalOpen: (isSettingsModalOpen: boolean) => {},
  isAuthenticationModalOpen: false,
  setIsAuthenticationModalOpen: (isAuthenticationModalOpen: boolean) => {},
  isPromptModalOpen: { conditional: false, prompt: undefined },
  setIsPromptModalOpen: (isPromptModalOpen: {}) => {},
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => {},
};

const Context = createContext<StateContext>(initialState);

export const useModalContext = () => useContext(Context);

interface Props {
  children: ReactNode;
}

export default function ModalContext({ children }: Props) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);
  const [isAuthenticationModalOpen, setIsAuthenticationModalOpen] =
    useState<boolean>(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState({
    conditional: false,
    prompt: undefined,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (
      isSettingsModalOpen ||
      isAuthenticationModalOpen ||
      isPromptModalOpen.conditional
    ) {
      setIsModalOpen(true);
      console.log(isAuthenticationModalOpen);
    } else {
      setIsModalOpen(false);
    }
  }, [
    isSettingsModalOpen,
    isAuthenticationModalOpen,
    isPromptModalOpen.conditional,
  ]);

  return (
    <Context.Provider
      value={{
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isAuthenticationModalOpen,
        setIsAuthenticationModalOpen,
        isPromptModalOpen,
        setIsPromptModalOpen,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
}
