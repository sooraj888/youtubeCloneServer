const express = require("express");
const router2 = new express.Router();
router2.get("/hi", async (req, res) => {
  try {
    res.status(201).send("hi");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router2;
