import React, { useEffect, useState, useContext } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { todayDate } from "../../config/date";
import { types } from "../../config/options";

import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

import UserContext from "../../components/userContext";

const Record = props => {
  const userContext = useContext(UserContext);
  const { jsonFile, spreadsheetId, name } = userContext.user;

  const defaultValues = {
    date: todayDate(),
    amount: "",
    type: types[0],
    detail: ""
  };

  const [docInfo, setDocInfo] = useState(null);
  const [rows, setRows] = useState(null);

  const [values, setValues] = React.useState(defaultValues);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const createDoc = async () => {
    try{
    const doc = new GoogleSpreadsheet(spreadsheetId);
    await doc.useServiceAccountAuth(jsonFile);
    await doc.loadInfo();

    // Set docInfo
    setDocInfo(doc);
    } catch (e){
      alert(`Hubo un error en la autenticación: ${e.message}`)
      userContext.newUser(null);
    }
  };

  const updateRows = async docInfo => {
    const sheet = docInfo.sheetsByIndex[0];
    const fetchedRows = await sheet.getRows();
    setRows(fetchedRows);
    fetchedRows[0].Date = "sergey@abc.xyz"; // update a value
    await fetchedRows[0].save(); // save updates
  };

  const addRow = async (date, who, amount, type, detail) => {
    const sheet = docInfo.sheetsByIndex[0];
    await sheet.addRow({
      Date: date,
      Who: who,
      Amount: `$${amount}`,
      Type: type,
      Detail: detail
    });
  };

  useEffect(() => {
    createDoc();
  }, []);

  if (userContext === null) {
    return <p>Error</p>;
  }

  const handleAddRow = () => {
    const { date, amount, type, detail } = values;
    addRow(date, name, amount, type, detail);
    alert("Agregado!");
    setValues(defaultValues);
  };

  return (
    <div className="formContainer">
      <FormControl>
        <TextField
          className="input"
          label="Fecha"
          type="date"
          value={values.date}
          onChange={handleChange("date")}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          className="input"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
          value={values.amount}
          id="standard-basic"
          label="Precio"
          type="number"
          onChange={handleChange("amount")}
        />
      </FormControl>
      <FormControl>
        <Select
          className="input"
          label="Tipo"
          labelId="demo-simple-select-label"
          value={values.type}
          onChange={handleChange("type")}
        >
          {types.map(e => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          className="input"
          label="Descripción"
          multiline
          rows="4"
          value={values.detail}
          defaultValue={values.detail}
          onChange={handleChange("detail")}
        />
      </FormControl>

      <FormControl>
        {docInfo && (
          <Button
            className="input"
            variant="contained"
            color="primary"
            onClick={handleAddRow}
          >
            AGREGAR!
          </Button>
        )}
      </FormControl>
    </div>
  );
};

export default Record;
