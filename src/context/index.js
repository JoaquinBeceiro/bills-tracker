import React, { useReducer, createContext } from "react";
import UserReducer, { userInitialState } from "./reducers/User";
import ModalReducer, { modalInitialState } from "./reducers/Modal";
import Types from "./types";

export const GlobalContext = createContext();

export const DispatchTypes = Types;

const AppContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, userInitialState);
  const [modalState, modalDispatch] = useReducer(
    ModalReducer,
    modalInitialState
  );

  const values = {
    globalUser: [userState, userDispatch],
    globalModal: [modalState, modalDispatch],
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default AppContextProvider;
