import { Link } from "react-router-dom";
import "../styles/CarCard.css";

function CarCard({ car }) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} />
      <div className="car-info">
        <h2>{car.name}</h2>
        <p className="price">
          ${car.pricePerDay} <span>/ day</span>
        </p>
        <Link to={`/cars/${car.id}`} className="view-details">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default CarCard;