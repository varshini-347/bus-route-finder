const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  stop_id: {
    type: String,
    required: true,
    unique: true,
  },
  stop_name: String,
  stop_lat: Number,
  stop_lon: Number,
});

module.exports = mongoose.model("Stop", stopSchema);