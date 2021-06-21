export const modalInitialState = {
  show: false,
  title: "Test",
  content: "Test content",
  actions: [],
};

const ModalReducer = async (currentState, action) => {
  switch (action.type) {
    case "SHOW":
      currentState.show = true;
      currentState.title = action.title;
      currentState.content = action.content;
      currentState.actions = action.actions;
      return { ...currentState };
    case "HIDE":
      currentState.show = false;
      return { ...currentState };
    case "RESET":
      return modalInitialState;
    default:
      return currentState;
  }
};

export default ModalReducer;
