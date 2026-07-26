const Route = require("../models/Route");
const Trip = require("../models/Trip");
const StopTime = require("../models/StopTime");
const Stop = require("../models/Stop");

const getBusRoute = async (req, res) => {
    try {
        const { busNumber } = req.params;

        // Find the route
    const routes = await Route.find().limit(10);

    console.log("Routes in DB:");
    console.log(routes);

    const route = await Route.findOne({
    $or: [
        { route_id: busNumber },
        { route_long_name: busNumber },
        { route_short_name: busNumber }
    ]
});
        if (!route) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        // Find one trip for that route
        const trip = await Trip.findOne({
            route_id: route.route_id
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        // Find stop times
        const stopTimes = await StopTime.find({
            trip_id: trip.trip_id
        }).sort({ stop_sequence: 1 });

        // Get stop details
        const stops = [];

        for (const st of stopTimes) {
            const stop = await Stop.findOne({
                stop_id: st.stop_id
            });

            if (stop) {
                stops.push({
                    stop_name: stop.stop_name,
                    stop_id: stop.stop_id,
                    latitude: stop.stop_lat,
                    longitude: stop.stop_lon
                });
            }
        }

       const stopNames = stops.map(stop => stop.stop_name);

res.json({
    busNumber,
    from: stopNames[0] || "",
    to: stopNames[stopNames.length - 1] || "",
    totalStops: stopNames.length,
    stops: stopNames
});

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = { getBusRoute };