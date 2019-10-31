import React, { Component } from "react";
import "./login.css";

import InputField from "../../components/inputField/InputField";
import Button from "../../components/button/Button";

import axios from "axios";
import { CommonHandler } from "../../common";

class Login extends Component {
  state = {
    userName: "",
    password: "",
    userList: []
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleLogin = () => {
    console.log("logged in");
    const index = this.state.userList.findIndex(
      individualUser =>
        individualUser.name === this.state.userName &&
        individualUser.password === this.state.password
    );
    console.log(index);
    if (index !== -1) {
      console.log("authorized user");
      CommonHandler.setCookie("userinfo", this.state.userName);
      this.props.history.push("/dashboard");
    }
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:4000/login")
      .then(res => {
        console.log(res);
        this.setState({ userList: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="login-page">
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
        <Button buttonText="Login" onClick={this.handleLogin} />
      </div>
    );
  }
}

export default Login;
