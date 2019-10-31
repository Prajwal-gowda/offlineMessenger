import React, { Component } from "react";
import "./landing.css";
import { Icon } from "antd";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { CommonHandler } from "../../common";

export class Landing extends Component {
  state = {
    showDashboard: false,
    responseObj: {}
  };

  responseGoogle = response => {
    console.log(response);
    console.log(response.profileObj.name);
    let user = { name: response.profileObj.name };
    localStorage.setItem("userData", JSON.stringify(user));

    this.setState({ showDashboard: true });
    CommonHandler.setCookie("userinfo", response.profileObj.name);
    this.props.history.push("/dashboard");
  };

  registerUser = () => {
    this.props.history.push("/register");
  };

  loginUser = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header-logo">Chat App</h1>
          <Icon className="App-logo" type="wechat" />
          <GoogleLogin
            clientId="447295909859-ru63noi89sgmqd80c7omvaa5qf7ls4sm.apps.googleusercontent.com"
            render={renderProps => (
              <button
                className="login-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <Icon className="google-icon" type="google" />
                Google Login
              </button>
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <Button buttonText="Register" onClick={this.registerUser} />
          <Button buttonText="Login" onClick={this.loginUser} />
        </header>
      </div>
    );
  }
}

export default Landing;
