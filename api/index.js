import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import alertRoutes from "./routes/alertRoutes.js";
import locationService from './services/locationServices.js';
import twilioService from "./services/TwilioService.js";
;

dotenv.config();
const app = express();
app.use(cors({
    origin: '*',  // Replace with your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }))
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api", alertRoutes);

app.get("/", (req, res)=>{
    res.send("Working");
})
app.post("/api/location", (req, res) => {
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Invalid location data" });
    }
  
    console.log(`📍 Location Received: Lat=${latitude}, Lng=${longitude}`);
    res.json({ success: true, message: "Location received successfully" });
  });
  app.post('/api/sos', async (req, res) => {
    try {
      const { latitude, longitude, leftSafeZone } = req.body;
      
      // Get location address from coordinates
      const locationAddress = await locationService.getAddressFromCoordinates(latitude, longitude);
      
      // Generate Google Maps link
      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      
      // Create message
      let message = `EMERGENCY ALERT: User needs help!\nLocation: ${locationAddress}\nView on map: ${mapsLink}`;
      
      if (leftSafeZone) {
        message = `SAFETY ALERT: User has left a safe zone and pressed SOS button.\n${message}`;
      }
      
      // Send SMS via Twilio
      await twilioService.sendSMS(message);
      
      res.status(200).json({ success: true, message: 'SOS alert sent successfully' });
    } catch (error) {
      console.error('SOS API Error:', error);
      res.status(500).json({ success: false, message: 'Failed to send SOS alert' });
    }
  });
  
  // Safe zones API endpoints
  app.get('/api/safe-zones', (req, res) => {
    // Replace with actual database query
    const sampleSafeZones = [
      { name: 'Home', latitude: 37.7749, longitude: -122.4194, radius: 200 },
      { name: 'Office', latitude: 37.7833, longitude: -122.4167, radius: 150 },
    ];
    
    res.json(sampleSafeZones);
  });
  
  app.post('/api/safe-zones', (req, res) => {
    // In a real app, save to database
    const newZone = req.body;
    res.status(201).json(newZone);
  });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
