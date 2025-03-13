# Woman Safety App - SheShield
**A Hackathon Project built in 6 hours**
## Overview
The **SheShield** is designed to provide emergency assistance in unsafe situations. It includes features like SOS alerts, safe zone tracking, whiteboard gesture detection, timer-based emergency alerts, and fake call simulation for personal safety.

## Features
- **SOS Emergency Location**: Press and hold the SOS button to send an alert with your location to emergency contacts via Twilio API.
- **Safe Zone Detection**: The app checks if the user is in a predefined safe zone; if not, an alert is triggered.
- **Whiteboard Gesture SOS**: Drawing continuously for more than 3 seconds triggers an SOS alert.
- **Timer-based Safety Check**: If the user does not respond to an 'Are you okay?' prompt after a set timer, an SOS alert is sent automatically.
- **Fake Call Simulation**: The app plays a pre-recorded voice message when a fake call is triggered to make it appear as if the user is on a real call.

## Tech Stack
- **Frontend**: React.js (vite)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Communication**: Twilio API
- **Location**: Open Street Map API

## Setup & Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 14.x)
- MongoDB
- Twilio Account (for sending SMS alerts)

### Installation Steps
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/adnankhan46/bit-innovathon.git
   cd bit-innovathon  # root dir
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Setup Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI="mongodb://localhost:27017/bit-innova"
   JWT_SECRET="your_super_secret_key"
   PORT=5000
   TWILIO_ACCOUNT_SID="your_twilio_account_sid"
   TWILIO_AUTH_TOKEN="your_twilio_auth_token"
   TWILIO_PHONE_NUMBER="+your_twilio_phone_number" # Make purchase it's free from twilio
   EMERGENCY_CONTACTS="+your_emergency_contact_number" # Make sure to verify from twilio
   ```
4. **Run the Application: BACKEND**
   ```sh
   npm run dev
   ```
   The server will start on `http://localhost:5000`.
4. **Run the Application:FRONTEND**
   ```sh
   cd client
   npm run dev
   npm run dev -- --host  # mobile view with same wifi
   ```
   The server will start on `http://localhost:5173`.

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /signup | Register a new user |
| POST   | /login | Login user |
| POST   | /send-alert | Send an SOS alert |

## UI Screenshots

![sheshield-landing](https://github.com/user-attachments/assets/bf4ef909-1ccb-470a-b03e-61eff6b6d923)

![sheshield-2](https://github.com/user-attachments/assets/630916f2-89e0-4631-af3b-133d44a7ca59)

![sheshield-1](https://github.com/user-attachments/assets/ba0b85ac-33d8-4981-842b-41c013e3e4fb)


## Make Sure
Some issue might be there.
**Recommended: RUN in Desktop**

---

**Made with ❤️ for Women's Safety** by Adnan Khan && Garv Thakre

