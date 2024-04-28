import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  isUserLoggedIn,
  logout,
  isAdminUser,
  getLoggedInUser,
} from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { GiBus } from "react-icons/gi";
const NavbarComponent = () => {
  const isAuth = isUserLoggedIn();
  const isAdmin = isAdminUser();
  const navigate = useNavigate();
  const email = getLoggedInUser();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Navbar expand="lg">
      <Container className="justify-content-between">
        <Navbar.Brand href="/">
          <span className="logo">
            <GiBus />
          </span>
          Book Bus
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {!isAdmin && <Nav.Link href="/">Home</Nav.Link>}
            {!isAuth && <Nav.Link href="/login">Login</Nav.Link>}
            {!isAuth && (
              <Nav.Link href="/register" className="link-btn">
                Create Account
              </Nav.Link>
            )}

            {isAuth && (
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <FaRegUserCircle /> Settings
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href={`/user/profile?email=${email}`}>
                    My Account
                  </Dropdown.Item>
                  {!isAdmin && (
                    <Dropdown.Item href={`/booking/list?email=${email}`}>
                      My Bookings
                    </Dropdown.Item>
                  )}
                  {isAdmin && (
                    <Dropdown.Item href={`/bus/list`}>Bus List</Dropdown.Item>
                  )}
                  {isAdmin && (
                    <Dropdown.Item href={`/booking/list`}>
                      Bookings List
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
