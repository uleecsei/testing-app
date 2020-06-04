//socket
const express = require("express")();
const http = require("http").Server(express);
const Socketio = require("socket.io")(http);

const games = [];


Socketio.of("/game").on("connection", (socket) => {
  socket.emit("Join the game", "You have joined the game");

  socket.on("createGame", (quiz) => {
    let roomId = getRandom();
    createRoom(roomId,quiz);
    socket.emit("quiz created", quiz);
    socket.emit("roomId", roomId);
  });

  socket.on("joinGameRoom", (room) => {
    if (roomExists) {
      socket.join(room);
      socket.emit("joinedRoom", "You have joined the room");
      socket.emit("games",games)
      let quiz=getQuiz(room).quiz
      Socketio.of("/game").in(room).emit("quiz",quiz);
      socket.on("gameStarted",()=>{
        Socketio.of("/game").in(room).emit("startGame",quiz);
      })
      socket.on("pushResults",(userResult)=>{
        games.forEach(game=>{
          if(game.roomId==room){
            game.result.push(userResult)
          }
        })
        Socketio.of("/game").in(room).emit("showResults",games.filter(e=>e.roomId==room)[0].result)
      })
      
    } else {
        return socket.emit("error","Not joined to the room")
      }
  });
});

function createRoom(room,quiz) {
  games.push({
    roomId: room,
    quiz:quiz,
    users: [],
    result:[]
  });
}



function getQuiz(roomId){
    let game=games.filter(game=>
        game.roomId === roomId
    )[0]
    return game
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
  console.log("Listeniing at port 3000");
});
