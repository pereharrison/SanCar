import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navstyle.css";   // ← fixed the unused warning

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-contain">
      <div className="logo">
        <Link to="/">SanCar Rentals</Link>
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Links */}
      <div className={`links-container ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/cars" onClick={() => setIsOpen(false)}>All Cars</Link>
        <Link to="/signin" onClick={() => setIsOpen(false)}>Sign In</Link>
        <Link to="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </div>
    </nav>
  );
}

export default Navbar;