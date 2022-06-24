import "./style.scss";

import React from "react";

const Dev = () => {
  return (
    <div className="Dev">
      <h2>Temporary links</h2>
      <a href="/auth/login" target="_blank">
        Login
      </a>
      <a href="/auth/register/seeker" target="_blank">
        Signup seeker
      </a>
      <a href="/auth/register/solver" target="_blank">
        Signup solver
      </a>
      <a href="/auth/register/evaluator" target="_blank">
        Signup evaluator
      </a>
    </div>
  );
};

export default Dev;
