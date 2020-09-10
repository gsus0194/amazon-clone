import React from "react";
import "./Toggle.css";

const Toggle = ({ clickHandler, text, icon }) => {
  return (
    <button className="toggle" onClick={clickHandler}>
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default Toggle;
