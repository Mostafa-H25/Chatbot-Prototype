// "use client";

// import {
//   Dispatch,
//   ReactNode,
//   createContext,
//   useContext,
//   useReducer,
// } from "react";
// import Chat from "@/interfaces/chat.interface";
// import Prompt from "@/interfaces/prompt.interface";
// import { DummyUser } from "@/dummyData/dummyUser";
// import { ChatTab } from "@/interfaces/chatTab.interface";

// interface StateContext {
//   user: User | undefined;
//   chats: Chat[];
//   prompts: Prompt[];
//   isSettingsModalOpen: boolean;
//   isAuthenticationModalOpen: boolean;
//   isPromptModalOpen: { conditional: boolean; prompt: Prompt };
//   chatTabs: ChatTab[];
// }

// const initialState = {
//   user: DummyUser,
//   chats: [],
//   prompts: [],
//   isSettingsModalOpen: false,
//   isAuthenticationModalOpen: false,
//   isPromptModalOpen: { conditional: false, prompt: {} },
//   chatTabs: [],
// };

// const AppContext = createContext<{
//   state: StateContext;
//   dispatch: Dispatch<any>;
// }>({
//   state: initialState,
//   dispatch: () => {},
// });

// const globalReducer = (state: StateContext, action: {}) => ({
//   //key: local reducer function (state, action),
//   //key: local reducer function (state, action),
// });

// export const useGlobalContext = () => useContext(AppContext);

// interface Props {
//   children: ReactNode;
// }

// export default function GlobalContext({ children }: Props) {
//   const [state, dispatch] = useReducer(globalReducer, initialState);

//   return (
//     <AppContext.Provider
//       value={{
//         state,
//         dispatch,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// }
