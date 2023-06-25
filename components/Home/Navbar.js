import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand href="/">QR-Attendance</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">About us</Nav.Link>
            <NavDropdown title="Sing up" id="basic-nav-dropdown">
              <NavDropdown.Item href="/student/signup">
                Student Signup
              </NavDropdown.Item>{" "}
              <NavDropdown.Divider />
              <NavDropdown.Item href="/admin/signup">
                University Signup
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Sing in" id="basic-nav-dropdown">
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
    </Navbar>
  );
}

export default BasicExample;
