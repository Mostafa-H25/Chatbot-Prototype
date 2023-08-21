"use client";

import { useState } from "react";

import Folder from "@/interfaces/folder.interface";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useSidebarContext } from "@/services/context/SidebarContext";

interface Props {
  folder: Folder;
}

export default function FolderComponent({ folder }: Props) {
  const [title, setTitle] = useState(folder.title);
  const [editTitle, setEditTitle] = useState(false);
  const [deleteFolderConfirm, setDeleteFolderConfirm] = useState(false);
  const { folders, setFolders } = useSidebarContext();

  function handleChange(e: any, id: number) {
    setTitle(e.target.value);
  }

  function editFolderName(e: any, id: number) {
    e.preventDefault();
    setFolders(
      folders.map((folder: Folder) => {
        if (folder.id === String(id)) {
          folder.title = title;
          return folder;
        }
        return folder;
      })
    );
    setEditTitle(false);
  }

  function deleteFolder(id: number) {
    setFolders(folders.filter((folder: Folder) => folder.id !== String(id)));
  }

  return (
    <>
      <div className="relative flex items-center">
        {editTitle ? (
          <>
            <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#343541]/90">
              <PlayArrowIcon />
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={() => handleChange(event, folder.id)}
                autoFocus
                className="mr-12 flex-1 overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-white outline-none focus:border-neutral-100"
              />
            </button>

            <div className="absolute right-1 z-10 flex text-gray-300">
              <button
                onClick={() => editFolderName(event, folder.id)}
                type="submit"
                className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
              >
                <CheckIcon />
              </button>
              <button
                onClick={() => setEditTitle(!editTitle)}
                className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
              >
                <ClearIcon />
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#343541]/90">
              <PlayArrowIcon />
              <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap break-all text-left text-[12.5px] leading-3">
                {folder.title}
              </div>
            </button>

            {deleteFolderConfirm ? (
              <>
                <div className="absolute right-1 z-10 flex text-gray-300">
                  <button
                    onClick={() => deleteFolder(folder.id)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => setDeleteFolderConfirm(!deleteFolderConfirm)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <ClearIcon />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="absolute right-1 z-10 flex text-gray-300">
                  <button
                    onClick={() => setEditTitle(!editTitle)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => setDeleteFolderConfirm(!deleteFolderConfirm)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
