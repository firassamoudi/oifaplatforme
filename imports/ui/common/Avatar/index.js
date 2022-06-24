import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import FilesCollection from "/imports/api/File";

import Typography from "../Typography";

const Avatar = ({ label = "", small, style, size, imgSrc }) => {
  const regX = /. ./g;
  const hasSpace = regX.test(label);
  const x = label.split(" ")[0];
  const y = label.split(" ")[1];
  const name = hasSpace
    ? `${x?.[0] ?? ""}${y?.[0] ?? ""}`
    : `${label?.[0] ?? ""}${label?.[1] ?? ""}`;
  // ...
  return (
    <Box
      className={cx(
        "Avatar",
        { __small: small },
        { [`__${x?.[0]?.toLocaleLowerCase()}`]: x }
      )}
      style={{ ...style }}
    >
      <Box className="__bg" />
      {imgSrc ? (
        <Box className="__img" component="img" src={imgSrc} />
      ) : (
        <Box className="__label">
          <Typography
            face="Bold"
            size={size || "1.6rem"}
            height="1.4rem"
            style={{
              textTransform: "uppercase",
              color: "inherit",
              letterSpacing: "0.5px",
            }}
          >
            {name}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default withTracker(({ imgId, ...props }) => {
  let imgSrc = null;
  const handler = Meteor.subscribe("files.all", {
    imgId,
  });
  if (!handler.ready()) {
    return { imgSrc };
  }
  const srcRaw = FilesCollection.findOne({ _id: imgId });
  if (srcRaw) {
    imgSrc = srcRaw.link();
  }
  // ...
  return {
    imgSrc,
    ...props,
  };
})(Avatar);
