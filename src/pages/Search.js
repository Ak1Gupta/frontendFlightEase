import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 30px;
`;

const FlightCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
`;

function Search() {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/flights/search', { params: searchParams });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  return (
    <SearchContainer>
      <h2>Search Flights</h2>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          type="text"
          name="from"
          placeholder="From"
          value={searchParams.from}
          onChange={handleInputChange}
          required
        />
        <Input
          type="text"
          name="to"
          placeholder="To"
          value={searchParams.to}
          onChange={handleInputChange}
          required
        />
        <Input
          type="date"
          name="date"
          value={searchParams.date}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">Search</Button>
      </SearchForm>

      <ResultsContainer>
        {searchResults.map((flight) => (
          <FlightCard key={flight.id}>
            <h3>{flight.airline}</h3>
            <p>From: {flight.from} - To: {flight.to}</p>
            <p>Date: {flight.date}</p>
            <p>Price: ${flight.price}</p>
            <Button as="a" href={`/booking/${flight.id}`}>Book Now</Button>
          </FlightCard>
        ))}
      </ResultsContainer>
    </SearchContainer>
  );
}

export default Search;