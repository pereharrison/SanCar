// src/pages/RentCar.js
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Rentcar.css";

function RentCar() {
  const { id } = useParams();
  const carId = Number(id);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetch("/data/cars.json")
      .then((res) => res.json())
      .then((allCars) => {
        const foundCar = allCars.find((c) => c.id === carId);
        setCar(foundCar);
        setLoading(false);
      });
  }, [carId]);

  if (loading) return <h2>Loading...</h2>;
  if (!car) return <h2>Car not found</h2>;

  // Calculate days
  let days = 0;
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days < 0) days = 0;
  }

  const total = days * car.pricePerDay;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (days === 0) {
      alert("Please pick correct dates");
      return;
    }

    const booking = {
      carName: car.name,
      carImage: car.image,
      startDate,
      endDate,
      days,
      total,
    };

    let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booked! Total: $" + total);
  };

  return (
    <div className="rent-page">
      <h1 className="rent-title">Rent {car.name}</h1>
      <p className="rent-price">${car.pricePerDay} per day</p>
      <img src={car.image} alt={car.name} className="rent-image" />

      <form onSubmit={handleSubmit} className="rent-form">
        <div>
          <label className="rent-label">Start Date</label>
          <input
            className="rent-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="rent-label">End Date</label>
          <input
            className="rent-input"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        {days > 0 && (
          <div className="rent-summary">
            <p className="rent-days">Number of days: <strong>{days}</strong></p>
            <p className="rent-total">Total: <strong>${total}</strong></p>
          </div>
        )}

        <button type="submit" className="rent-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default RentCar;
