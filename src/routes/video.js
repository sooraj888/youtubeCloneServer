const express = require("express");
const fs = require("fs");

const router = new express.Router();

router.get("/video", (req, res) => {
  // const range = req.headers.range ? req.headers.range : "bytes=0-";
  const range = req.headers.range != undefined ? req.headers.range : "bytes=0-";

  // const range = "bytes=0-";
  console.log("hi", range);
  if (!range) {
    res.status(400).send("Requires Range header");
  } else {
    // get video stats (about 61MB)
    const videoPath = "bigbuck.mp4";
    const videoSize = fs.statSync("bigbuck.mp4").size;

    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);

    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });

    // Stream the video chunk to the client
    videoStream.pipe(res);
  }
});

module.exports = router;
