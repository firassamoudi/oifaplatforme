import React from "react";

import Typography from "../../../../../common/Typography";

const Description = (props) => {
  return (
    <>
      <Typography size="1.6rem" color="#021C30" face="Medium" m="0 0 1.5rem 0">
        {props.title}
      </Typography>

      <Typography
        size="1.4rem"
        color="#434C5E"
        face="Book"
        height="2.5rem"
        align="justify"
      >
        {props.para}
      </Typography>

      {!!props.ressources?.length && (
        <div className="desc-ressources">
          {props.ressources.map((_, index) => {
            return (
              <div className="desc-ressources__item" key={index}>
                <div className="desc-ressources__icon">
                  <img src="/files/pdf.svg" alt="pdf icon" />
                </div>
                <Typography
                  size="1.4rem"
                  face="Medium"
                  color="#021C30"
                  m="0 0 0 .6rem"
                >
                  Design-portfolio.pdf
                </Typography>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Description;
