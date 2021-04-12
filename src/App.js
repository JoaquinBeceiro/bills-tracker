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
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleOk = () => {
    setOpen(false);
    removeUser();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const userFromStorage = getUserSession();
    if (userFromStorage) {
      setUSer(getUserSession());
    }
    setLoading(false);
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
      {/* <div className="App">{loading ? <p>Loading...</p> : <Main />}</div> */}
      <Router />
    </UserContext.Provider>
  );
}

export default App;
