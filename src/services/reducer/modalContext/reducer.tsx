import { StateContext } from "./ModalContext";
import { MODAL_ACTION_TYPE } from "./action";

type ReducerAction = {
  type: MODAL_ACTION_TYPE;
  payload?: any;
};

export const sidebarReducer = (state: StateContext, action: ReducerAction) => {
  switch (action.type) {
    case MODAL_ACTION_TYPE.OPEN_MODAL:
      return { ...state, isModalOpen: true };
    case MODAL_ACTION_TYPE.CLOSE_MODAL:
      return { ...state, isModalOpen: false };
    case MODAL_ACTION_TYPE.OPEN_AUTHENTICATION_MODAL:
      return { ...state, isAuthenticationModalOpen: true };
    case MODAL_ACTION_TYPE.CLOSE_AUTHENTICATION_MODAL:
      return { ...state, isAuthenticationModalOpen: false };
    case MODAL_ACTION_TYPE.OPEN_SETTINGS_MODAL:
      return { ...state, isSettingsModalOpen: true };
    case MODAL_ACTION_TYPE.CLOSE_SETTINGS_MODAL:
      return { ...state, isSettingsModalOpen: false };
    case MODAL_ACTION_TYPE.OPEN_PROMPT_MODAL:
      return {
        ...state,
        isPromptModalOpen: { conditional: true, prompt: action.payload.id },
      };
    case MODAL_ACTION_TYPE.CLOSE_PROMPT_MODAL:
      return {
        ...state,
        isPromptModalOpen: { conditional: false, prompt: undefined },
      };
    default:
      throw new Error(`No matching ${action.type} - action type.`);
  }
};
