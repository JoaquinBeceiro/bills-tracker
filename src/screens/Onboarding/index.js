import React, { useContext, useState, useCallback } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { NoHeaderLayout } from "layouts";
import { InputComponent, ButtonComponent } from "components";
import { useHistory } from "react-router-dom";
import { checkCredentials } from "services";
import * as S from "./styles";
import GoogleLogin from 'react-google-login';
import { sheetScope } from "config/sheet";
import { getUserSession } from "config/localStorage";
import { getAuthErrorMessage } from "config/errors";

const Onboarding = () => {

  const clientId = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;

  const history = useHistory();

  const context = useContext(GlobalContext);
  const [, userDispatch] = context.globalUser;
  const [, modalDispatch] = context.globalModal;

  const userFromStorage = getUserSession();

  const [values, setValues] = useState({
    name: userFromStorage?.name || "",
    spreadsheetId: userFromStorage?.spreadsheetId || "",
    access_token: userFromStorage?.access_token || "",
    expires_at: userFromStorage?.expires_at || "",
    refresh_token: userFromStorage?.refresh_token || "",
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

  const credentiaslCheck = useCallback(async (newValues) => {

    const { name, access_token, refresh_token, expires_at, spreadsheetId } = newValues;
    if (access_token && spreadsheetId) {

      userDispatch({ type: DispatchTypes.User.SET_USER_START });

      try {
        const valid = await checkCredentials(access_token, expires_at, refresh_token, spreadsheetId);
        if (valid) {
          const newUserContext = {
            spreadsheetId: spreadsheetId,
            name: name,
            access_token,
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
          userDispatch({ type: DispatchTypes.User.FINISH });
        }

      } catch (e) {
        alertModal(
          "Invalid credentials",
          "Please check your credentials and try again later."
        );
        userDispatch({ type: DispatchTypes.User.FINISH });
      }
    }


  }, [alertModal, history, userDispatch])


  const handleChange = (prop) => (name, value) => {
    setValues({ ...values, [prop]: value });
  };

  const responseGoogle = (response) => {
    console.log("::RESPONSE::", response)

    if (response.tokenObj) {
      const { access_token, expires_at } = response.tokenObj;
      const newCredentials = { ...values, access_token, expires_at };
      setValues(newCredentials);
      credentiaslCheck(newCredentials);
    }

    if (response.code) {
      const { code } = response;
      const newCredentials = { ...values, refresh_token: code };
      setValues(newCredentials);
      credentiaslCheck(newCredentials);
    }

    if (response.error) {
      const { error } = response;
      const errorMessage = getAuthErrorMessage(error); 
      alertModal(
        "Error",
        errorMessage
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
            uxMode="popup"
            accessType="offline"
            scope={sheetScope}
            disabled={buttonDisabled}
            className="googleButton"
          />
          <S.GoogleDisclaimer>
            Google will ask permissions to share your name, email address, languaje preference and profile picture with BillsTracker. We don’t save or track any information about you.
          </S.GoogleDisclaimer>
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