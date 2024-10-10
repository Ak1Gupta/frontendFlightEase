import { useState } from 'react';
import { dummyFlights } from '../data/dummyFlights';

export const useFlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departDate: '',
    passengers: 1,
    cabinClass: 'economy',
    airline: '',
    maxPrice: '',
    directFlights: false,
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSearchParams({ ...searchParams, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredFlights = dummyFlights.filter(flight => {
      return (
        (!searchParams.from || flight.from.toLowerCase().includes(searchParams.from.toLowerCase())) &&
        (!searchParams.to || flight.to.toLowerCase().includes(searchParams.to.toLowerCase())) &&
        (!searchParams.departDate || flight.date === searchParams.departDate) &&
        (!searchParams.cabinClass || flight.cabinClass.toLowerCase() === searchParams.cabinClass.toLowerCase()) &&
        (!searchParams.airline || flight.airline.toLowerCase().includes(searchParams.airline.toLowerCase())) &&
        (!searchParams.maxPrice || flight.price <= parseInt(searchParams.maxPrice)) &&
        (!searchParams.directFlights || flight.directFlight)
      );
    });
    setSearchResults(filteredFlights);
  };

  return { searchParams, searchResults, handleInputChange, handleSubmit };
};