require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Meeting = mongoose.model("Meeting");
const User = mongoose.model("User");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post("/createMeeting", async (req, res) => {
  await schedule(req.body, null, res);
});

router.post("/edit/:meetingId", async (req, res) => {
  await schedule(req.body, req.params.meetingId, res);
});


async function schedule(body, meetingId, res) {
  try {
    let { title, date, startTime, endTime, email1, email2 } = body;

    if (!title || !date || !startTime || !endTime || !email1 || !email2) {
      return res.status(422).json({ error: "Please add all the fields" });
    }

    if (email1 === email2) {
      return res.status(422).json({ error: "Emails cannot be same" });
    }

    const startString = startTime;
    const endString = endTime;

    startTime = timeToNumber(startString);
    endTime = timeToNumber(endString);

    if (endTime < startTime) {
      return res
        .status(422)
        .json({ error: "End time cannot be smaller than start time" });
    }

    // Validate users
    const savedUser1 = await User.findOne({ email: email1 });
    if (!savedUser1) {
      return res.status(422).json({ error: "Invalid email1" });
    }

    const savedUser2 = await User.findOne({ email: email2 });
    if (!savedUser2) {
      return res.status(422).json({ error: "Invalid email2" });
    }

    // Check availability for user1
    let user1Available = true;
    const meetingsUser1 = await Meeting.find({
      $or: [
        { date: date, user1: savedUser1._id },
        { date: date, user2: savedUser1._id },
      ],
    });

    for (const meeting of meetingsUser1) {
      if (meetingId != null && meetingId == meeting._id.toString()) continue;
      if (startTime < meeting.endTime && meeting.startTime < endTime) {
        user1Available = false;
        break;
      }
    }

    // Check availability for user2
    let user2Available = true;
    const meetingsUser2 = await Meeting.find({
      $or: [
        { date: date, user1: savedUser2._id },
        { date: date, user2: savedUser2._id },
      ],
    });

    for (const meeting of meetingsUser2) {
      if (meetingId != null && meetingId == meeting._id.toString()) continue;
      if (startTime < meeting.endTime && meeting.startTime < endTime) {
        user2Available = false;
        break;
      }
    }

    if (!user1Available || !user2Available) {
      return res.status(422).json({
        error: `user1Available: ${user1Available}, user2Available: ${user2Available}`,
      });
    }

    // Create or update meeting
    if (meetingId) {
      const result = await Meeting.updateOne(
        { _id: meetingId },
        {
          $set: {
            title,
            date,
            startTime,
            endTime,
            user1: savedUser1,
            user2: savedUser2,
          },
        }
      );
      res.json({ meeting: result });
    } else {
      const meeting = new Meeting({
        title,
        date,
        startTime,
        endTime,
        user1: savedUser1,
        user2: savedUser2,
      });

      const result = await meeting.save();
      res.json({ meeting: result });
    }

    // Send email
    await sendMail(
      title,
      date,
      startString,
      endString,
      email1,
      email2,
      meetingId
    );
  } catch (err) {
    console.error("❌ Error in schedule:", err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// Send email notification
async function sendMail(
  title,
  date,
  startString,
  endString,
  email1,
  email2,
  meetingId
) {
  let html = `
    <div style="padding:10px;display:flex;justify-content:space-evenly;margin:5px">
      <div class="s4">Title</div>
      <div class="s4">Email1</div>
      <div class="s4">Email2</div>
      <div class="s4">Date</div>
      <div class="s4">Start Time</div>
      <div class="s4">End Time</div>
    </div>
    <div style="padding:10px;display:flex;justify-content:space-evenly;margin:5px;background-color:lightgray">
      <div class="s4">${title}</div>
      <div class="s4">${email1}</div>
      <div class="s4">${email2}</div>
      <div class="s4">${date}</div>
      <div class="s4">${startString}</div>
      <div class="s4">${endString}</div>
    </div>`;

  const subject = meetingId ? "Meeting Updated" : "Meeting Created";

  const recipients = [email1, email2];

  for (const recipient of recipients) {
    try {
      await sgMail.send({
        to: recipient,
        from: process.env.SENDGRID_SENDER,
        subject,
        html,
      });
      console.log(`📧 Email sent to ${recipient}`);
    } catch (error) {
      console.error(`❌ Error sending email to ${recipient}:`, error.message);
    }
  }
}

// Convert HH:MM → Number
function timeToNumber(sTime) {
  return Number(sTime.replace(":", ""));
}

module.exports = router;
