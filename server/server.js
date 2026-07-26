const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import database connection
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

// Import routes
const busRoutes = require("./routes/busRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("🚍 Bus Route Finder API is Running...");
});

// Bus API routes
app.use("/api/bus", busRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});