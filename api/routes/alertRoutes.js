import express from "express";
import { sendAlertMessage } from "../twilioService.js"; // Import Twilio function

const router = express.Router();

router.post("/send-alert", async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: "Phone number and message are required" });
  }

  try {
    await sendAlertMessage(phoneNumber, message);
    res.json({ success: true, message: "Alert sent successfully" });
  } catch (error) {
    console.error("Error sending alert:", error);
    res.status(500).json({ error: "Failed to send alert" });
  }
});

export default router;
