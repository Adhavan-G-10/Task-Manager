import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

// .env config
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://task-manager-plum-iota.vercel.app', 'http://localhost:5173'], // Allowed origins
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("MongoDB Connection Failed:", err));

// Basic Testing Route
app.get('/', (req, res) => {
    res.send("Task Manager API is running with Modern JS...");
});

// User Routes
app.use('/api/users', userRoutes);

// Task Routes
import taskRoutes from './routes/taskRoutes.js';
app.use('/api/tasks', taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});