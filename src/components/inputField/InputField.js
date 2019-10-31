import React, { Component } from "react";
import "./inputfield.css";

class InputField extends Component {
  render() {
    return (
      <div className="input-field">
        <label>{this.props.label} : </label>
        <input
          className="input-element"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          name={this.props.name}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default InputField;
