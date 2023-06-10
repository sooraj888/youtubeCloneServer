const express = require("express");
const mongoose = require("mongoose");

const homeScreenVideoData = new mongoose.Schema({
  videoTitle: { type: String, require: true, trim: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  url: { type: String, require: true, trim: true },
});

const HomeScreenVideoData = new mongoose.model(
  "HomeScreenVideoData",
  homeScreenVideoData
);

module.exports = HomeScreenVideoData;
