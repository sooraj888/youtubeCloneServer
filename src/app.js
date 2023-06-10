const express = require("express");
const router = require("./routes/homeScreen");
const router2 = require("./routes/shortsScreen");
require("../src/db/connection");

const app = express();
app.use(express.json());
app.use(router);
app.use(router2);
const port = process.env.PORT || 3000;
const HomeScreenVideoData = require("../src/models/home");

app.get("/", async (req, res) => {
  res.send("hello from Sooraj");
});

app.listen(port, () => {
  console.log("connection is live at port number", port);
});
