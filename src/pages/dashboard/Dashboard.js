import React from "react";
import "./dashboard.css";

import Button from "../../components/button/Button";
import UserList from "../../components/userlist/UserList";
import ChatList from "../../components/chatlist/ChatList";
import Form from "../../components/form/Form";

import { connect } from "react-redux";
import { addMessage } from "../../actions";

import axios from "axios";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://172.16.7.195:4000");

const mongo = require("mongodb").MongoClient;

class Dashboard extends React.Component {
  state = {
    message: "",
    chatList: [],
    username: "",
    userlist: [],
    userObj: {},
    msgList: [],
    finalMsg: []
  };
  componentDidMount = () => {
    let nameOfUser = JSON.parse(localStorage.getItem("userData"));
    console.log(nameOfUser);

    this.setState({ username: nameOfUser }, () => {
      socket.emit("addUser", this.state.username);
    });

    axios
      .get("http://localhost:4000/dashboard")
      .then(res => {
        console.log(res);
        this.setState({ finalMsg: res.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    socket.on("addUser", userData => {
      console.log(userData);
      this.setState({ userObj: userData }, () => {
        console.log(this.state.userObj);
      });
    });

    let tempChat = [];

    socket.on("chat message", (msg, uname, receiver) => {
      tempChat = [...this.state.finalMsg];
      tempChat.push({ message: msg, sender: uname, receiver: receiver });
      this.setState({ finalMsg: tempChat });
    });

    socket.on("private", (pmsg, sender, receiver) => {
      tempChat = [...this.state.finalMsg];
      tempChat.push({ message: pmsg, sender: sender, receiver: receiver });
      this.setState({ finalMsg: tempChat });
      // this.props.dispatch(addMessage({ msg: pmsg, name: sender }));
    });
  };

  handleChange = ({ target }) => {
    this.setState({ message: target.value });
  };

  sendMessage = () => {
    socket.emit("chat message", this.state.message, this.state.username);
  };

  sendPrivateMessage = receiver => {
    console.log("hello" + receiver + this.state.username);
    const pvtMsg = prompt("enter message");
    socket.emit("private", pvtMsg, receiver, this.state.username);
  };

  render() {
    let ulist = Object.keys(this.state.userObj);
    return (
      <div className="dashboard">
        <h1 className="dashboard-header">Chat App</h1>
        <div className="wrapper">
          <div className="list-user">
            <UserList
              userlist={ulist}
              sendPrivateMessage={this.sendPrivateMessage}
              joinGroup={this.joinGroup}
            />
          </div>

          <div className="list-message">
            <ChatList listText={this.state.finalMsg} />
            <Form
              handleChange={this.handleChange}
              value={this.state.message}
              sendMessage={this.sendMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
