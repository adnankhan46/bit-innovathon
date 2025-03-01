import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendAlertMessage = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
      ,
    });
    console.log("Message Sent:", response.sid);
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
