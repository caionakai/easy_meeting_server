const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connect", (socket) => {
  socket.on("user-connected", (userId) => {
    if (!userId) return;
    socket.broadcast.emit("user-connected", { userId });

    socket.on("disconnect", () => {
      socket.broadcast.emit("user-disconnected", { userId });
    });
  });

  socket.on("manual-disconnect", (userId) => {
    socket.broadcast.emit("user-disconnected", { userId });
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("Socket Server Listening: ");
});
