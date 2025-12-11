import {useParams, Link} from "react-router-dom"
import { useState, useEffect } from "react"
import "../styles/CarDetails.css"

function CarDetails(){
    const { id } = useParams();

    const carId = Number(id)

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    fetch("/data/cars.json")
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      });
  }, []);

  const car = cars.find(c => c.id === carId);

  if (loading) {
    return <p style={{textAlign: "center", padding: "5rem"}}>Loading car details...</p>
  }

  if(!car){
    return (
        <div style={{textAlign: "center", padding: "5rem"}}>
        <h2>Car not found</h2>
        <Link to="/cars">← Back to all cars</Link>
      </div>
    )
  }
      return (
    <div className="car-details-container">
      <div className="car-image">
        <img src={car.image} alt={car.name} />
      </div>

      <div className="car-info">
        <h1>{car.name}</h1>
        <p className="price">${car.pricePerDay} <span>/ day</span></p>

        <div className="specs">
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Fuel:</strong> {car.fuel}</p>
          <p><strong>Seats:</strong> {car.seats}</p>
        </div>

        <Link to={`/rent/${car.id}`} className="rent-btn">
          Rent Now 
        </Link>

        <Link to="/cars" className="back-link">← Back to cars</Link>
      </div>
    </div>
  );
}


export default CarDetails