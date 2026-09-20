import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Results from './pages/Results.jsx';
import About from './pages/About.jsx';
import FindRoute from './pages/FindRoute.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results/:busNumber" element={<Results />} />
          <Route path="/about" element={<About />} />
          <Route path="/find-route" element={<FindRoute />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
