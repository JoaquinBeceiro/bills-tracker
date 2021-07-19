import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import Utils from "lib/utils";

const PieChartComponent = ({ data }) => {
  const { RADIAN } = Utils.Constants;

  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, name, index } =
      props;
    const radius = innerRadius + (outerRadius - innerRadius) * 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fill="#000"
          font-weight="bold"
          font-size="12"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={x}
          y={y + 13}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          fill="#000"
          font-weight="light"
          font-size="11"
        >
          {name}
        </text>
      </g>
    );
  };

  const chartHeight = 285;

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <PieChart>
        <g>
          <text
            x="50%"
            y={chartHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            font-size="16"
            font-weight="bold"
          >
            $48.240
          </text>
          <text
            x="50%"
            y={chartHeight / 2 + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            font-size="11"
            font-weight="light"
          >
            in april
          </text>
        </g>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={50}
          outerRadius={80}
          label={renderCustomizedLabel}
        >
          {data.map(({ color }, index) => (
            <Cell key={`cell-${index}`} fill={color} strokeWidth={1} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
