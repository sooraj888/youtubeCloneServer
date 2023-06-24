const express = require("express");
const fs = require("fs");
const rangeParser = require("range-parser");
const HomeScreenVideoData = require("../models/home");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = new express.Router();

router.get("/video", (req, res) => {
  const videoName = req.query.id;
  console.log("videoName:   ", videoName);
  const videoPath = `uploads/${videoName}`;

  try {
    const videoSize = fs.statSync(videoPath).size;

    let range = req.headers.range || "bytes=0-";

    const positions = rangeParser(videoSize, range, { combine: true });

    // get video stats (about 61MB)

    const start = positions[0].start;
    const end = positions[0].end || fileSize - 1;
    const chunkSize = end - start + 1;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
  } catch (e) {
    if (e?.errno == -4058) {
      res.status(404).send("video not found");
    } else {
      res.status(404).send("something went wrong while fetching video");
    }
  }
});

router.post("/video", upload.single("video"), async (req, res) => {
  const file = req.file;
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  try {
    const addHomeScreenVideoData = new HomeScreenVideoData({
      videoTitle: file.originalname,
      views: 0,
      likes: 0,
      dislikes: 0,
      url: fullUrl + "?id=" + file?.filename,
    });

    console.log("Full URL:", fullUrl);
    console.log(req.port);
    const insertHomeScreenData = await addHomeScreenVideoData.save();
    res.send("File uploaded!");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
