import { Container, Form, Button, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Navbar.css";
import { useEffect, useState } from "react";

function NavigationBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    navigate("/search", { state: { query } });
  };
  return (
    <Navbar expand="lg" className="transparant fixed-top p-2">
      <Container fluid>
        <Navbar.Brand className="text-danger fs-1 Navbar-logo " as={Link} to={"/"}>
          Movielist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-danger text-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-end">
            <div className="ml-auto">
              <Form onSubmit={handleSearch}>
                <input type="search" placeholder="What do you want to watch?" name="query" className="Navbar-search" />
              </Form>
              <div>
                {isLoggedIn ? (
                  <>
                    <Button
                      variant="danger"
                      className="Navbar-button"
                      onClick={() => {
                        localStorage.removeItem("token");
                        setIsLoggedIn(false);
                        return navigate("/");
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline-danger" className="Navbar-button" as={Link} to={"/login"}>
                      Login
                    </Button>
                    <Button variant="danger" className="Navbar-button" as={Link} to={"/register"}>
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
