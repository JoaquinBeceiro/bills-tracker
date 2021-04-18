import React, { useContext, useEffect } from "react";
import Record from "../Record";
import Onboarding from "../Onboarding";
import Data from "../Data";
import UserContext from "../../config/userContext";
import { ShowTable } from "./styles";

import { createDoc, getTypes, addRow } from "../../services";

const Main = (props) => {
  const userContext = useContext(UserContext);

  const { user, doc } = userContext;

  const setupDoc = async () => {
    const { jsonFile, spreadsheetId, name } = user;

    const newDoc = await createDoc(jsonFile, spreadsheetId, name);
    // const newRow = await addRow(newDoc, "1", "2", "3", "5", "5");
    const types = await getTypes(newDoc);

  };

  useEffect(() => {
    setupDoc();
  }, []);

  return (
    <div className="container">

    </div>
  );
};

export default Main;
