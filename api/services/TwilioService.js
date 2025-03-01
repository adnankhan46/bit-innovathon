import twilio from 'twilio';

class TwilioService {
  constructor() {
    // Initialize Twilio client
    // Replace with your actual Twilio credentials
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
    this.emergencyContacts = process.env.EMERGENCY_CONTACTS ? process.env.EMERGENCY_CONTACTS.split(',') : [];
    
    this.client = twilio(this.accountSid, this.authToken);
  }

  // Send SMS to emergency contacts
  async sendSMS(message) {
    const promises = this.emergencyContacts.map(contactNumber => {
      return this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: contactNumber.trim()
      });
    });
    
    return Promise.all(promises);
  }
}

export default new TwilioService();
