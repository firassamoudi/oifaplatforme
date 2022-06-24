import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";
import { Chart } from "react-google-charts";

import { colors } from "/imports/libs/colors";

const PieChart = ({ data }) => {
  return (
    <Box className="PieChart">
      <Chart
        width="10rem"
        height="10rem"
        chartType="PieChart"
        data={data}
        options={{
          legend: "none",
          // is3D: true,
          pieSliceBorderColor: "transparent",
          colors,
          chartArea: { width: "70%", height: "70%" },
          pieSliceText: "percentage",
          pieSliceTextStyle: {
            color: "transparent",
            fontSize: 0,
          },
          tooltip: {
            trigger: "none",
          },
        }}
      />
      <Box className="PieChart__tooltip">
        {data
          .filter((c, i) => !!i)
          .map((c, i) => (
            <Box className="PieChart__tooltip__item" key={i}>
              <Box className="__color" style={{ backgroundColor: colors[i] }} />
              <Box className="__name">{c[0]}</Box>
              <Box className="__value">{c[1]}</Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default PieChart;
