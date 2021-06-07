import React, { useEffect, useState } from "react";
import {
  getUserSession,
  setUserSession,
  deleteUserSession,
} from "config/localStorage";
import Router from "router";
import UserContext from "config/userContext";
import { useHistory } from "react-router-dom";
import { createDoc } from "services";

function App() {
  const history = useHistory();

  const [user, setUSer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState(null);

  const onError = () => {
    history.push("/onboarding");
  };

  const getDoc = async (jsonFile, spreadsheetId, name) => {
    try {
      const newDoc = await createDoc(jsonFile, spreadsheetId, name, onError);
      setDoc(newDoc);
    } catch (error) {
      onError();
    }
  };

  useEffect(() => {
    const userFromStorage = getUserSession();
    if (userFromStorage) {
      setUSer(getUserSession());
    }
  }, []);

  useEffect(() => {
    if (user) {
      const { jsonFile, spreadsheetId, name } = user;
      getDoc(jsonFile, spreadsheetId, name);
    }
  }, [user]);

  useEffect(() => {
    if (doc) {
      setLoading(false);
    }
  }, [doc]);

  const newUser = (user) => {
    setUSer(user);
    setUserSession(user);
  };

  const removeUser = () => {
    setUSer(null);
    deleteUserSession();
  };

  return (
    <UserContext.Provider value={{ user, doc, newUser, loading }}>
      <Router />
    </UserContext.Provider>
  );
}

export default App;
