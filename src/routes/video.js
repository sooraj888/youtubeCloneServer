const express = require("express");
const fs = require("fs");
const rangeParser = require("range-parser");

const router = new express.Router();

router.get("/video", (req, res) => {
  const videoPath = "bigbuck.mp4";
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
});

module.exports = router;
