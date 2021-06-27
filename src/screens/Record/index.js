import React, { useEffect, useState, useContext } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { todayDate } from "config/date";
import { defaultTypes } from "config/options";

import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { UserContext } from "context";
import Dialog from "components/dialog";

const Record = (props) => {
  const userContext = useContext(UserContext);
  const { jsonFile, spreadsheetId, name } = userContext.user;

  const defaultValues = {
    date: todayDate(),
    amount: "",
    type: "",
    detail: "",
  };

  const [docInfo, setDocInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [types, setStypes] = useState(defaultTypes);

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOk = () => {
    setOpenDialog(false);
  };

  const [values, setValues] = React.useState(defaultValues);

  const handleChange = (prop) => (event) => {
    const newValue =
      event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);
    setValues({ ...values, [prop]: newValue });
  };

  const handleSelectChange = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      setValues({ ...values, type: newValue.inputValue });
      return;
    }
    setValues({ ...values, type: newValue });
  };

  const createDoc = async () => {
    try {
      const doc = new GoogleSpreadsheet(spreadsheetId);
      await doc.useServiceAccountAuth(jsonFile);
      await doc.loadInfo();

      // Set docInfo and get types
      await setDocInfo(doc);
    } catch (e) {
      alert(`Hubo un error en la autenticación: ${e.message}`);
      userContext.newUser(null);
    }
  };

  const getTypes = async () => {
    const sheet = docInfo.sheetsByIndex[0];
    const fetchedRows = await sheet.getRows();

    const newTypes = fetchedRows.map((e) => e.Type);
    const combinedTypes = Array.from(new Set(newTypes.concat(types)));
    setStypes(combinedTypes);
    setLoading(false);
  };

  const addRow = async (date, who, amount, type, detail) => {
    const sheet = docInfo.sheetsByIndex[0];
    return await sheet.addRow({
      Date: date,
      Who: who,
      Amount: `$${amount}`,
      Type: type,
      Detail: detail,
    });
  };

  useEffect(() => {
    createDoc();
  }, []);

  useEffect(() => {
    docInfo && getTypes();
  }, [docInfo]);

  if (userContext === null) {
    return <p>Error</p>;
  }

  const handleAddRow = async () => {
    const { date, amount, type, detail } = values;

    if (amount && type) {
      setLoading(true);
      await addRow(date, name, amount, type, detail);
      alert("Agregado!");
      setValues(defaultValues);
      getTypes();
      setLoading(true);
    } else {
      setOpenDialog(true);
    }
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
            shrink: true,
          }}
        />
      </FormControl>
      <FormControl>
        <TextField
          className="input"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          value={values.amount}
          id="standard-basic"
          label="Precio"
          type="number"
          onChange={handleChange("amount")}
        />
      </FormControl>
      <FormControl>
        <Autocomplete
          value={values.type}
          options={types}
          onChange={handleSelectChange}
          style={{ width: 300, border: "none" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tipo"
              margin="normal"
              onChange={handleChange("type")}
            />
          )}
          renderOption={(option) => option}
        />
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
            disabled={loading}
          >
            AGREGAR!
          </Button>
        )}
      </FormControl>

      <Dialog
        open={openDialog}
        handleOk={handleOk}
        title="Atención"
        description="Los campos 'Precio' y 'Tipo' son requeridos!"
      />
    </div>
  );
};

export default Record;
