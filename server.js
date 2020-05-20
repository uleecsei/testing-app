const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const testRoute = require("./server/routes/test");
const testsRoute = require("./server/routes/tests");
const loginRoute = require("./server/routes/auth/login");
const regRoute = require("./server/routes/auth/registration");
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

app.use("/api/test", testRoute);
app.use("/api", testsRoute);
app.use("/api/auth", loginRoute);
app.use("/api/auth", regRoute);

app.use(express.static(__dirname + "/dist/testing-app"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/testing-app/index.html"));
});

app.listen(process.env.PORT || 8084, () => {
  console.log(`Server is running on port ${process.env.PORT || 8084}`);
});
