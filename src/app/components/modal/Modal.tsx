"use client";

import { useRef, MouseEvent } from "react";
import ReactDOM from "react-dom";
import { useModalContext } from "@/app/services/context/ModalContext";
import SettingsModal from "./settingsModal/SettingsModal";
import AuthenticationModal from "./authenticationModal/AuthenticationModal";
import PromptModal from "./promptModal/PromptModal";

export default function Modal() {
  const {
    isModalOpen,
    setIsModalOpen,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    isAuthenticationModalOpen,
    setIsAuthenticationModalOpen,
    isPromptModalOpen,
    setIsPromptModalOpen,
  } = useModalContext();

  const ref = useRef<HTMLDivElement>(null);

  const checkIfClickedOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsAuthenticationModalOpen(false);
      setIsSettingsModalOpen(false);
      setIsPromptModalOpen({ conditional: false, prompt: {} });
      setIsModalOpen(false);
    }
  };

  const modalContent = (
    <div
      onClick={(event: MouseEvent<HTMLDivElement>) =>
        checkIfClickedOutside(event)
      }
      className="fixed flex justify-center items-center w-full h-full z-50 bg-black/50"
    >
      {/* {isAuthenticationModalOpen && (
        <>
          <div
            ref={ref}
            className="w-[512px] max-h-[624px] border border-gray-400 rounded-lg bg-violet-500 transform overflow-y-auto scrollbar p-6 transition-all"
          >
            <AuthenticationModal />
          </div>
        </>
      )} */}
      {isSettingsModalOpen && (
        <>
          <div
            ref={ref}
            className="w-[512px] border border-gray-400 rounded-lg bg-[#202123] transform overflow-y-auto p-6 transition-all"
          >
            <SettingsModal />
          </div>
        </>
      )}
      {isPromptModalOpen.conditional && (
        <>
          <div
            ref={ref}
            className="w-[512px] border border-gray-400 rounded-lg bg-[#202123] transform overflow-y-auto p-6 transition-all"
          >
            <PromptModal prompt={isPromptModalOpen.prompt!} />
          </div>
        </>
      )}
    </div>
  );

  if (isModalOpen) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  }
}
