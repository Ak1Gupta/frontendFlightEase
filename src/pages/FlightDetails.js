import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFlights } from '../contexts/FlightContext';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

function FlightDetails() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { getFlightById, loading, error } = useFlights();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      const flightData = await getFlightById(flightId);
      setFlight(flightData);
    };
    fetchFlightDetails();
  }, [flightId, getFlightById]);

  const handleBooking = () => {
    navigate(`/booking/${flight.id}`);
  };

  if (loading) return <Container className="text-center mt-5">Loading...</Container>;
  if (error) return <Container className="text-center mt-5"><Alert variant="danger">{error}</Alert></Container>;
  if (!flight) return <Container className="text-center mt-5">Flight not found</Container>;

  return (
    <Container className="py-5">
      <h2 className="mb-4">{flight.airline} - Flight {flight.flightNumber}</h2>
      <Row className="mb-4">
        <Col md={6}>
          <h3>Flight Information</h3>
          <p>From: <strong>{flight.from}</strong> ({flight.departureAirport})</p>
          <p>To: <strong>{flight.to}</strong> ({flight.arrivalAirport})</p>
          <p>Departure: <strong>{flight.departureTime}</strong></p>
          <p>Arrival: <strong>{flight.arrivalTime}</strong></p>
          <p>Date: {flight.date}</p>
          <p>Duration: {flight.duration}</p>
        </Col>
        <Col md={6}>
          <h3>Booking Details</h3>
          <p>Price: <strong>${flight.price}</strong></p>
          <p>Cabin Class: {flight.cabinClass}</p>
          <p>{flight.directFlight ? 'Direct Flight' : 'Connecting Flight'}</p>
          {flight.layover && (
            <p>Layover: {flight.layover.airport} for {flight.layover.duration}</p>
          )}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h3>Aircraft Information</h3>
          <p>Aircraft: {flight.aircraft}</p>
          <p>Amenities: {flight.amenities.join(', ')}</p>
          <p>Baggage Allowance: {flight.baggageAllowance}</p>
          <p>Available Seats: {flight.availableSeats}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={handleBooking} className="me-2">Confirm Booking</Button>
          <Button variant="secondary" onClick={() => navigate('/')}>Back to Search</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default FlightDetails;