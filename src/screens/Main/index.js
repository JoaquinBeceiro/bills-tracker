import React, { useContext, useState } from "react";
import Record from "../Record";
import Onboarding from "../Onboarding";
import Data from "../Data";
import UserContext from "../../components/userContext";
import { ShowTable } from "./styles";

const Main = (props) => {
  const userContext = useContext(UserContext);

  const { user } = userContext;

  const [showData, setShowData] = useState(false);

  return (
    <div className="container">
      <div>
        <h1>Add bills</h1>
        {user ? (
          <>
            <h5>{user && user.name}</h5>
            <Record />
            {showData ? (
              <Data closeAction={() => setShowData(false)} />
            ) : (
              <ShowTable onClick={() => setShowData(true)}>Show data</ShowTable>
            )}
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
