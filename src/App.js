import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FlightProvider } from './contexts/FlightContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FlightDetails from './pages/FlightDetails';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <FlightProvider>
          <Router>
            <div className="app-container d-flex flex-column min-vh-100">
              <Header />
              <main className="flex-grow-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/flight/:flightId" element={<FlightDetails />} />
                  <Route path="/booking/:flightId" element={<Booking />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </FlightProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;