import React, { useState } from "react";
import { Dropdown, Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../style/Header.css'; // External CSS file for custom styles

const Header = ({ isLoggedIn }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4 shadow">
      {/* Left Side: Logo Button */}
      <Button
        variant="link"
        className="navbar-brand logo-btn"
        onClick={() => (window.location.href = "/")}
      >
        <span className="logo-placeholder">Logo</span>
      </Button>

      {/* Center: Navigation Links */}
      <Nav className="mx-auto">
        <Nav.Link href="/Destination" className="mx-2">
          Destination
        </Nav.Link>
        <Nav.Link href="/about" className="mx-2">
          About
        </Nav.Link>
        <Nav.Link as={Link} to="/add-activity" className="mx-2"> {/* Add this link */}
          Add Activity
        </Nav.Link>
      </Nav>

      {/* Right Side: Account Dropdown */}
      <Dropdown align="end" show={dropdownOpen} onToggle={toggleDropdown}>
        <Dropdown.Toggle
          variant="link"
          id="account-dropdown"
          className="d-flex align-items-center account-icon"
        >
          <i className="bi bi-person-circle fs-4"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {isLoggedIn ? (
            <>
              <Dropdown.Item href="/account">Account</Dropdown.Item>
              <Dropdown.Item href="/logout">Sign Out</Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Item href="/signin">Sign In</Dropdown.Item>
              <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default Header;