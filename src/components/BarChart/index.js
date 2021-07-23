import React, { useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as S from "./styles";

const customElement = (props) => {
  const amount = props?.payload[0]?.value || 0;

  return <S.Tooltip>{amount}</S.Tooltip>;
};

const BarChartComponent = ({ data, isLoading }) => {
  const chartHeight = 285;

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart width={150} height={40} data={data}>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis dataKey="name" />
        <Tooltip
          offset={-25}
          content={customElement}
          allowEscapeViewBox={{ x: true, y: true }}
          position={{ y: 10 }}
        />
        <Bar dataKey="amount" fill="#5455FF" barSize={7} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
