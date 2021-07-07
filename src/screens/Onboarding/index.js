import React, { useContext, useState, useEffect } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { NoHeaderLayout } from "layouts";
import { InputComponent, ButtonComponent } from "components";
import { useHistory } from "react-router-dom";
import { checkCredentials } from "services";

const Onboarding = () => {
  const history = useHistory();

  const context = useContext(GlobalContext);
  const [userState, userDispatch] = context.globalUser;

  const [values, setValues] = useState({
    name: "",
    spreadsheetId: "",
    jsonFile: "",
  });

  useEffect(() => {
    const { user } = userState;
    if (user?.name && user?.spreadsheetId && user?.jsonFile) {
      const { name, spreadsheetId, jsonFile } = user;
      setValues({ name, spreadsheetId, jsonFile: JSON.stringify(jsonFile) });
      const checkUser = async (jsonFile, spreadsheetId) => {
        const valid = await checkCredentials(jsonFile, spreadsheetId);
        if (valid) {
          history.push("/home");
        }
      };

      checkUser(jsonFile, spreadsheetId);
    }
  }, [userState, history]);

  const handleChange = (prop) => (name, value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleStart = () => {
    userDispatch({ type: DispatchTypes.User.SET_USER_START });
    const newUserContext = {
      spreadsheetId: values.spreadsheetId,
      name: values.name,
      jsonFile: values.jsonFile && JSON.parse(values.jsonFile),
    };
    userDispatch({
      type: DispatchTypes.User.SET_USER_SUCCESS,
      user: newUserContext,
    });
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
