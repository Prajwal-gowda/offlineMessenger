import React from "react";
import "./form.css";

import Button from "../button/Button";

export default function Form({ handleChange, msgValue, sendMessage }) {
  const handleSubmit = event => {
    event.preventDefault();
    document.querySelector(".msg-form").reset();
  };

  return (
    <div className="form-field">
      <form className="msg-form" onSubmit={handleSubmit}>
        <input
          className="message-field"
          type="text"
          onChange={handleChange}
          value={msgValue}
        />
        <Button buttonText="Send" onClick={sendMessage} />
      </form>
    </div>
  );
}
