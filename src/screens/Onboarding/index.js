import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../config/userContext";

import { NoHeaderLayout } from "../../layouts";
import { InputComponent, ButtonComponent } from "../../components";
import { useHistory } from "react-router-dom";

const Onboarding = (props) => {
  const userContext = useContext(UserContext);
  const history = useHistory();
  const { user, newUser } = userContext;

  const [values, setValues] = useState({
    name: "",
    spreadsheetId: "",
    jsonFile: "",
  });

  useEffect(() => {
    if (user) {
      const { name, spreadsheetId, jsonFile } = user;
      setValues({ name, spreadsheetId, jsonFile: JSON.stringify(jsonFile) });
    }
  }, [user]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleStart = () => {
    const newUserContext = {
      spreadsheetId: values.spreadsheetId,
      name: values.name,
      jsonFile: JSON.parse(values.jsonFile),
    };
    newUser(newUserContext);
    history.push("/home");
  };

  return (
    <NoHeaderLayout>
      <div>
        <InputComponent
          name="name"
          title="Name"
          placeholder="Name"
          type="text"
          value={values.name || ""}
          onChange={handleChange("name")}
        />
        <InputComponent
          name="sId"
          title="Spreadsheet ID"
          placeholder="Spreadheet ID"
          type="bigtext"
          value={values.spreadsheetId || ""}
          onChange={handleChange("spreadsheetId")}
        />
        <InputComponent
          name="json"
          title="JSON"
          placeholder="JSON File"
          type="textarea"
          value={values.jsonFile || ""}
          onChange={handleChange("jsonFile")}
        />
        <ButtonComponent text="Start" action={handleStart} />
      </div>
      <div>
        <p className="text-center mb-0 mt-4">Need help?</p>
        <ButtonComponent text="Setup guide" type="text" />
      </div>
    </NoHeaderLayout>
  );
};

export default Onboarding;
