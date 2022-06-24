import "./style.scss";

import cx from "classnames";
import React from "react";

const Typography = ({
  className,
  name,
  face,
  size,
  height,
  m,
  p,
  display,
  color,
  align,
  noWrap,
  noSpace,
  lSpace,
  children,
  style,
  onClick = null,
  contentEditable,
  lang,
  maxWidth,
  fontWeight,
}) => {
  const TagName = name ? `${name}` : "p";
  // ...
  return (
    <TagName
      className={cx(
        "Typography-root",
        { [`Typography-${face}`]: !!face },
        { [`Typography-${display}`]: !!display },
        { [`Typography-align-${align}`]: !!align },
        { "Typography-noWrap": !!noWrap },
        { "Typography-noSpace": !!noSpace },
        { [className]: !!className }
      )}
      contentEditable={contentEditable}
      lang={lang}
      style={{
        color,
        fontSize: size,
        lineHeight: height,
        padding: p,
        margin: m,
        letterSpacing: lSpace,
        textAlign: align,
        maxWidth,
        fontWeight,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </TagName>
  );
};

export default Typography;
