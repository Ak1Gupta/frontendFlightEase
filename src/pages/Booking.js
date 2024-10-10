import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dummyFlights } from '../data/dummyFlights';
import './Booking.css';

function Booking() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    seatNumber: '',
    meal: 'standard',
    specialRequests: '',
  });

  useEffect(() => {
    const selectedFlight = dummyFlights.find(f => f.id === parseInt(flightId));
    if (selectedFlight) {
      setFlight(selectedFlight);
    } else {
      navigate('/'); // Redirect to home if flight not found
    }
  }, [flightId, navigate]);

  const handleInputChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement booking logic here
    console.log('Booking submitted:', bookingDetails);
    alert('Booking confirmed!');
    navigate('/my-bookings');
  };

  if (!flight) {
    return <div>Loading...</div>;
  }

  return (
    <div className="booking-container">
      <h2>Book Your Flight</h2>
      <div className="flight-summary">
        <h3>{flight.airline} - Flight {flight.flightNumber}</h3>
        <p>From: {flight.from} to {flight.to}</p>
        <p>Date: {flight.date}</p>
        <p>Time: {flight.departureTime} - {flight.arrivalTime}</p>
        <p>Price: ${flight.price}</p>
      </div>
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={bookingDetails.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={bookingDetails.lastName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={bookingDetails.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={bookingDetails.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="seatNumber"
          placeholder="Preferred Seat Number (optional)"
          value={bookingDetails.seatNumber}
          onChange={handleInputChange}
        />
        <select
          name="meal"
          value={bookingDetails.meal}
          onChange={handleInputChange}
        >
          <option value="standard">Standard Meal</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="kosher">Kosher</option>
          <option value="halal">Halal</option>
        </select>
        <textarea
          name="specialRequests"
          placeholder="Special Requests (optional)"
          value={bookingDetails.specialRequests}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit" className="submit-button">Confirm Booking</button>
      </form>
    </div>
  );
}

export default Booking;