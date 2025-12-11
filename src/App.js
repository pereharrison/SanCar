import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import RentCar from './pages/Rentcar';
import MyBookings from './pages/Booking';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />               {/* shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/rent/:id" element={<RentCar />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;