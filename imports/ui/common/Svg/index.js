import "./style.scss";

import React from "react";
import SVG from "react-inlinesvg";

const Svg = ({ src, style = {} }) => {
  return (
    <SVG
      className="Svg"
      src={src}
      style={{ width: "auto", height: "auto", ...style }}
    />
  );
};

export default Svg;
