import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MyBookingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BookingCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c0392b;
  }
`;

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('An error occurred while cancelling the booking. Please try again.');
    }
  };

  return (
    <MyBookingsContainer>
      <h2>My Bookings</h2>
      {bookings.map((booking) => (
        <BookingCard key={booking.id}>
          <h3>{booking.flight.airline}</h3>
          <p>From: {booking.flight.from} - To: {booking.flight.to}</p>
          <p>Date: {booking.flight.date}</p>
          <p>Passenger: {booking.firstName} {booking.lastName}</p>
          <p>Email: {booking.email}</p>
          <p>Phone: {booking.phone}</p>
          <Button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</Button>
        </BookingCard>
      ))}
    </MyBookingsContainer>
  );
}

export default MyBookings;