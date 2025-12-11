import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";

import "../styles/Cars.css"

function Cars() {
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
    <div className="container" style={{ padding: "4rem 0" }}>
      <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>
        All Available Cars
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", padding: "3rem", fontSize: "1.5rem" }}>
          Loading cars...
        </p>
      ) : (
        <div className="cars-grid">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Cars