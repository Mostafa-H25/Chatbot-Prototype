import { StateContext } from "./SidebarContext";
import { SIDEBAR_ACTION_TYPE } from "./action";

type ReducerAction = {
  type: SIDEBAR_ACTION_TYPE;
  payload?: any;
};

export const sidebarReducer = (state: StateContext, action: ReducerAction) => {
  switch (action.type) {
    case SIDEBAR_ACTION_TYPE.RETRIEVE_USER_FOLDERS:
      return { ...state, folders: action.payload.data };
    case SIDEBAR_ACTION_TYPE.CREATE_NEW_FOLDER:
      return { ...state, folders: action.payload.data };
    case SIDEBAR_ACTION_TYPE.EDIT_FOLDER:
      return { ...state, folders: action.payload.data };
    case SIDEBAR_ACTION_TYPE.DELETE_FOLDER:
      return { ...state, folders: action.payload.data };
    case SIDEBAR_ACTION_TYPE.OPEN_EDIT_TITLE:
      return { ...state, editTitle: true };
    case SIDEBAR_ACTION_TYPE.CLOSE_EDIT_TITLE:
      return { ...state, editTitle: false };
    case SIDEBAR_ACTION_TYPE.NEW_TITLE:
      return { ...state, title: action.payload.title };
    case SIDEBAR_ACTION_TYPE.DELETE:
      return { ...state, delete: true };
    case SIDEBAR_ACTION_TYPE.CANCEL_DELETE:
      return { ...state, delete: false };
    case SIDEBAR_ACTION_TYPE.SEARCH:
      return { ...state, search: action.payload.search };
    case SIDEBAR_ACTION_TYPE.CLEAR_SEARCH:
      return { ...state, search: "" };
    case SIDEBAR_ACTION_TYPE.SEARCH_CHATS:
      return { ...state, filteredChats: action.payload.chats };
    case SIDEBAR_ACTION_TYPE.SEARCH_PROMPTS:
      return { ...state, filteredPrompts: action.payload.prompts };
    case SIDEBAR_ACTION_TYPE.SEARCH_FOLDERS:
      return { ...state, filteredFolders: action.payload.folders };
    default:
      throw new Error(`No matching ${action.type} - action type.`);
  }
};
