const express = require("express");
const router = express.Router();
const Notification = require("../../models/notification.model");

router.get("/status", (req, res) => res.send("OK"));

router.get("/filter/:time", async (req, res) => {
  const now = new Date().getTime();
  const time = req.params.time;
  const getData = await Notification.find({
    createdTime: { $gt: time, $lt: now },
  })
    .sort({ createdTime: -1 })
    .limit(2)
    .exec();
  res.json(getData);
});
module.exports = router;
