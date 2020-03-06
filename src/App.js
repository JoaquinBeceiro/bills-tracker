import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./screens/Main";
import {
  getUserSession,
  setUserSession,
  deleteUserSession
} from "./config/localStorage";

import Dialog from "./components/dialog";
import UserContext from "./components/userContext";

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

  const newUser = user => {
    setUSer(user);
    setUserSession(user);
  };

  const removeUser = () => {
    setUSer(null);
    deleteUserSession();
  };

  return (
    <UserContext.Provider value={{ user, newUser }}>
      <Dialog
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancel}
        title="Cerrar sesión"
        description="Realmente desea cerrar la sesión actual?"
      />
      {user && (
        <div className="exitButton" onClick={() => setOpen(true)}>
          X
        </div>
      )}
      <div className="App">{loading ? <p>Loading...</p> : <Main />}</div>
    </UserContext.Provider>
  );
}

export default App;
