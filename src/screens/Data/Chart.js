import React, { useEffect, useState, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { scaleBand } from "@devexpress/dx-chart-core";
import { ArgumentScale, Stack, Animation } from "@devexpress/dx-react-chart";

const cleanAmmount = (amount) => amount.replace(/[$,.]/g, "");

const formatData = (data) => {
  const result = [];
  const formattedData = [...data].reduce((result, currentValue) => {
    (result[currentValue["Date"].substring(3, 10)] =
      result[currentValue["Date"].substring(3, 10)] || []).push({
      Amount: cleanAmmount(currentValue.Amount),
      Date: currentValue.Date,
      Detail: currentValue.Detail,
      Type: currentValue.Type,
      Who: currentValue.Who,
    });
    return result;
  }, []);

  const keysForClean = [
    "get Amount",
    "set Amount",
    "get Date",
    "set Date",
    "get Detail",
    "set Detail",
    "get Type",
    "set Type",
    "get Who",
    "set Who",
    "_rawData",
    "_rowNumber",
    "_sheet",
  ];

  const avoidKeys = ["Amount", "Date", "Detail", "Type", "Who"];

  keysForClean.forEach((item) => {
    delete formattedData[item];
  });

  Object.keys(formattedData).map((date) => {
    if (!avoidKeys.includes(date)) {
      result.push({
        date: date,
        amount: formattedData[date]
          .map(({ Amount }) => parseInt(Amount))
          .reduce((a, b) => a + b, 0),
      });
    }
  });

  return result;
};

const ChartComponent = (props) => {
  const { data } = props;

  const chartData = formatData(data);

  return (
    <Paper>
      <Chart data={chartData} rotated>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis indentFromAxis={50} showTicks={true} tickSize={10} />
        <ValueAxis showTicks={true} showLine={true} />
        <BarSeries valueField="amount" argumentField="date" name="Amount" />
        <Title text="Bills / month" />
        <Animation />
        <Stack />
      </Chart>
    </Paper>
  );
};

export default ChartComponent;
