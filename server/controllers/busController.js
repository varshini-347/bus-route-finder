const Route = require("../models/Route");
const Trip = require("../models/Trip");
const StopTime = require("../models/StopTime");
const Stop = require("../models/Stop");

// --------------------------------------------------
// Existing: Get complete route of a bus
// --------------------------------------------------

const getBusRoute = async (req, res) => {
    try {
        const { busNumber } = req.params;

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

        const trip = await Trip.findOne({
            route_id: route.route_id
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        const stopTimes = await StopTime.find({
            trip_id: trip.trip_id
        }).sort({ stop_sequence: 1 });

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


// --------------------------------------------------
// New: Find buses from one location to another
// --------------------------------------------------

const findBusRoutes = async (req, res) => {
    try {
        const { from, to } = req.query;

        // Check whether both locations were provided
        if (!from || !to) {
            return res.status(400).json({
                message: "Please provide both starting location and destination."
            });
        }

        // Find starting stops
        const fromStops = await Stop.find({
            stop_name: {
                $regex: from.trim(),
                $options: "i"
            }
        });

        // Find destination stops
        const toStops = await Stop.find({
            stop_name: {
                $regex: to.trim(),
                $options: "i"
            }
        });

        if (fromStops.length === 0) {
            return res.status(404).json({
                message: `No stop found for "${from}".`
            });
        }

        if (toStops.length === 0) {
            return res.status(404).json({
                message: `No stop found for "${to}".`
            });
        }

        // Get stop IDs
        const fromStopIds = fromStops.map(stop => stop.stop_id);
        const toStopIds = toStops.map(stop => stop.stop_id);

        // Find trips containing the starting stop
        const fromStopTimes = await StopTime.find({
            stop_id: { $in: fromStopIds }
        });

        // Find trips containing the destination stop
        const toStopTimes = await StopTime.find({
            stop_id: { $in: toStopIds }
        });

        // Create a lookup of destination stops for each trip
        const toLookup = new Map();

        for (const stopTime of toStopTimes) {
            if (!toLookup.has(stopTime.trip_id)) {
                toLookup.set(stopTime.trip_id, []);
            }

            toLookup.get(stopTime.trip_id).push(stopTime);
        }

        // Find trips where:
        // starting stop and destination stop are on the same trip
        // AND starting stop comes before destination
        const matchingTrips = [];

        for (const fromStopTime of fromStopTimes) {

            const destinationTimes =
                toLookup.get(fromStopTime.trip_id) || [];

            for (const toStopTime of destinationTimes) {

                if (
                    fromStopTime.stop_sequence <
                    toStopTime.stop_sequence
                ) {
                    matchingTrips.push({
                        trip_id: fromStopTime.trip_id,
                        from_stop_id: fromStopTime.stop_id,
                        to_stop_id: toStopTime.stop_id,
                        from_sequence: fromStopTime.stop_sequence,
                        to_sequence: toStopTime.stop_sequence
                    });
                }
            }
        }

        if (matchingTrips.length === 0) {
            return res.status(404).json({
                message: `No direct bus found from "${from}" to "${to}".`
            });
        }

        // Get unique trip IDs
        const tripIds = [
            ...new Set(matchingTrips.map(trip => trip.trip_id))
        ];

        // Find trips
        const trips = await Trip.find({
            trip_id: { $in: tripIds }
        });

        // Get unique route IDs
        const routeIds = [
            ...new Set(trips.map(trip => trip.route_id))
        ];

        // Find routes
        const routes = await Route.find({
            route_id: { $in: routeIds }
        });

        // Prepare response
        const results = [];

        for (const route of routes) {

            const routeTrips = trips.filter(
                trip => trip.route_id === route.route_id
            );

            results.push({
                routeId: route.route_id,
                busNumber:
                    route.route_short_name ||
                    route.route_long_name ||
                    route.route_id,
                routeName: route.route_long_name || "",
                trips: routeTrips.map(trip => ({
                    tripId: trip.trip_id,
                    headsign: trip.trip_headsign || ""
                }))
            });
        }

        res.json({
            from,
            to,
            totalRoutes: results.length,
            routes: results
        });

    } catch (err) {
        console.error("Find bus routes error:", err);

        res.status(500).json({
            message: err.message
        });
    }
};


// --------------------------------------------------
// Export both functions
// --------------------------------------------------

module.exports = {
    getBusRoute,
    findBusRoutes
};