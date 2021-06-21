import { DispatchTypes } from "../";

export const modalInitialState = {
  show: false,
  title: "",
  content: "",
  actions: [],
};

const ModalReducer = (currentState, action) => {
  switch (action.type) {
    case DispatchTypes.Modal.MODAL_SHOW:
      currentState.show = true;
      currentState.title = action.title;
      currentState.content = action.content;
      currentState.actions = action.actions;
      return { ...currentState };
    case DispatchTypes.Modal.MODAL_HIDE:
      currentState.show = false;
      return { ...currentState };
    case DispatchTypes.Modal.MODAL_RESET:
      return modalInitialState;
    default:
      return currentState;
  }
};

export default ModalReducer;
