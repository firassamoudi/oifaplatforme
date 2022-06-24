import React from "react";

import File from "../../../../../common/File";
import Typography from "../../../../../common/Typography";

const Description = (props) => {
  return (
    <>
      <Typography size="1.6rem" color="#021C30" face="Medium" m="0 0 1.5rem 0">
        {props.title}
      </Typography>

      {props.connected ? (
        <Typography
          size="1.4rem"
          color="#434C5E"
          face="Book"
          height="2.5rem"
          align="justify"
        >
          {props.para}
        </Typography>
      ) : (
        <div className="para-hidden">
          {[1, 1, 1, 1, 1, 1, 1].map((_, index) => {
            return <div className="para-hidden__line" key={index} />;
          })}
        </div>
      )}

      {!!props.ressources && props.connected && (
        <div className="desc-ressources">
          {props.ressources.map((id) => {
            return (
              <div key={id} className="desc-ressources__item">
                <File fileId={id} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Description;
