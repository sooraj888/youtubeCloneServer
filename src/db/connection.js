const mongoose = require("mongoose");

const DB =
  "mongodb+srv://soorajsagar888:lDCnnrAreQg7vaXq@cluster0.i4jispj.mongodb.net/youtubeDatabase?retryWrites=true&w=majority";

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("connection successful");
  })
  .catch((e) => {
    console.log("No connection", e);
  });
