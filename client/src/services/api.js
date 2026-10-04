import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bus-route-finder-api.onrender.com/api',
  timeout: 10000,
});

/**
 * Fetches route details for a given Hyderabad city bus number.
 * @param {string} busNumber - e.g. "10", "49M", "218"
 * @returns {Promise<{busNumber: string, from: string, to: string, totalStops: number, stops: string[]}>}
 */
export async function getBusRoute(busNumber) {
  const cleaned = busNumber.trim().toUpperCase();
  const { data } = await api.get(`/bus/${encodeURIComponent(cleaned)}`);
  return data;
}

export default api;
