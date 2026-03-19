import { useState, useEffect } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("bookings");
    if (data) {
      setBookings(JSON.parse(data));
    }
  }, []);

  if (bookings.length === 0) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>My Bookings</h1>
        <p>You have no bookings yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center" }}>My Bookings ({bookings.length})</h1>

      <div style={{ display: "grid", gap: "20px", marginTop: "30px" }}>
        {bookings.map((b) => (
          <div key={b.id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            background: "white"
          }}>
            {b.carImage && (
              <img src={b.carImage} alt={b.carName} style={{ width: "100%", borderRadius: "8px", marginBottom: "15px" }} />
            )}
            <h3>{b.carName}</h3>
            <p>Dates: {b.startDate} → {b.endDate}</p>
            <p>Days: {b.days}</p>
            <p style={{ fontSize: "1.5rem", color: "blue" }}>
              Total: <strong>${b.total}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;