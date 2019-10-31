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
      io.emit("chat message", msg, username);
    });

    socket.on("private", (pvtMsg, reciever, sender) => {
      console.log(pvtMsg);
      console.log(userData[String(reciever)]);
      senderId = userData[String(reciever)];
      io.to(`${senderId}`).emit("private", pvtMsg, sender);
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
