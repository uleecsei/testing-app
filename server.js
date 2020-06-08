const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Game = require('./server/models/Game');
const User = require('./server/models/User');
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

//socket------------------------------------------------------------

const http = require("http").Server(app);
const Socketio = require("socket.io")(http);


Socketio.of("/game").on("connection", (socket) => {
  socket.emit("Join the game", "You have joined the game");

  socket.on("createGame", (data) => {
    const {quiz, userId} = data;
    let roomId = getRandom();
    createGame(roomId, quiz, userId);
    socket.emit("quiz created", quiz);
    socket.emit("roomId", roomId);
  });

  socket.on("joinGameRoom", async (data) => {
    const {room, userId, firstName} = data;
    

    if (roomExists(room)) {
      addNewUser(room, userId, firstName);
      socket.join(room);

      
      let quiz;
       await getQuiz(room)
         .then( res => {
           quiz = res.quiz
         });

      Socketio.of("/game").in(room).emit("quiz",quiz);
      socket.on("gameStarted",()=>{
        Socketio.of("/game").in(room).emit("startGame");
      })
      let allUsers= await getGameUsers(room)
      console.log(allUsers)
      Socketio.of("/game").in(room).emit("joinedRoom", `${firstName} joined the room`,firstName,allUsers);

      socket.on("pushResults",async (result,userId,userName)=>{
        console.log(result,userId,userName)
        const game= await saveUserResults(room, userId, result)
        //console.log('SAVED GAME',game)
        Socketio.of("/game").in(room).emit("showResults",{userName,...result})
        
      })

      socket.on("leave",()=>{
       
        Socketio.of("/game").in(room).emit("left","Left game");
        socket.leave(room)
      })

    } else {
      return socket.emit("error","Not joined to the room")
    }
  });

});

async function createGame(room, quiz, userId) {
  const newGame  = await new Game ({
    created_by: userId,
    testId: quiz._id,
    roomId: room,
    status: 'Created',
    quiz: quiz,
    users: [
    ],
  });

  await newGame.save();
}


function getQuiz(roomId) {
   return Game.findOne({roomId: roomId})
}

async function roomExists(room) {
  const game = await Game.findOne({roomId: room});
  return !!game;
}

  function addNewUser(room, userId, firstName) {
   Game.findOneAndUpdate({roomId: room},
  { "$push": { "users": {
      userId: userId, userName: firstName, result: {},
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

async function getGameUsers(room){
  const game= await Game.findOne({roomId: room});
  console.log(game)
  console.log(game.users)
  return game.users;
}

async function saveUserResults(room, userId, result) {
  const gameRoom = await Game.findOne({roomId: room});
  const user = gameRoom.users.filter(i => i.userId == userId)[0];
  const userFromUsers = await User.findById(userId);
  console.log(userFromUsers)
  userFromUsers.tests.push({
    testId: gameRoom.testId,
    result: result,
  });

  user.result = result;
  await userFromUsers.save();
  await gameRoom.save();
  return gameRoom;
}

function getRandom() {
  return Math.round(Math.random() * 1000000).toString();
}

http.listen(process.env.PORT || 8084, () => {
  console.log(`Listening at port ${process.env.PORT || 8084}`);
});

