import React from "react";

export const FormBtn = props =>
  <button {...props} style={{ backgroundColor: "#254483", fontFamily: "Zilla Slab" }} className="btn btn-success">
    {props.children}
  </button>;
