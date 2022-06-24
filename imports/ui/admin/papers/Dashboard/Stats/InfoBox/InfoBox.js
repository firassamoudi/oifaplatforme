import "./style.scss";

import WorkIcon from "@material-ui/icons/Work";
import React from "react";

import Typography from "../../../../../common/Typography";

const InfoBox = ({ title, data }) => {
  const RenderList = (list) => {
    return list.map((item, index) => {
      return (
        <div className="InfoBox__body__item" key={index}>
          <div className="InfoBox__info">
            <div className="InfoBox__info__head">
              <div
                className={`InfoBox__info__icon InfoBox__info__icon--${index}`}
              >
                <WorkIcon
                  style={{ color: "#fff", width: "1.1rem", height: "1.1rem" }}
                />
              </div>
              <Typography
                color="#12152C"
                size="1.7rem"
                lSpace="-0.064rem"
                face="Book"
              >
                {item[0]}
              </Typography>
            </div>

            <Typography
              color="#12152C"
              size="5.58rem"
              face="Bold"
              lSpace="-0.213"
              height="7.1rem"
            >
              {item[1]}
            </Typography>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="InfoBox">
      <div className="InfoBox__head">
        <Typography
          color="#12152C"
          size="2.16rem"
          face="Bold"
          lSpace="-.077rem"
        >
          {title}
        </Typography>
      </div>
      <div className="InfoBox__body">{RenderList(data)}</div>
    </div>
  );
};

export default InfoBox;
