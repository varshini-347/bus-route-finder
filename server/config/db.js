const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Node Version:", process.version);
    console.log("Mongo URI exists:", !!process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error(err);
  }
};

module.exports = connectDB;