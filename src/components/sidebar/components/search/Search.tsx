import { ChangeEvent } from "react";
import Chat from "@/interfaces/chat.interface";
import Prompt from "@/interfaces/prompt.interface";

import CloseIcon from "@mui/icons-material/Close";
import { useSidebarContext } from "@/services/context/SidebarContext";
import {setSearch} from '@/services/redux/reducers/slideBaReducer'
import {setFilteredChats} from '@/services/redux/reducers/slideBaReducer'
import {setFilteredPrompts} from '@/services/redux/reducers/slideBaReducer'
import { useSelector , useDispatch } from "react-redux";
import { useGlobalContext } from "@/services/context/GlobalContext";

interface Props {
  sidebar: string;
}

export default function Search({ sidebar }: Props) {
  // const { chats, prompts } = useGlobalContext();
  // const { search, setSearch, setFilteredChats, setFilteredPrompts } =
  //   useSidebarContext();
  const { chats , prompts} = useSelector((state)=> state.app);
  const { search } = useSelector((state)=> state.slide);
  const dispatch = useDispatch();
  const onSearch = (e: ChangeEvent<HTMLInputElement>, sidebar: string) => {
    if (sidebar === "chatSidebar") {
      dispatch(setSearch((prevState: any) => {
        const currentState = e.target.value;
        return currentState;
      }));
      dispatch(setFilteredChats((prevState: any) => {
        const currentState = chats.filter((chat: Chat) =>
          chat.title.toLowerCase().includes(search.toLowerCase())
        );
        return currentState;
      }));
    } else if (sidebar === "promptSidebar") {
      dispatch(setSearch((prevState: any) => {
        const currentState = e.target.value;
        return currentState;
      }));
      dispatch(setFilteredPrompts((prevState: any) => {
        const currentState = prompts.filter((prompt: Prompt) =>
          prompt.title.toLowerCase().includes(search.toLowerCase())
        );
        return currentState;
      }));
    }
  };

  const clearSearch = () => {
    dispatch(setSearch(""));
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
