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
passportMiddleware.jwt(passport);
// passportMiddleware.google(passport);
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (e) {
//     console.log(e);
//   }
// });

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
