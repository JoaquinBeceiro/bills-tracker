import React, { useContext, useEffect } from "react";
import UserContext from "../../config/userContext";
// import Record from "../Record";
// import Data from "../Data";
// import { ShowTable } from "./styles";
import { ArrowIndicatorIcon } from "../../components";
import { HeaderLayout } from "../../layouts";
import { createDoc, getTypes, addRow } from "../../services";

const Main = (props) => {
  const userContext = useContext(UserContext);

  const { user, doc } = userContext;

  const setupDoc = async (user) => {
    const { jsonFile, spreadsheetId, name } = user;

    const newDoc = await createDoc(jsonFile, spreadsheetId, name);
    // const newRow = await addRow(newDoc, "1", "2", "3", "5", "5");
    const types = await getTypes(newDoc);
  };

  useEffect(() => {
    if (user) {
      setupDoc(user);
    }
  }, [user]);

  const headerBoxProps = {
    primaryValue: "$43.776",
    secondaryValue: "$450 this month",
    icon: <ArrowIndicatorIcon up={true} />,
  };

  return <HeaderLayout headerBox={headerBoxProps}>test</HeaderLayout>;
};

export default Main;
