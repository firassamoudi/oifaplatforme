import "./style.scss";

import { CircularProgress } from "@material-ui/core";
import React from "react";
import Chart from "react-google-charts";

import { colors } from "/imports/libs/colors";

import Typography from "../../../../../common/Typography";

const PieChartBox = ({ title, data }) => {
  return (
    <div className="PieChartBox">
      <div className="PieChartBox__head">
        <Typography
          color="#12152C"
          size="2.016rem"
          lSpace="-0.077rem"
          face="Bold"
        >
          {title}
        </Typography>
      </div>
      <div className="PieChartBox__body">
        <Chart
          width="100%"
          height="100%"
          chartType="PieChart"
          loader={<CircularProgress />}
          data={[["", ""], ...data]}
          options={{
            legend: "none",
            pieSliceBorderColor: "transparent",
            colors,
            pieSliceText: "percentage",
            pieSliceTextStyle: {
              color: "#fff",
              fontName: "CircularStd",
              fontSize: 22,
              bold: true,
            },
            tooltip: {
              showColorCode: true,
              textStyle: {
                color: "#12152c",
                fontName: "CircularStd",
                bold: true,
                fontSize: 16,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChartBox;
