import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as S from "./styles";
import Utils from "lib/utils";

const { formatMoney } = Utils.Currency;

const CustomTooltip = (props) => {
  const amount = props?.payload[0]?.value || 0;
  return <S.Tooltip>{`$${formatMoney(amount)}`}</S.Tooltip>;
};

const BarChartComponent = ({ data, isLoading }) => {
  const chartHeight = 285;

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart width={150} height={40} data={data}>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tick={{ fontFamily: "Roboto", fontSize: 11, fill: "#7E7E7E" }}
        />
        <Tooltip
          offset={-25}
          content={CustomTooltip}
          allowEscapeViewBox={{ x: true, y: true }}
          position={{ y: 10 }}
        />
        <Bar dataKey="amount" fill="#5455FF" barSize={7} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
