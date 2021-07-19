import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import * as S from "./styles";
import Utils from "lib/utils";

const ChartLegends = ({ title, value, count, color, total }) => {
  const { formatMoney } = Utils.Currency;

  const data = [
    { name: "Value", value, color },
    { name: "Total", value: total - value, color: "#C4C4C4" },
  ];

  const percent = Math.round((value * 100) / total);

  return (
    <S.Container>
      <S.ChartContainer>
        <ResponsiveContainer width="100%" height={50}>
          <PieChart width={20} height={20}>
            <svg
              x="40%"
              y={14}
              width="11"
              height="20"
              viewBox="0 0 11 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.98889 9.11719L3.86389 7.88281C3.38646 7.74219 3.05416 7.28516 3.05416 6.77734C3.05416 6.14062 3.55833 5.625 4.1809 5.625H6.71319C7.17916 5.625 7.6375 5.76953 8.01944 6.03516C8.25243 6.19531 8.56562 6.15625 8.76423 5.95703L10.0934 4.62891C10.3646 4.35938 10.3264 3.91016 10.0247 3.67188C9.08889 2.92188 7.92014 2.50391 6.72083 2.5V0.625C6.72083 0.28125 6.44583 0 6.10972 0H4.8875C4.55139 0 4.27639 0.28125 4.27639 0.625V2.5H4.1809C1.74791 2.5 -0.207641 4.63672 0.0177057 7.17188C0.178122 8.97266 1.52257 10.4375 3.2184 10.9453L7.13333 12.1172C7.61076 12.2617 7.94305 12.7148 7.94305 13.2227C7.94305 13.8594 7.43889 14.375 6.81632 14.375H4.28403C3.81805 14.375 3.35972 14.2305 2.97778 13.9648C2.74479 13.8047 2.43159 13.8438 2.23298 14.043L0.903817 15.3711C0.632636 15.6406 0.670831 16.0898 0.972567 16.3281C1.90833 17.0781 3.07708 17.4961 4.27639 17.5V19.375C4.27639 19.7188 4.55139 20 4.8875 20H6.10972C6.44583 20 6.72083 19.7188 6.72083 19.375V17.4922C8.50069 17.457 10.1698 16.375 10.758 14.6523C11.5792 12.2461 10.2003 9.77734 7.98889 9.11719Z"
                fill="#7E7E7E"
              />
            </svg>

            <Pie
              startAngle={90}
              endAngle={-270}
              data={data}
              innerRadius={17}
              outerRadius={20}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map(({ color }, index) => (
                <Cell key={`cell-${index}`} fill={color} strokeWidth={1} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </S.ChartContainer>
      <S.Content>
        <S.TitleContainer>
          <S.Title>{title}</S.Title>
          <S.SubTitle>{`${percent}% of budget`}</S.SubTitle>
        </S.TitleContainer>
        <S.DataContainer>
          <span>{`$${formatMoney(value)}`}</span>
          <span>{`${count} ${
            count > 1 ? "transactions" : "transaction"
          }`}</span>
        </S.DataContainer>
      </S.Content>
    </S.Container>
  );
};

export default ChartLegends;
