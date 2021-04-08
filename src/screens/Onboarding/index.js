import React, { useContext } from "react";

import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import UserContext from "../../config/userContext";

const Onboarding = props => {
  const userContext = useContext(UserContext);

  const { newUser } = userContext;

  const [values, setValues] = React.useState({
    name: "",
    spreadsheetId: "",
    jsonFile: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="formContainer">
      <FormControl>
        <TextField
          className="input"
          label="Nombre"
          value={values.name}
          onChange={handleChange("name")}
        />
      </FormControl>
      <FormControl>
        <TextField
          className="input"
          label="Spreadsheet ID"
          value={values.spreadsheetId}
          onChange={handleChange("spreadsheetId")}
        />
      </FormControl>
      <FormControl>
        <TextField
          className="input"
          label="JSON file"
          multiline
          rows="10"
          value={values.jsonFile}
          onChange={handleChange("jsonFile")}
        />
      </FormControl>
      <FormControl>
        <Button
          className="input"
          variant="contained"
          color="primary"
          onClick={() => {
            const newUserContext = {
              spreadsheetId: values.spreadsheetId,
              name: values.name,
              jsonFile: JSON.parse(values.jsonFile)
            };
            newUser(newUserContext);
          }}
        >
          GUARDAR
        </Button>
      </FormControl>
    </div>
  );
};

export default Onboarding;
