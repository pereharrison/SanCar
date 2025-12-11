// src/pages/MyBookings.js
import { useState, useEffect } from "react";
import "../styles/Bookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("bookings");
    if (saved) {
      setBookings(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "4rem" }}>Loading your bookings...</h2>;
  }

  if (bookings.length === 0) {
    return (
      <div className="mybookings-container">
        <h1>My Bookings</h1>
        <p style={{ textAlign: "center", fontSize: "1.4rem", color: "#666", marginTop: "2rem" }}>
          You haven't booked any cars yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mybookings-container">
      <h1>My Bookings ({bookings.length})</h1>

      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking.id || Date.now()} className="booking-card">
            <img
              src={
                booking.carImage ||
                booking.image ||
                "https://via.placeholder.com/400x200/cccccc/666666?text=No+Image"
              }
              alt={booking.carName || "Car"}
              className="booking-img"
            />
            <div className="booking-info">
              <h3>{booking.carName || "Unknown Car"}</h3>
              <p>
                <strong>Dates:</strong> {booking.startDate} → {booking.endDate}
              </p>
              <p>
                <strong>Days:</strong> {booking.days || "N/A"}
              </p>
              <p className="total">
                Total: <strong>${booking.total || 0}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;