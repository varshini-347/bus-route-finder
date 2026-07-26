const mongoose = require("mongoose");

const stopTimeSchema = new mongoose.Schema({
  trip_id: String,
  arrival_time: String,
  departure_time: String,
  stop_id: String,
  stop_sequence: Number,
});

module.exports = mongoose.model("StopTime", stopTimeSchema);