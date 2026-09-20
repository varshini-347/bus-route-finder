const express = require("express");

const router = express.Router();

const {
    getBusRoute,
    findBusRoutes
} = require("../controllers/busController");

// IMPORTANT:
// /find must come BEFORE /:busNumber
router.get("/find", findBusRoutes);

router.get("/:busNumber", getBusRoute);

module.exports = router;