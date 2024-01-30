import { DispatchTypes } from "../";

export const searchInitialState = {
  show: false,
  input: "",
};

const SearchReducer = (currentState, action) => {
  switch (action.type) {
    case DispatchTypes.Search.SEARCH_INPUT:
      currentState.input = action.input;
      return { ...currentState };
    case DispatchTypes.Search.SEARCH_SHOW:
      currentState.show = true;
      return { ...currentState };
    case DispatchTypes.Search.SEARCH_HIDE:
      currentState.show = false;
      return { ...currentState };
    case DispatchTypes.Search.SEARCH_RESET:
      return searchInitialState;
    default:
      return currentState;
  }
};

export default SearchReducer;
