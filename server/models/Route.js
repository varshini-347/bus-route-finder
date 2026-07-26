const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  route_id: {
    type: String,
    required: true,
    unique: true,
  },
  agency_id: String,
  route_short_name: String,
  route_long_name: String,
  route_desc: String,
  route_type: Number,
});

module.exports = mongoose.model("Route", routeSchema);