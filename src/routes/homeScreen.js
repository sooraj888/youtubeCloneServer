const express = require("express");
const HomeScreenVideoData = require("../models/home");
const router = new express.Router();
router.post("/homeScreen", async (req, res) => {
  try {
    const addHomeScreenVideoData = new HomeScreenVideoData(req.body);
    console.log(req.body);
    const insertHomeScreenData = await addHomeScreenVideoData.save();
    res.status(201).send(insertHomeScreenData);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/homeScreen", async (req, res) => {
  try {
    const homeScreenData = await HomeScreenVideoData.find({}).sort({
      likes: -1,
    });
    res.status(200).send(homeScreenData);
  } catch (e) {
    res.status(500).send(e);
  }
});

//get request for individual data
router.get("/homeScreen/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const homeScreenData = await HomeScreenVideoData.findById({ _id });

    if (homeScreenData) {
      res.status(200).send(homeScreenData);
    } else {
      res.status(404).send("data not found");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

//handle patch request
router.patch("/homeScreen/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const homeScreenData = await HomeScreenVideoData.findByIdAndUpdate(
      {
        _id,
      },
      req.body,
      { new: true }
    );
    res.status(200).send(homeScreenData);
  } catch (e) {
    res.status(500).send(e);
  }
});

//delete request for individual data
router.delete("/homeScreen/:id", async (req, res) => {
  try {
    const homeScreenData = await HomeScreenVideoData.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send(homeScreenData);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
