import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bodyParser from "body-parser";

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


app.get("/", (req, res)=>{
    res.send("Working");
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
