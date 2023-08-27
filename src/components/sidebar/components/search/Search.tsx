import { ChangeEvent } from "react";
import { useSidebarContext } from "@/services/context/SidebarContext";
import Chat from "@/interfaces/chat.interface";
import Prompt from "@/interfaces/prompt.interface";

import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "@/services/context/GlobalContext";

interface Props {
  sidebar: string;
}

export default function Search({ sidebar }: Props) {
  const { chats, prompts } = useGlobalContext();
  const { search, setSearch, setFilteredChats, setFilteredPrompts } =
    useSidebarContext();

  const onSearch = (e: ChangeEvent<HTMLInputElement>, sidebar: string) => {
    if (sidebar === "chatSidebar") {
      setSearch((prevState: any) => {
        const currentState = e.target.value;
        return currentState;
      });
      setFilteredChats((prevState: any) => {
        const currentState = chats.filter((chat: Chat) =>
          chat.title.toLowerCase().includes(search.toLowerCase())
        );
        return currentState;
      });
    } else if (sidebar === "promptSidebar") {
      setSearch((prevState: any) => {
        const currentState = e.target.value;
        return currentState;
      });
      setFilteredPrompts((prevState: any) => {
        const currentState = prompts.filter((prompt: Prompt) =>
          prompt.title.toLowerCase().includes(search.toLowerCase())
        );
        return currentState;
      });
    }
  };

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="relative flex items-center">
      <input
        className="w-full flex-1 rounded-md border border-neutral-600 bg-[#202123] px-4 py-3 pr-10 text-[14px] leading-3 text-white"
        type="text"
        id="search"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onSearch(event, sidebar)
        }
      />
      {search && (
        <button
          onClick={() => clearSearch()}
          className="absolute right-1 top-1 bottom-1 "
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
