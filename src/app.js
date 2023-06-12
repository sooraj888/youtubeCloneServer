const express = require("express");
const router = require("./routes/homeScreen");
const router2 = require("./routes/shortsScreen");
const router3 = require("./routes/video");
require("../src/db/connection");

const app = express();
app.use(express.json());
app.use(router);
app.use(router2);
app.use(router3);
const port = process.env.PORT || 3000;
const HomeScreenVideoData = require("../src/models/home");
const hostname = "0.0.0.0";

app.get("/", async (req, res) => {
  // res.send("hello from Sooraj");
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, hostname, () => {
  console.log("connection is live at port number", port);
});
