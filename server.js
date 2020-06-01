const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const passportMiddleware = require('./server/middleware/passport.middleware');
require("dotenv").config();

const app = express();

app.use(passport.initialize());
passportMiddleware(passport);

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

app.use("/api/auth", require("./server/routes/auth.routes"));
app.use("/api/tests", require("./server/routes/tests.routes"));

app.use(express.static(__dirname + "/dist/testing-app"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/testing-app/index.html"));
});

app.listen(process.env.PORT || 8084, () => {
  console.log(`Server is running on port ${process.env.PORT || 8084}`);
});

//socket
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
  console.log("Listening at port 3000");
});

