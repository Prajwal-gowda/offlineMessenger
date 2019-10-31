import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import Button from "../button/Button";
import { CommonHandler } from "../../common";
import "./userlist.css";

class UserList extends React.Component {
  state = {};

  handleLogout = () => {
    CommonHandler.removeCookie("userinfo");
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="user">
        <ul className="ulist">
          {this.props.userlist.map((user, index) => (
            <li
              className="name-list"
              key={index}
              onClick={() => this.props.sendPrivateMessage(user)}
            >
              {user}
            </li>
          ))}
        </ul>
        <Button buttonText="Logout" onClick={this.handleLogout} />
      </div>
    );
  }
}

export default withRouter(UserList);
