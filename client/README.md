# Bus Route Finder — Frontend

A React + Tailwind CSS frontend for searching Hyderabad city bus routes.

## Setup

```bash
cd client
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` and proxies `/api/*` requests
to `http://localhost:5000` (see `vite.config.js`) — point that at your Express
server, or update the proxy target.

## Build

```bash
npm run build
npm run preview
```

## Expected backend endpoint

```
GET /api/bus/:busNumber
```

Response:

```json
{
  "busNumber": "10",
  "from": "Miyapur",
  "to": "Koti",
  "totalStops": 28,
  "stops": ["Miyapur", "JNTU", "KPHB", "Kukatpally", "Ameerpet", "Lakdikapul", "Koti"]
}
```

A 404 (or any error) from this endpoint is treated as "no bus found" and
shown as a friendly error card.

## Structure

```
src/
  components/   Navbar, Footer, SearchBar, FeatureCard, StopTimeline, Loading, ErrorCard
  pages/        Home, Results, About
  services/     api.js (Axios client)
  App.jsx
  main.jsx
```

## Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios
- lucide-react icons
