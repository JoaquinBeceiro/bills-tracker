import React, { useContext } from "react";
import UserContext from "../../config/userContext";

import { NoHeaderLayout } from "../../layouts";
import { InputComponent } from "../../components";

const Onboarding = (props) => {
  const userContext = useContext(UserContext);

  const { newUser } = userContext;

  const [values, setValues] = React.useState({
    name: "",
    spreadsheetId: "",
    jsonFile: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <NoHeaderLayout>
      <InputComponent name="name" title="Name" placeholder="Name" type="text" />
      <InputComponent
        name="sId"
        title="Spreadsheet ID"
        placeholder="Spreadheet ID"
        type="bigtext"
      />
      <InputComponent
        name="json"
        title="JSON"
        placeholder="JSON File"
        type="textarea"
      />
    </NoHeaderLayout>
  );
};

export default Onboarding;
