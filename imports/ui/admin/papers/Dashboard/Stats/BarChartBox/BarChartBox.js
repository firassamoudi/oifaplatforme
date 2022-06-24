import "./style.scss";

import { CircularProgress } from "@material-ui/core";
import React from "react";
import Chart from "react-google-charts";

import Typography from "../../../../../common/Typography";

const BarChartBox = ({ data, isSeeker, isSolver }) => {
  // ...
  return (
    <div className="BarChartBox">
      <div className="BarChartBox__head">
        <Typography color="#12152C" size="2.16rem" face="Bold" lSpace="-.07rem">
          {data?.total}
          <span style={{ fontSize: "2rem" }}>
            {isSeeker && "Seekers"}
            {isSolver && "Solvers"}
          </span>
        </Typography>
      </div>
      <div className="BarChartBox__body">
        <div className="BarChartBox__content">
          {data && !parseInt(data?.total || "", 10) && (
            <div style={{ fontFamily: "CircularStd", fontSize: "18px" }}>
              No data
            </div>
          )}
          {data && !!parseInt(data?.total || "", 10) && (
            <Chart
              width="100%"
              height="100%"
              chartType="Bar"
              loader={<CircularProgress />}
              options={{
                legend: { position: "none" },
                vAxis: {
                  gridlines: {
                    color: "transparent",
                  },
                },
                axes: {
                  x: {
                    0: {
                      gridlines: {
                        color: "transparent",
                      },
                    },
                  },
                },
                bar: { groupWidth: "30%" },
                pageSize: 1,
              }}
              data={[["", ""], ...data.signups]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BarChartBox;
