import React, { useContext, useState } from "react";
import Record from "../Record";
import Onboarding from "../Onboarding";
import Data from "../Data";
import UserContext from "../../components/userContext";
import styled from "styled-components";

const Main = (props) => {
  const userContext = useContext(UserContext);

  const { user } = userContext;

  const [showData, setShowData] = useState(false);

  const ShowTable = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: #000;
    color: #fff;
    text-align: center;
    font-weight: bolder;
    padding: 5px;
    cursor: pointer;
  `;

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
