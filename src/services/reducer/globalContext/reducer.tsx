import { StateContext } from "./GlobalContext";
import { GLOBAL_ACTION_TYPE } from "./action";

type ReducerAction = {
  type: GLOBAL_ACTION_TYPE;
  payload?: any;
};

export const globalReducer = (state: StateContext, action: ReducerAction) => {
  switch (action.type) {
    case GLOBAL_ACTION_TYPE.RETRIEVE_USER_CHATS:
      return { ...state, chats: action.payload.data };
    case GLOBAL_ACTION_TYPE.CREATE_NEW_CHAT:
      return { ...state, chats: action.payload.data };
    case GLOBAL_ACTION_TYPE.EDIT_CHAT:
      return { ...state, chats: action.payload.data };
    case GLOBAL_ACTION_TYPE.DELETE_CHAT:
      return { ...state, chats: action.payload.data };
    case GLOBAL_ACTION_TYPE.DELETE_CHATS:
      return { ...state, chats: [] };
    case GLOBAL_ACTION_TYPE.RETRIEVE_USER_PROMPTS:
      return { ...state, prompts: action.payload.data };
    case GLOBAL_ACTION_TYPE.CREATE_NEW_PROMPT:
      return { ...state, prompts: action.payload.data };
    case GLOBAL_ACTION_TYPE.EDIT_PROMPT:
      return { ...state, prompts: action.payload.data };
    case GLOBAL_ACTION_TYPE.DELETE_PROMPT:
      return { ...state, prompts: action.payload.data };
    case GLOBAL_ACTION_TYPE.RETRIEVE_CHAT_MESSAGES:
      return { ...state, messages: action.payload.data };
    case GLOBAL_ACTION_TYPE.CREATE_NEW_MESSAGE:
      return { ...state, messages: action.payload.data };
    case GLOBAL_ACTION_TYPE.CREATE_NEW_CHAT_TAB:
      return { ...state, chatTabs: action.payload.data };
    case GLOBAL_ACTION_TYPE.DELETE_CHAT_TAB:
      return { ...state, chatTabs: action.payload.data };
    default:
      throw new Error(`No matching ${action.type} - action type.`);
  }
};
