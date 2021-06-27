import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styled from "styled-components";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UserContext } from "context";
import { dateParser } from "config/date";

import Table from "./Table";
import Chart from "./Chart";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    fontSize: "10px",
    display: "flex",
    margin: 0,
    height: "100%",
    padding: 0,
    flexDirection: "column",
  },
}));

const AbsoluteContainer = styled.div`
  position: absolute;
  display: flex;
  background-color: #eee;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 10px;
  & .close {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #000;
    color: #fff;
    text-align: center;
    font-weight: bolder;
    padding: 5px;
    cursor: pointer;
    z-index: 100;
  }
`;

const Data = (props) => {
  // const { closeAction } = props;

  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState(null);

  // const userContext = useContext(UserContext);
  // const { jsonFile, spreadsheetId } = userContext.user;

  // const loadData = async () => {
  //   setLoading(true);
  //   try {
  //     const doc = new GoogleSpreadsheet(spreadsheetId);
  //     await doc.useServiceAccountAuth(jsonFile);
  //     await doc.loadInfo();

  //     const sheet = doc.sheetsByIndex[0];
  //     const fetchedRows = await sheet.getRows();
  //     const sortedRows = fetchedRows.sort(
  //       (a, b) => dateParser(b.Date) - dateParser(a.Date)
  //     );
  //     setData(sortedRows);
  //     setLoading(false);
  //   } catch (e) {
  //     alert(`Hubo un error en la autenticación: ${e.message}`);
  //     userContext.newUser(null);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const classes = useStyles();
  // const [value, setValue] = React.useState(0);

  // const handleClose = () => {
  //   closeAction();
  // };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <AbsoluteContainer>
      {/* <div className="close" onClick={handleClose}>
        CLOSE
      </div>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            
          >
            <Tab label="Table" {...a11yProps(0)} disabled={loading} />
            <Tab label="Chart" {...a11yProps(1)} disabled={loading} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Table loading={loading} data={data} closeAction={closeAction} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Chart loading={loading} data={data} />
        </TabPanel>
      </div> */}
    </AbsoluteContainer>
  );
};

export default Data;
