import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import Chat from "@/interfaces/chat.interface";
import Folder from "@/interfaces/folder.interface";
import Prompt from "@/interfaces/prompt.interface";

interface SidebarState {
search: string;
filteredFolders: Folder[];
filteredChats: Chat[];
filteredPrompts: Prompt[];
folders: Folder[];
}

const initialState: SidebarState = {
search: "",
filteredFolders: [],
filteredChats: [],
filteredPrompts: [],
folders: [],
};

const sidebarSlice = createSlice({
name: "sidebar",
initialState,
reducers: {
setSearch: (state, action: PayloadAction<string>) => {
state.search = action.payload;
},
setFilteredFolders: (state, action: PayloadAction<Folder[]>) => {
state.filteredFolders = action.payload;
},
setFilteredChats: (state, action: PayloadAction<Chat[]>) => {
state.filteredChats = action.payload;
},
setFilteredPrompts: (state, action: PayloadAction<Prompt[]>) => {
state.filteredPrompts = action.payload;
},
setFolders: (state, action: PayloadAction<Folder[]>) => {
state.folders = action.payload;
},
},
});

export const {
setSearch,
setFilteredFolders,
setFilteredChats,
setFilteredPrompts,
setFolders,
} = sidebarSlice.actions;

export const selectSearch = (state) => state.sidebar.search;
export const selectFilteredFolders = (state) =>
state.sidebar.filteredFolders;
export const selectFilteredChats = (state) =>
state.sidebar.filteredChats;
export const selectFilteredPrompts = (state) =>
state.sidebar.filteredPrompts;
export const selectFolders = (state) => state.sidebar.folders;

export default sidebarSlice.reducer;