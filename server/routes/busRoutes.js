const express = require("express");
const router = express.Router();

const { getBusRoute } = require("../controllers/busController");

router.get("/:busNumber", getBusRoute);

module.exports = router;