import React from "react";
import { Redirect, Route } from "react-router-dom";

const Poute = ({ asIf, or, ...props }) =>
  asIf ? <Route {...props} /> : <Redirect to={or} />;
export default Poute;
