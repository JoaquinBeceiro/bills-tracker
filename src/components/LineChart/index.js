import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import * as S from "./styles";
import Utils from "lib/utils";

const { formatMoney } = Utils.Currency;

const CustomTooltip = (props) => {
  const categories = props?.categories?.map(({ key }) => key);
  const data = { ...props?.payload[0]?.payload };
  const name = props?.payload[0]?.payload?.name || "";
  if (data) {
    return (
      <S.Tooltip>
        <p>Month {name}</p>
        <ul>
          {Object.keys(data)
            .sort((a, b) => (data[a] > data[b] ? -1 : 1))
            .filter((e) => categories.includes(e))
            .map((e, index) => (
              <li key={`${index}-${e}`}>
                <span>{e}</span>
                <span>{`$${formatMoney(data[e] || 0)}`}</span>
              </li>
            ))}
        </ul>
      </S.Tooltip>
    );
  } else {
    return <></>;
  }
};

const LineChartComponent = ({ data, isLoading, categories }) => {
  const chartHeight = 210;

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      {isLoading ? (
        <S.LoadingContainer>Loading...</S.LoadingContainer>
      ) : (
        <LineChart width={150} height={40} data={data}>
          <CartesianGrid strokeDasharray="2 2" vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={{ fontFamily: "Roboto", fontSize: 11, fill: "#7E7E7E" }}
            type="category"
            includeHidden
            minTickGap={1}
            tickSize={1}
            tickCount={12}
            interval={0}
          />

          <Tooltip
            offset={-25}
            content={CustomTooltip}
            categories={categories}
            wrapperStyle={{ zIndex: 1000 }}
          />
          {categories.map(({ key, color }) => (
            <Line key={key} type="monotone" dataKey={key} stroke={color} />
          ))}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
