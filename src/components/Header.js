import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Image, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import './Header.css';

function Header() {
  const { user, login, logout } = useAuth();

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const idToken = response.credential; // Google's ID token
      console.log('Google ID Token:', idToken);      // Send the ID token to your backend for validation and login
      // const backendResponse = await axios.post('http://localhost:8080/api/auth/google', {
      //   token: idToken,
      // });      if (backendResponse.data.success) {
      //   console.log(backendResponse.data);
      //   console.log('User logged in successfully');
      //   // Handle the logged-in state, e.g., save token, redirect, etc.
      // } else {
      //   console.error('Login failed');
      // }
      login(idToken);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response.access_token)
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`)
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          login(data);
        });
    },
  });

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="header-navbar py-0">
      <Container className="align-items-center">
        <Navbar.Brand as={Link} to="/" className="logo py-0">FlightEase</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="py-1">Home</Nav.Link>
            {user ? ( <>
            <Nav.Link as={Link} to="/my-bookings" className="py-1">My Bookings</Nav.Link>
              <NavDropdown 
                title={
                  <span className="d-flex align-items-center">
                    <Image src={user.picture} roundedCircle width="20" height="20" className="me-1" />
                    <span className="user-name">{user.given_name}</span>
                  </span>
                } 
                id="basic-nav-dropdown" 
                className="py-1"
              >
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
              </>
            ) : (
              <Nav.Item className="py-1">
                {/* <button onClick={handleGoogleLogin} className="google-login-button">Login</button> */}
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => {
                      console.log('Login Failed');
                }}
              />
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;