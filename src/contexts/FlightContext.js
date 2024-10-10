import React, { createContext, useState, useContext } from 'react';
import { dummyFlights } from '../data/dummyFlights';

const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState(dummyFlights);
  const [searchResults, setSearchResults] = useState([]);

  const searchFlights = (searchParams) => {
    const filteredFlights = flights.filter(flight => {
      // Implement your search logic here
      return true; // Replace with actual filtering
    });
    setSearchResults(filteredFlights);
  };

  return (
    <FlightContext.Provider value={{ flights, searchResults, searchFlights }}>
      {children}
    </FlightContext.Provider>
  );
};

export const useFlights = () => useContext(FlightContext);