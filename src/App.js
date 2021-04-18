import React, { useEffect, useState } from "react";
import {
  getUserSession,
  setUserSession,
  deleteUserSession,
} from "./config/localStorage";
import Router from "./router";
import UserContext from "./config/userContext";

function App() {
  const [user, setUSer] = useState(null);

  useEffect(() => {
    const userFromStorage = getUserSession();
    if (userFromStorage) {
      setUSer(getUserSession());
    }
  }, []);

  const newUser = (user) => {
    setUSer(user);
    setUserSession(user);
  };

  const removeUser = () => {
    setUSer(null);
    deleteUserSession();
  };

  return (
    <UserContext.Provider value={{ user, newUser }}>
      <Router />
    </UserContext.Provider>
  );
}

export default App;
