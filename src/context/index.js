import React, { useReducer, createContext } from "react";
import UserReducer, { userInitialState } from "./reducers/User";
import ModalReducer, { modalInitialState } from "./reducers/Modal";
import Types from "./types";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "config/firebase";

export const GlobalContext = createContext();

export const DispatchTypes = Types;

const AppContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, userInitialState);
  const [modalState, modalDispatch] = useReducer(
    ModalReducer,
    modalInitialState
  );

  const getApp = () => {
    if (userState.app) {
      return userState.app;
    } else {
      const app = initializeApp(firebaseConfig);
      userDispatch({
        type: DispatchTypes.User.SET_APP,
        app,
      });
      return app;
    }
  };

  const values = {
    globalUser: [userState, userDispatch],
    globalModal: [modalState, modalDispatch],
    getApp: getApp(),
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default AppContextProvider;
