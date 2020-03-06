import React, { useContext } from "react";
import Record from "../Record";
import Onboarding from "../Onboarding";
import UserContext from "../../components/userContext";

const Main = props => {
  const userContext = useContext(UserContext);

  const { user } = userContext;

  return (
    <div className="container">
      <div>
        <h1>Add bills</h1>
        {user ? (
          <>
            <h5>{user && user.name}</h5>
            <Record />
          </>
        ) : (
          <>
            <h5>Registro</h5>
            <Onboarding />
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
