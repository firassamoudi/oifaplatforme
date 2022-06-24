/* eslint-disable react/jsx-one-expression-per-line */
import "./style.scss";

import React from "react";

import FileBill from "/imports/ui/common/FileBill";
import Typography from "/imports/ui/common/Typography";

const BoxTitledBillings = (props) => {
  // ...
  return (
    <div className="BoxTitledBillings">
      <div
        className="BoxTitledBillings__title"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography size="1.6rem" face="Medium" color="#021C30">
          {props.title}
        </Typography>
        <Typography
          size="1.6rem"
          face="Medium"
          color="#FFC857"
          style={{ cursor: "pointer" }}
        >
          <span onClick={props.handler}>{props.handlerTitle}</span>
        </Typography>
      </div>
      <div className="BoxTitledBillings__body">
        {props?.data?.billings
          ?.sort((x, y) => y.startDate - x.startDate)
          ?.map((bill, index) => {
            return (
              <FileBill
                key={index}
                deletable
                fileId={bill.fileId}
                {...bill}
                onDelete={null}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BoxTitledBillings;
