import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightDetails.css';

function FlightDetails({ flight, onClose }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${flight.id}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{flight.airline} - Flight {flight.flightNumber}</h2>
        <p>From: {flight.from} ({flight.departureAirport}) - To: {flight.to} ({flight.arrivalAirport})</p>
        <p>Departure: {flight.departureTime} - Arrival: {flight.arrivalTime}</p>
        <p>Date: {flight.date}</p>
        <p>Duration: {flight.duration}</p>
        <p>Price: ${flight.price}</p>
        <p>Cabin Class: {flight.cabinClass}</p>
        <p>{flight.directFlight ? 'Direct Flight' : 'Connecting Flight'}</p>
        {flight.layover && (
          <p>Layover: {flight.layover.airport} for {flight.layover.duration}</p>
        )}
        <p>Aircraft: {flight.aircraft}</p>
        <p>Amenities: {flight.amenities.join(', ')}</p>
        <p>Baggage Allowance: {flight.baggageAllowance}</p>
        <p>Available Seats: {flight.availableSeats}</p>
        <div className="modal-actions">
          <button className="button book-button" onClick={handleBooking}>Confirm Booking</button>
          <button className="button close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default FlightDetails;