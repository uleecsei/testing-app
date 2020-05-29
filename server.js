const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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
