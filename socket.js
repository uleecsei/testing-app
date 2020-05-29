//socket
const express = require("express")();
const http = require("http").Server(express);
const Socketio = require("socket.io")(http);

const games = [];

Socketio.of("/game").on("connection", (socket) => {
  socket.emit("Join the game", "You have joined the game");

  socket.on("createGame", () => {
    let roomId = getRandom();
    createRoom(roomId);
    socket.emit("roomId", games);
    socket.emit("roomId", roomId);
  });

  socket.on("joinGameRoom", (room, user, quizId) => {
    if (roomExists) {
      socket.join(room);

      socket.emit("joinedRoom", "You have joined the room");
      
      socket.emit("games",games)

      Socketio.of("/game").in(room).emit("games", `Games:${games}`);
    } else {
        return socket.emit("error","Not joined to the room")
      }
  });
});

function createRoom(room) {
  games.push({
    roomId: room,
    users: [],
  });
}

function roomExists(room) {
  let game = games.filter((game) => {
    game.roomId === room;
  });
  return !!game;
}

function addNewUser(room, user) {
  let game = games.filter((g) => {
    g.roomId = room;
  });
  game.users.push(user);
}
function getRandom() {
  return Math.round(Math.random() * 1000000).toString();
}

http.listen(3000, () => {
  console.log("Listeniing at port 300");
});
