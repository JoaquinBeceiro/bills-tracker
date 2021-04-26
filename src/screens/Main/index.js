import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../config/userContext";
import { useHistory } from "react-router-dom";
import { ArrowIndicatorIcon, LoadingComponent } from "../../components";
import { HeaderLayout } from "../../layouts";
import { createDoc, getTypes, addRow } from "../../services";

const Main = (props) => {
  const [mainLoading, setMainLoading] = useState(true);

  const userContext = useContext(UserContext);
  const history = useHistory();

  const onError = () => {
    history.push("/onboarding");
  };

  const { user, doc, loading } = userContext;
  const setupDoc = async (user) => {
    const { jsonFile, spreadsheetId, name } = user;

    const newDoc = await createDoc(jsonFile, spreadsheetId, name, onError);
    // const newRow = await addRow(newDoc, "1", "2", "3", "5", "5");
    const types = await getTypes(newDoc);

    console.log("=====================");
    console.log("!!! types", types);
    console.log("=====================");

    setMainLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      if (user) {
        setupDoc(user);
      } else {
        onError();
      }
    }
  }, [user, loading]);

  const headerBoxProps = {
    primaryValue: "$43.776",
    secondaryValue: "$450 this month",
    icon: <ArrowIndicatorIcon up={true} />,
  };

  return (
    <>
      <HeaderLayout headerBox={headerBoxProps}>test</HeaderLayout>
      {mainLoading && <LoadingComponent />}
    </>
  );
};

export default Main;
