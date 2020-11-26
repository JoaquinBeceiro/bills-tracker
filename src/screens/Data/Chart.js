import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";

import {
  Animation,
  EventTracker,
  ValueScale,
} from "@devexpress/dx-react-chart";

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

const LabelResumed = (props) => (
  <ValueAxis.Label
    {...props}
    text={`${props.text.split(",")[0]}k`}
  ></ValueAxis.Label>
);

const ChartComponent = (props) => {
  const { data } = props;

  const chartData = formatData(data);

  return (
    <Paper>
      <Chart data={chartData} rotated>
        <ArgumentAxis />
        <ValueAxis labelComponent={LabelResumed} />
        <BarSeries valueField="amount" argumentField="date" name="Amount" />
        <Title text="Bills / month" />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
};

export default ChartComponent;
