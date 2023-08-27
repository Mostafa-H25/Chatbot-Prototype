import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AppThunk from "@/services/Store"

import { DummyUser } from '@/dummyData/dummyUser';
import  ChatTab  from '@/interfaces/chatTab.interface';
import  Chat  from '@/interfaces/chat.interface';
import  Message  from '@/interfaces/message.interface';
import Prompt from "@/interfaces/prompt.interface"
import User from '@/interfaces/user.interface'

interface AppState {
  user: User | undefined;
  chats: Chat[];
  messages: Message[];
  prompts: Prompt[];
  chatTabs: ChatTab[];
  theme: string;
}

const initialState: AppState = {
  user: DummyUser,
  chats: [],
  messages: [],
  prompts: [],
  chatTabs: [],
  theme: 'dark',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setPrompts: (state, action: PayloadAction<Prompt[]>) => {
      state.prompts = action.payload;
    },
    setChatTabs: (state, action: PayloadAction<ChatTab[]>) => {
      state.chatTabs = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { setUser, setChats, setMessages, setPrompts, setChatTabs, toggleTheme } = appSlice.actions;

export default appSlice.reducer;


