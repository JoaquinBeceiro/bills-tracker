import React, { useContext, useState, useEffect, useCallback } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { NoHeaderLayout } from "layouts";
import { InputComponent, ButtonComponent } from "components";
import { useHistory } from "react-router-dom";
import { checkCredentials } from "services";
import * as S from "./styles";
import Utils from "lib/utils";

import GoogleLogin from 'react-google-login';
import { GoogleSpreadsheet } from "google-spreadsheet";


const Onboarding = () => {

  const history = useHistory();

  const context = useContext(GlobalContext);
  const [userState, userDispatch] = context.globalUser;
  const [, modalDispatch] = context.globalModal;

  const [values, setValues] = useState({
    name: "",
    spreadsheetId: "",
    access_token: "",
    expires_at: "",
    refresh_token: "",
  });

  const alertModal = useCallback(
    (title, content) => {
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
    },
    [modalDispatch]
  );

  useEffect(() => {
    const { user } = userState;
    if (user?.name && user?.spreadsheetId && user?.jsonFile) {
      const { name, spreadsheetId, jsonFile } = user;
      setValues({ name, spreadsheetId, jsonFile: JSON.stringify(jsonFile) });
      const checkUser = async (jsonFile, spreadsheetId) => {
        const valid = await checkCredentials(jsonFile, spreadsheetId);
        if (valid) {
          // history.push("/home");
        } else {
          alertModal(
            "Invalid credentials",
            "Please check your credentials and try again."
          );
        }
      };

      checkUser(jsonFile, spreadsheetId);
    }
  }, [userState, history, alertModal]);

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

  const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

  const responseGoogle = (response) => {
    userDispatch({ type: DispatchTypes.User.SET_USER_START });


    if (response.tokenObj) {
      const { access_token, expires_at } = response.tokenObj;
      const newCredentials = { ...values, access_token, expires_at };

      setValues(newCredentials);
    }

    if (response.code) {
      const { code } = response;
      const newCredentials = { ...values, refresh_token: code };

      setValues(newCredentials);
    }

  }

  useEffect(
    () => {

      const { access_token, expires_at, refresh_token } = values;

      if (access_token && expires_at && refresh_token) {
        credentiaslCheck();
      }


    },
    [values]
  )

  const credentiaslCheck = async () => {

    const { name, access_token, refresh_token, expires_at, spreadsheetId } = values

    try {

      const valid = await checkCredentials(access_token, refresh_token, expires_at, spreadsheetId);
      if (valid) {
        const newUserContext = {
          spreadsheetId: spreadsheetId,
          name: name,
          access_token,
          refresh_token,
          expires_at
        };

        userDispatch({
          type: DispatchTypes.User.SET_USER_SUCCESS,
          user: newUserContext,
        });
        history.push("/home");

      } else {
        alertModal(
          "Invalid credentials",
          "Please check your credentials and try again later."
        );
      }

    } catch (e) {
      alertModal(
        "Invalid credentials",
        "Please check your credentials and try again later."
      );
    }

  }

  const buttonDisabled =
    values.name === "" ||
    values.spreadsheetId === "";

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
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            uxMode="redirect"
            accessType="offline"
            responseType="code"
            scope="profile email https://www.googleapis.com/auth/spreadsheets"
            disabled={buttonDisabled}
          />
          {/* <ButtonComponent text="Start" action={handleStart} /> */}
        </div>
        <div>
          {/* <p className="text-center mb-0 mt-4">Need help?</p> */}
          {/* <ButtonComponent text="Setup guide" type="text" /> */}
        </div>
      </S.Content>
    </NoHeaderLayout>
  );

};

export default Onboarding;