import React, { useReducer, createContext } from "react";
import UserReducer, { userInitialState } from "./reducers/User";
import ModalReducer, { modalInitialState } from "./reducers/Modal";
import SearchReducer, { searchInitialState } from "./reducers/Search";
import Types from "./types";

export const GlobalContext = createContext();

export const DispatchTypes = Types;

const AppContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, userInitialState);
  const [modalState, modalDispatch] = useReducer(
    ModalReducer,
    modalInitialState
  );
  const [searchState, searchDispatch] = useReducer(
    SearchReducer,
    searchInitialState
  );

  const values = {
    globalUser: [userState, userDispatch],
    globalModal: [modalState, modalDispatch],
    globalSearch: [searchState, searchDispatch],
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default AppContextProvider;
