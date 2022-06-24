/* eslint-disable sonarjs/no-duplicate-string */
import "./style.scss";

import cx from "classnames";
import React from "react";

const index = ({ orange }) => {
  return (
    <div className="ball-loader">
      <div className={cx("ball-loader-ball ball1", { __orange: orange })} />
      <div className={cx("ball-loader-ball ball2", { __orange: orange })} />
      <div className={cx("ball-loader-ball ball3", { __orange: orange })} />
    </div>
  );
};

export default index;
