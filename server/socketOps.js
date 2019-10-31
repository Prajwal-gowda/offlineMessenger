let mongoose = require("mongoose"),
  express = require("express");

let chats = require("./models/chat-schema");

const allSocketOps = io => {
  const userData = {};

  io.on("connection", socket => {
    console.log("New client connected");

    socket.on("addUser", name => {
      socket.username = name;
      console.log(socket.id);
      userData[name] = socket.id;
      console.log(userData);
      io.emit("addUser", userData);
    });

    socket.on("chat message", (msg, username) => {
      console.log(msg);
      console.log(username);
      let chatRecord = new chats({
        sender: username,
        message: msg,
        reciever: "all"
      });
      chatRecord.save(function(err, chatData) {
        if (err) return console.error(err);
        console.log("saved to collection.");
      });
      io.emit("chat message", msg, username, "all");
    });

    socket.on("private", (pvtMsg, reciever, sender) => {
      console.log(pvtMsg);
      console.log(userData[String(reciever)]);
      senderId = userData[String(reciever)];
      io.to(`${senderId}`).emit("private", pvtMsg, sender, reciever);
    });

    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
module.exports = {
  allSocketOps
};
