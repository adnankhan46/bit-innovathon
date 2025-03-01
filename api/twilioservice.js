import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

// Check if Twilio credentials exist
if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
  console.error("❌ Missing Twilio environment variables!");
  process.exit(1);
}

const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendAlertMessage = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: to,
    });
    console.log("✅ Message Sent:", response.sid);
  } catch (error) {
    console.error("❌ Error sending message:", error);
    throw error;
  }
};
