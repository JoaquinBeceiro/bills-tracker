import React, { useContext, useState, useCallback, useEffect } from "react";
import { GlobalContext, DispatchTypes } from "context";
import { NoHeaderLayout } from "layouts";
import { InputComponent, ButtonComponent, LoadingComponent } from "components";
import { useHistory } from "react-router-dom";
import { checkCredentials } from "services";
import * as S from "./styles";
import { sheetScope } from "config/sheet";
import { getUserSession } from "config/localStorage";
import { getAuthErrorMessage } from "config/errors";
import Utils from "lib/utils";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import GoogleButton from "react-google-button";

const Onboarding = () => {
  const history = useHistory();

  const context = useContext(GlobalContext);
  const [, userDispatch] = context.globalUser;
  const [, modalDispatch] = context.globalModal;

  const app = context.getApp;
  const auth = getAuth();

  const userFromStorage = getUserSession();

  const [customLoading, setCustomLoading] = useState(false);

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

  const credentiaslCheck = useCallback(
    async (newValues) => {
      const { name, access_token, refresh_token, expires_at, spreadsheetId } =
        newValues;

      if (spreadsheetId) {
        const normalizedId = Utils.Common.getSpreadsheetId(spreadsheetId);

        userDispatch({ type: DispatchTypes.User.SET_USER_START });

        try {
          const valid = await checkCredentials({
            access_token,
            expires_at,
            refresh_token,
            spreadsheetId: normalizedId,
          });
          if (valid) {
            const newUserContext = {
              spreadsheetId: normalizedId,
              name: name,
              access_token,
              expires_at,
              refresh_token,
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
    },
    [alertModal, history, userDispatch]
  );

  const handleChange = (prop) => (name, value) => {
    setValues({ ...values, [prop]: value });
  };

  const checkCredentialsOnLoad = useCallback(
    async (user) => {
      const { access_token, refresh_token, expires_at, spreadsheetId } = user;

      if (spreadsheetId) {
        const normalizedId = Utils.Common.getSpreadsheetId(spreadsheetId);

        try {
          const valid = await checkCredentials({
            access_token,
            expires_at,
            refresh_token,
            spreadsheetId: normalizedId,
          });
          if (valid) {
            history.push("/home");
          }
        } catch (e) {}
      }
    },
    [history]
  );

  useEffect(() => {
    if (userFromStorage) {
      checkCredentialsOnLoad(userFromStorage);
    }
  }, [checkCredentialsOnLoad, userFromStorage]);

  const handleGoogleLogin = () => {
    setCustomLoading(true);

    const provider = new GoogleAuthProvider();
    provider.addScope(sheetScope);

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithPopup(auth, provider)
          .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const { accessToken, idToken } = credential;
            const newCredentials = {
              ...values,
              access_token: accessToken,
              refresh_token: idToken,
            };
            setValues(newCredentials);
            await credentiaslCheck(newCredentials);
            setCustomLoading(false);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = getAuthErrorMessage(errorCode);
            alertModal("Error", errorMessage);
            setCustomLoading(false);
          });
      })
      .catch((error) => {
        console.log("ERROR", error);
        const errorCode = error.code;
        const errorMessage = getAuthErrorMessage(errorCode);
        alertModal("Error", errorMessage);
      });
  };

  const buttonDisabled =
    values.name === "" || values.spreadsheetId === "" || app === undefined;

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
            title="Spreadsheet ID or URL"
            placeholder="Spreadheet ID or URL"
            type="bigtext"
            value={values.spreadsheetId || ""}
            onChange={handleChange("spreadsheetId")}
          />
          <GoogleButton
            disabled={buttonDisabled}
            type="light" // can be light or dark
            onClick={handleGoogleLogin}
            className={`googleButton ${buttonDisabled ? "buttonDisabled" : ""}`}
            label="Login"
          />
          <S.GoogleDisclaimer>
            Google will ask permissions to share your name, email address,
            languaje preference and profile picture with BillsTracker. We don’t
            save or track any information about you.
          </S.GoogleDisclaimer>
        </div>
        <div>
          <p className="text-center mb-0 mt-4">Need help?</p>
          <ButtonComponent text="Setup guide" type="text" />
        </div>
      </S.Content>
      {customLoading && <LoadingComponent />}
    </NoHeaderLayout>
  );
};

export default Onboarding;
