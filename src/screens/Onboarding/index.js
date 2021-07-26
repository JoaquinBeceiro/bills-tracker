import React, { useContext, useState, useEffect } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { NoHeaderLayout } from "layouts";
import { InputComponent, ButtonComponent } from "components";
import { useHistory } from "react-router-dom";
import { checkCredentials } from "services";
import * as S from "./styles";
import Utils from "lib/utils";

const Onboarding = () => {
  const history = useHistory();

  const context = useContext(GlobalContext);
  const [userState, userDispatch] = context.globalUser;
  const [, modalDispatch] = context.globalModal;

  const [values, setValues] = useState({
    name: "",
    spreadsheetId: "",
    jsonFile: "",
  });

  const alertModal = (title, content) => {
    modalDispatch({
      type: DispatchTypes.Modal.MODAL_SHOW,
      title,
      content,
      actions: [
        {
          text: "Ok",
          action: () => {
            modalDispatch({ type: DispatchTypes.Modal.MODAL_HIDE });
          },
        },
      ],
    });
  };

  useEffect(() => {
    const { user } = userState;
    if (user?.name && user?.spreadsheetId && user?.jsonFile) {
      const { name, spreadsheetId, jsonFile } = user;
      setValues({ name, spreadsheetId, jsonFile: JSON.stringify(jsonFile) });
      const checkUser = async (jsonFile, spreadsheetId) => {
        const valid = await checkCredentials(jsonFile, spreadsheetId);
        if (valid) {
          history.push("/home");
        } else {
          alertModal(
            "Invalid credentials",
            "Please check your credentials and try again."
          );
        }
      };

      checkUser(jsonFile, spreadsheetId);
    }
  }, [userState, history]);

  const handleChange = (prop) => (name, value) => {
    setValues({ ...values, [prop]: value });
  };

  const handleStart = () => {
    if (
      values.name === "" ||
      values.spreadsheetId === "" ||
      values.jsonFile === ""
    ) {
      alertModal(
        "All fields are required",
        "You need to fill all fields to continue."
      );
    } else {
      const isJson = Utils.Common.isJsonString(values.jsonFile);

      if (!isJson) {
        alertModal(
          "Invalid JSON format",
          "JSON field must be a valid JSON file."
        );
      } else {
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
      }
    }
  };

  return (
    <NoHeaderLayout>
      <S.Content>
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
            required
          />
          <ButtonComponent text="Start" action={handleStart} />
        </div>
        <div>
          <p className="text-center mb-0 mt-4">Need help?</p>
          <ButtonComponent text="Setup guide" type="text" />
        </div>
      </S.Content>
    </NoHeaderLayout>
  );
};

export default Onboarding;
