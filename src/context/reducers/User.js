import { DispatchTypes } from "../";

const internalUserInitialState = {
  error: null,
  user: null,
  loading: false,
  doc: null,
  app: null,
};

export const userInitialState = { ...internalUserInitialState };

const UserReducer = (currentState, action) => {
  switch (action.type) {
    case DispatchTypes.User.SET_USER_START:
      currentState.loading = true;
      return { ...currentState };
    case DispatchTypes.User.SET_USER_SUCCESS:
      currentState.user = action.user;
      currentState.loading = false;
      return { ...currentState };
    case DispatchTypes.User.SET_USER_FINISH:
      currentState.loading = false;
      return { ...currentState };
    case DispatchTypes.User.GET_DOC_START:
      currentState.loading = true;
      return { ...currentState };
    case DispatchTypes.User.GET_DOC_SUCCESS:
      currentState.doc = action.doc;
      currentState.loading = false;
      return { ...currentState };
    case DispatchTypes.User.GET_DOC_ERROR:
      currentState.error = action.error;
      currentState.loading = false;
      return { ...currentState };
    case DispatchTypes.User.SET_APP:
      currentState.loading = false;
      currentState.app = action.app;
      return { ...currentState };
    case DispatchTypes.Global.RESET:
      currentState = {
        error: null,
        user: null,
        loading: false,
        doc: null,
      };
      return { ...currentState };
    default:
      return currentState;
  }
};

export default UserReducer;
