import React, { Component } from "react";
import "./registeration.css";

import InputField from "../../components/inputField/InputField";
import Button from "../../components/button/Button";

import axios from "axios";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://172.16.7.195:4000");

class Registeration extends Component {
  state = {
    userName: "",
    password: "",
    email: ""
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = () => {
    let nameData = this.state.userName,
      passwordData = this.state.password,
      emailData = this.state.email;

    if (nameData !== "" && passwordData !== "" && emailData !== "") {
      console.log("user registered");
      const userObject = {
        name: nameData,
        password: passwordData,
        email: emailData
      };

      axios
        .post("http://localhost:4000/register/create", userObject)
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });

      // socket.emit("addUserDB", nameData, passwordData, emailData);
      // alert("successfully registered");
      this.props.history.push("/");
    } else {
      alert("enter the data");
    }
  };

  render() {
    return (
      <div className="registeration-page">
        <InputField
          type="text"
          placeholder="enter name"
          label="Name"
          name="userName"
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <InputField
          type="password"
          placeholder="enter password"
          label="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <InputField
          type="email"
          placeholder="enter email"
          label="Email ID"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Button
          className="submit-btn"
          buttonText="Submit"
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Registeration;
