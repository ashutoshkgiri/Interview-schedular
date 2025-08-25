const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

// Add a new user
router.post("/addUser", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(422).json({ error: "Name and email are required" });
    }

    const user = new User({ name, email });
    await user.save();

    res.json({ message: "User saved successfully", user });
  } catch (err) {
    console.error("❌ Error adding user:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all user emails
router.get("/getEmails", async (req, res) => {
  try {
    // Only fetch `email` field, hide _id
    const users = await User.find({}, { _id: 0, email: 1 });

    res.json(users); // returns [{ email: "a@x.com" }, { email: "b@x.com" }]
  } catch (err) {
    console.error("❌ Error fetching emails:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
