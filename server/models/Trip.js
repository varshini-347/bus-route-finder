const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  route_id: String,
  service_id: String,
  trip_id: {
    type: String,
    required: true,
    unique: true,
  },
  trip_headsign: String,
  direction_id: Number,
  shape_id: String,
});

module.exports = mongoose.model("Trip", tripSchema);