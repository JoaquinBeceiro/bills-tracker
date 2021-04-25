import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../config/userContext";
import { useHistory } from "react-router-dom";
// import Record from "../Record";
// import Data from "../Data";
// import { ShowTable } from "./styles";
import { ArrowIndicatorIcon } from "../../components";
import { HeaderLayout } from "../../layouts";
import { createDoc, getTypes, addRow } from "../../services";

const Main = (props) => {
  const [loading, setLoading] = useState(true);

  const userContext = useContext(UserContext);
  const history = useHistory();

  const onError = () => history.push("/onboarding");

  const { user, doc } = userContext;
  const setupDoc = async (user) => {
    const { jsonFile, spreadsheetId, name } = user;

    const newDoc = await createDoc(jsonFile, spreadsheetId, name, onError);
    // const newRow = await addRow(newDoc, "1", "2", "3", "5", "5");
    const types = await getTypes(newDoc);

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      setupDoc(user);
    } else {
      onError();
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
