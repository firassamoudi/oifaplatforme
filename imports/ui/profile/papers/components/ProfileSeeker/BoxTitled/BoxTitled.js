import "./style.scss";

import React from "react";

import Typography from "../../../../../common/Typography";

const BoxTitled = (props) => {
  const renderSections = (sections = []) => {
    return sections.map((section, index) => {
      if (!section.text) return null;
      return (
        <div className="BoxTitled__section" key={index}>
          <Typography
            size="1.6rem"
            face="Medium"
            color="#021C30"
            m="0 0 1.3rem 0"
          >
            {section.title}
          </Typography>
          {!Array.isArray(section.text) ? (
            <Typography
              size="1.4rem"
              color={section.blue ? "#03256C" : "#434C5E"}
              face="Medium"
            >
              {section.text}
            </Typography>
          ) : (
            section.text.map((label, index) => {
              return (
                <div key={index}>
                  <Typography
                    size="1.4rem"
                    color={section.blue ? "#03256C" : "#434C5E"}
                    face="Medium"
                  >
                    {label.label}
                  </Typography>
                </div>
              );
            })
          )}
        </div>
      );
    });
  };

  return (
    <div className="BoxTitled">
      <div
        className="BoxTitled__title"
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
      <div className="BoxTitled__body">{renderSections(props.sections)}</div>
    </div>
  );
};

export default BoxTitled;
