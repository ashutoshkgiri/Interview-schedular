const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Meeting = mongoose.model("Meeting");

// Get all meetings
router.get("/allMeetings", async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("user1", "email")
      .populate("user2", "email");

    res.json({ meetings });
 ;
  } catch (err) {
    console.error("Error fetching meetings:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single meeting
router.get("/meetingDetail/:meetingId", async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.meetingId)
      .populate("user1", "email")
      .populate("user2", "email");

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    res.json({ meeting });
  } catch (err) {
    console.error("Error fetching meeting detail:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
