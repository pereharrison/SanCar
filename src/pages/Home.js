import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Homestyle.css";
import CarCard from "../components/CarCard";


function Home() {
  const stats = [
    { number: "500+", text: "Cars Available" },
    { number: "24/7", text: "Customer Support" },
    { number: "100%", text: "Satisfaction Rate" }
  ];
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/cars.json")
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <header className="home-header">
        <h1 className="header-title">
          Welcome to <span className="highlight">SanCar</span> Rentals 🚗
        </h1>
        <p className="header-sub">
          Affordable prices • Instant booking • No hidden fees • 24/7 support
        </p>
        <div className="header-cta">
          <Link to="/cars" className="cta-btn">
            Browse All Cars →
          </Link>
        </div>
      </header>

      <section className="trust-stat">
        <ul className="stats-list">
          {stats.map((stat, index) => (
            <li key={index} className="stat">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-sub">{stat.text}</span>
            </li>
          ))}
        </ul>
      </section>
      {loading ? (
        <p style={{ textAlign: "center", padding: "3rem", fontSize: "1.5rem" }}>
          Loading cars...
        </p>
      ) : (
        <section className="featured-cars">
          <div className="container">
            <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>
              Featured Cars
            </h2>
            <div className="cars-grid">
              {cars.slice(0, 3).map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Home;