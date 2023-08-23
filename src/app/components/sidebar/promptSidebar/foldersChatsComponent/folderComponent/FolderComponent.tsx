"use client";

import { ChangeEvent, MouseEvent, useState } from "react";
import { useSidebarContext } from "@/app/services/context/SidebarContext";
import Folder from "@/app/interfaces/folder.interface";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  folder: Folder;
}

export default function FolderComponent({ folder }: Props) {
  const [title, setTitle] = useState(folder.title);
  const [editTitle, setEditTitle] = useState(false);
  const [deleteFolderConfirm, setDeleteFolderConfirm] = useState(false);
  const { folders, setFolders } = useSidebarContext();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  const editFolderName = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    // try {
    //   const folder: Folder | undefined = folders.find(
    //     (folder: Folder) => folder.folderId === id
    //   );
    //   if (folder) folder.title = e.currentTarget.value;
    //   const endpoint = `/api/folder/${id}`;
    //   const options = {
    //     method: "PUT",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ folder }),
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();

    //   // dummy data
    //   const updatedFolder: Folder = {
    //     folderId: id,
    //     userId: "1",
    //     title: e.currentTarget.value,
    //     type: "PROMPT",
    //     createdAt: new Date(),
    //     isDeleted: false,
    //   };
    //   setFolders(
    //     folders.map((folder: Folder) => {
    //       if (folder.folderId === id) {
    //         folder = updatedFolder;
    //         return folder;
    //       }
    //       return folder;
    //     })
    //   );
    // } catch (error) {
    //   console.log("ERROR", error);
    // }

    setFolders(
      folders.map((folder: Folder) => {
        if (folder.folderId === String(id)) {
          folder.title = title;
          return folder;
        }
        return folder;
      })
    );
    setEditTitle(false);
  };

  const deleteFolder = async (id: string) => {
    setFolders(
      folders.filter((folder: Folder) => folder.folderId !== String(id))
    );
    // try {
    //   const endpoint = `/api/folder/${id}`;
    //   const options = {
    //     method: "DELETE",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();

    //   // dummy data
    //   setFolders(folders.filter((folder: Folder) => folder.folderId !== id));
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
  };

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
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event)
                }
                autoFocus
                className="mr-12 flex-1 overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-white outline-none focus:border-neutral-100"
              />
            </button>

            <div className="absolute right-1 z-10 flex text-gray-300">
              <button
                onClick={(event: MouseEvent<HTMLButtonElement>) =>
                  editFolderName(event, folder.folderId)
                }
                type="submit"
                className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
              >
                <CheckIcon />
              </button>
              <button
                onClick={() => setEditTitle(false)}
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
                    onClick={() => deleteFolder(folder.folderId)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => setDeleteFolderConfirm(false)}
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
                    onClick={() => setEditTitle(true)}
                    className="min-w-[20px] p-1 text-neutral-400 hover:text-neutral-100"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => setDeleteFolderConfirm(true)}
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
