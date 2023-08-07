"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

import { useGlobalContext } from "@/services/context/GlobalContext";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyIcon from "@mui/icons-material/Key";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function ChatSidebarFooter() {
  const {
    user,
    setUser,
    chats,
    setChats,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
    isAuthenticationModalOpen,
    setIsAuthenticationModalOpen,
  } = useGlobalContext();

  const [deleteChatsConfirm, setDeleteChatsConfirm] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {chats.length > 0 ? (
        <>
          {deleteChatsConfirm ? (
            <>
              <button className="relative flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10">
                <FileUploadIcon />
                <span>Are you sure?</span>
                <div className="absolute right-1 z-10 flex text-gray-300">
                  <button
                    onClick={() => setChats([])}
                    type="submit"
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => setDeleteChatsConfirm(!deleteChatsConfirm)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <ClearIcon />
                  </button>
                </div>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setDeleteChatsConfirm(!deleteChatsConfirm)}
                className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
              >
                <FileUploadIcon />
                <span>Clear Chats</span>
              </button>
            </>
          )}
        </>
      ) : (
        <></>
      )}

      <button className="flex items-center gap-3 w-full cursor-pointer select-none rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10">
        <label
          htmlFor="fileImport"
          className="flex items-center gap-3 w-full h-full"
        >
          <input
            type="file"
            accept=".json"
            name="fileImport"
            id="fileImport"
            className="hidden"
          />
          <FileUploadIcon />
          <span>Import data</span>
        </label>
      </button>
      <button className="flex items-center gap-3 w-full cursor-pointer select-none rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10">
        <Link
          href="/history"
          download={<p>history</p>}
          rel="noreferrer"
          className="flex items-center gap-3 w-full h-full"
        >
          <FileDownloadIcon />
          <span>Export data</span>
        </Link>
      </button>
      <button
        onClick={() => setIsSettingsModalOpen(true)}
        className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
      >
        <SettingsIcon />
        <span>Settings</span>
      </button>
      {/* user.isAuthenticated */}
      {user?.isAuthenticated === false ? (
        <>
          <button
            onClick={() => setIsAuthenticationModalOpen(true)}
            className="flex justify-center w-full cursor-pointer select-none items-center gap-3 rounded-md bg-violet-500 py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-violet-600"
          >
            <KeyIcon />
            <span>Sign In</span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setUser({ ...user, isAuthenticated: false })}
            className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
          >
            <SettingsIcon />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  );
}
