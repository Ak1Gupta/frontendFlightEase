import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlights } from '../contexts/FlightContext';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate();
  const { searchResults, loading, error, searchFlights } = useFlights();
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: '',
  });

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFlights(searchParams);
  };

  const handleBookNow = (flightId) => {
    navigate(`/flight/${flightId}`);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Find Your Flight</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Control 
              type="text" 
              name="from" 
              placeholder="From" 
              value={searchParams.from}
              onChange={handleInputChange}
              required 
            />
          </Col>
          <Col md={3}>
            <Form.Control 
              type="text" 
              name="to" 
              placeholder="To" 
              value={searchParams.to}
              onChange={handleInputChange}
              required 
            />
          </Col>
          <Col md={3}>
            <Form.Control 
              type="date" 
              name="departDate" 
              value={searchParams.departDate}
              onChange={handleInputChange}
              required 
            />
          </Col>
          <Col md={3}>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Searching...' : 'Search Flights'}
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <h2 className="mt-5 mb-4">Search Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length === 0 ? (
        <p>No flights found. Try adjusting your search criteria.</p>
      ) : (
        <Row>
          {searchResults.map((flight) => (
            <Col key={flight.id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{flight.airline} - Flight {flight.flightNumber}</Card.Title>
                  <Card.Text>
                    From: {flight.from} - To: {flight.to}<br />
                    Date: {flight.date}<br />
                    Price: ${flight.price}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleBookNow(flight.id)}>Book Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;