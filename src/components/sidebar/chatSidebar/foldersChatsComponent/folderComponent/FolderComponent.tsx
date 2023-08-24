"use client";

import { useEffect, useRef, useState } from "react";

import Folder from "@/interfaces/folder.interface";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useGlobalContext } from "@/services/context/GlobalContext";
import ChatComponent from "../ChatComponent/ChatComponent";
import { useSidebarContext } from "@/services/context/SidebarContext";
import { BlockPicker, TwitterPicker } from "react-color";
import { setChats } from "@/services/redux/reducers/appSlice";
import { setFolders } from "@/services/redux/reducers/slideBaReducer";
import { useSelector , useDispatch } from "react-redux";
import { IconCaretDown, IconCaretRight } from "@tabler/icons-react";

interface Props {
  folder: Folder;
  onDrop: (folderId: string, chatId: string) => void;
}

export default function FolderComponent({ folder, onDrop }: Props) {
  //const { chats, setChats } = useGlobalContext();
  const { chats } = useSelector((state)=> state.app);
 // const { folders, setFolders } = useSidebarContext();
  const { folders } =  useSelector((state)=> state.slide);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [deleteFolderConfirm, setDeleteFolderConfirm] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false);

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(folder.backgroundColor);
  const colorPickerRef = useRef(null);
  const [textColorClass, setTextColorClass] = useState("white");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showColorPicker &&
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showColorPicker]);
  useEffect(() => {
    if (folder && folder.backgroundColor) {
      const brightness = getBrightness(folder.backgroundColor);
      const newTextColorClass = brightness < 128 ? "white" : "black";
      setTextColorClass(newTextColorClass);
    }
  }, [folder]);

  function handleChange(e: any) {
    setTitle(e.target.value);
  }

  function editFolderName(e: any, id: string) {
    // e.preventDefault();

    dispatch(setFolders(
      folders.map((folder: Folder) => {
        if (folder.id === id) {
          return {
            ...folder, // Spread the existing properties of the folder
            title: title, // Update the title property
          };
        }
        return folder;
      })
    ));
    setEditTitle(false);
  }

  function deleteFolder(id: string) {
    const updatedFolders = folders.filter((folder: Folder) => folder.id !== id);
    dispatch(setFolders(updatedFolders));

    // Remove all chats inside the deleted folder
    const chatsToRemove = folders.find((folder) => folder.id === id)?.chatIds;
    if (chatsToRemove) {
      const updatedChats = chats.filter(
        (chat) => !chatsToRemove.includes(chat.id)
      );
      dispatch(setChats(updatedChats));
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const chatId = event.dataTransfer.getData("text/plain");
    if (!folder.chatIds.includes(chatId)) {
      console.log(
        "Dropped chat with ID:",
        chatId,
        "into folder with ID:",
        folder.id
      );
      onDrop(folder.id, chatId);
    }
  };

  function toggleChatList() {
    setIsChatListOpen((prev) => !prev);
  }

  const handleBackgroundColorChange = (color: string) => {
    setCurrentColor(color.hex);
    const updatedFolders = folders.map((f) =>
      f.id === folder.id ? { ...f, backgroundColor: color.hex } : f
    );
    dispatch(setFolders(updatedFolders));
  };

  function getBrightness(hexColor: string) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  }

  return (
    <>
      <div
        className="relative flex items-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {editTitle ? (
          <>
            <button
              className="flex w-full cursor-pointer  items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#343541]/90 border border-gray-500"
              style={{
                backgroundColor: folder.backgroundColor,
              }}
            >
              <IconCaretRight size={18} color={textColorClass} />
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={() => handleChange(event)}
                autoFocus
                className={`mr-12 flex-1 overflow-hidden overflow-ellipsis border-neutral-400 bg-transparent text-left text-[12.5px] leading-3 text-${textColorClass} outline-none focus:border-neutral-100`}
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
            <button
              className="flex w-full cursor-pointer my-2 items-center gap-3 rounded-lg p-3 text-sm transition-colors duration-200 hover:bg-[#343541]/90 border border-gray-500"
              onClick={toggleChatList}
              style={{
                backgroundColor: folder.backgroundColor,
              }}
            >
              {isChatListOpen ? (
                <IconCaretDown size={18} color={textColorClass} />
              ) : (
                <IconCaretRight size={18} color={textColorClass} />
              )}

              <div
                className={`relative max-h-5 flex-1 overflow-hidden text-red whitespace-nowrap break-all text-left text-[12.5px] leading-3 text-${textColorClass}`}
              >
                {folder.title}
              </div>
            </button>

            {deleteFolderConfirm ? (
              <>
                <div className="absolute right-1 z-10 flex text-gray-300">
                  <button
                    onClick={() => deleteFolder(folder.id)}
                    className="min-w-[20px] p-1 text-red-600 "
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
                <div className="absolute right-1  flex text-gray-300">
                  <div>
                    <div className="relative">
                      <button
                        className={`bg-${textColorClass} font-bold p-3 rounded-full transition`}
                        onClick={() => setShowColorPicker(!showColorPicker)}
                      ></button>
                    </div>
                    {showColorPicker && (
                      <div
                        className="absolute -right-1 top-9 z-50"
                        ref={colorPickerRef}
                      >
                        <BlockPicker
                          onChange={handleBackgroundColorChange}
                          color={currentColor}
                        />
                      </div>
                    )}
                  </div>
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
      {isChatListOpen && (
        <ul className="pl-3 border-l border-gray-300 mt-2">
          {folder.chatIds.map((chatId) => {
            const chat = chats.find((c) => c.id === chatId);
            return (
              <li key={chatId} className="mb-1 text-center">
                {chat && <ChatComponent chat={chat} />}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
