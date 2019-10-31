import React, { Fragment } from "react";
import "./button.css";

const Button = ({ buttonText, onClick }) => {
  return (
    <Fragment>
      <button className="common-btn" onClick={() => onClick()}>
        {buttonText}
      </button>
    </Fragment>
  );
};

export default Button;
