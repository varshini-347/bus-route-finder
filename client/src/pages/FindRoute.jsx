import { useState } from "react";

export default function FindRoute() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!from.trim() || !to.trim()) {
      setError("Please enter both locations.");
      return;
    }

    setLoading(true);
    setError("");
    setRoutes([]);

    try {
      const response = await fetch(
       `https://bus-route-finder-api.onrender.com/api/bus/find?from=${encodeURIComponent(
          from
        )}&to=${encodeURIComponent(to)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to find buses.");
      }

      setRoutes(data.routes || []);
    } catch (err) {
      console.error("Bus search error:", err);
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Find Your Bus Route
          </h1>

          <p className="mt-3 text-gray-600">
            Find buses that can take you from your starting location
            to your destination.
          </p>
        </div>

        {/* Search Box */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSearch}>

            <div className="grid gap-6 md:grid-cols-2">

              {/* From */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Starting Location
                </label>

                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Example: Ameerpet"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* To */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Destination
                </label>

                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Example: Secunderabad"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {loading ? "Finding Buses..." : "Find Buses"}
            </button>

          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        {routes.length > 0 && (
          <div className="mt-8">

            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Available Buses
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              {routes.map((route) => (
                <div
                  key={route.routeId}
                  className="rounded-2xl bg-white p-6 shadow-md"
                >

                  <div className="flex items-center gap-3">

                    <div className="text-3xl">
                      🚌
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Bus Number
                      </p>

                      <h3 className="text-2xl font-bold text-gray-900">
                        {route.busNumber}
                      </h3>
                    </div>

                  </div>

                  <div className="mt-5 rounded-xl bg-blue-50 p-4">
                    <p className="text-sm text-gray-600">
                      Route
                    </p>

                    <p className="mt-1 font-semibold text-blue-900">
                      {from} → {to}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}