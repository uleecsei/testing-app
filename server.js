const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Game = require('./server/models/Game');

const app = express();

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

app.use("/api/auth", require("./server/routes/auth.routes"));
app.use("/api/tests", require("./server/routes/tests.routes"));
app.use("/api/photo", require("./server/routes/photo.routes"));

app.use(express.static(__dirname + "/dist/testing-app"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/testing-app/index.html"));
});

app.listen(process.env.PORT || 8084, () => {
  console.log(`Server is running on port ${process.env.PORT || 8084}`);
});

//socket------------------------------------------------------------

const http = require("http").Server(express);
const Socketio = require("socket.io")(http);

const games = [];


Socketio.of("/game").on("connection", (socket) => {
  socket.emit("Join the game", "You have joined the game");

  socket.on("createGame", (quiz, userId) => {
    console.log(quiz);
    console.log(userId);
    let roomId = getRandom();
    createRoom(roomId,quiz);
    socket.emit("quiz created", quiz);
    socket.emit("roomId", roomId);
  });

  socket.on("joinGameRoom", (room) => {
    if (roomExists) {
      socket.join(room);
      socket.emit("joinedRoom", "You have joined the room");
      socket.emit("games",games);
      let quiz=getQuiz(room).quiz;
      Socketio.of("/game").in(room).emit("quiz",quiz);
      socket.on("gameStarted",()=>{
        Socketio.of("/game").in(room).emit("startGame",quiz);
      })

    } else {
      return socket.emit("error","Not joined to the room")
    }
  });
});

async function createRoom(room,quiz) {
  const newGame  = await new Game ({
    // created_by: 1,
    testId: quiz._id,
    roomNumber: room,
    status: 'Created',
    users: [
      {
        // userId: ,
        result:  0,
      }
    ],
  });

  await newGame.save();

  //
  // games.push({
  //   roomId: room,
  //   quiz:quiz,
  //   users: [],
  // });
}

async function getQuiz(roomId){
  return await Game.findOne({roomId: roomId});

  // let game=games.filter(game=>
  //   game.roomId === roomId
  // )[0]
}

async function roomExists(room) {
  // let game = games.filter((game) => {
  //   game.roomId === room;
  // });

  const game = await Game.findOne({roomId: roomId});

  return !!game;
}

async function addNewUser(room, user) {
  // let game = games.filter((g) => {
  //   g.roomId = room;
  // });
  // game.users.push(user);

  await Game.findOneIdAndUpdate({roomId: room},
  { "$push": { "users": {
      userId: user, result: 0,
  }
    } },
    {new: true, useFindAndModify: false},
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
}

function getRandom() {
  return Math.round(Math.random() * 1000000).toString();
}

http.listen(3000, () => {
  console.log("Listening at port 3000");
});

