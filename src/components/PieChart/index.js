import React, { useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

import Utils from "lib/utils";

const { RADIAN } = Utils.Constants;
const { formatMoney } = Utils.Currency;
const { monthToText } = Utils.Date;

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 6) * cos;
  const sy = cy + (outerRadius + 6) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 0}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        fontSize="11"
      >
        {`$${formatMoney(value)}`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey - 5}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        fontSize="11"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

const PieChartComponent = ({ data, total, month, year, isLoading }) => {
  const chartHeight = 285;

  const textMonth = monthToText(parseInt(month)).toLowerCase();

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <PieChart>
        <g>
          <text
            x="50%"
            y={20}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="light"
          >
            {data[activeIndex]?.name}
          </text>
          <text
            x="50%"
            y={chartHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="bold"
          >
            ${formatMoney(total)}
          </text>
          <text
            x="50%"
            y={chartHeight / 2 + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="light"
          >
            {`${textMonth} ${year}`}
          </text>
        </g>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={50}
          outerRadius={80}
          activeShape={renderActiveShape}
          activeIndex={activeIndex}
          onMouseEnter={onPieEnter}
          // label={renderCustomizedLabel}
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
