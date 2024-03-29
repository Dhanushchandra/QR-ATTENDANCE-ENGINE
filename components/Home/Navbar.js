import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styled from "styled-components";

const StyledNav = styled(Navbar)`
  border-bottom: 1px solid #e7e7e7;
  box-shadow: 0 0.2px 2px 3px rgba(35, 194, 14, 0.541);
`;

function BasicExample() {
  return (
    <StyledNav expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand href="/">
          <span
            style={{
              color: "#4274D0",
              fontWeight: "600",
            }}
          >
            QR-Attendance
          </span>
          -Engine
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Sign up" id="basic-nav-dropdown">
              <NavDropdown.Item href="/student/signup">
                Student Signup
              </NavDropdown.Item>{" "}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin/signup">
                University Signup
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Sign in" id="basic-nav-dropdown">
              <NavDropdown.Item href="/student/signin">
                Student Signin
              </NavDropdown.Item>
              <NavDropdown.Item href="/teacher/signin">
                Teacher Signin
              </NavDropdown.Item>{" "}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin/signin">
                University Signin
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNav>
  );
}

export default BasicExample;
