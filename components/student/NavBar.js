import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { StudentNavbarContainer } from "../../styles/student/index.js";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setAuth } from "@/slices/student/authSlice.js";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router.js";

function StudentNavbar({ children }) {
  const StyledNavLink = styled(Nav.Link)`
    color: #007074;
    font-weight: 600;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    transition: all 0.3s ease-in-out;

    &:hover,
    &:active,
    &:focus {
      text-decoration: underline;
      text-decoration-skip-ink: auto;
      text-underline-offset: 0.5rem;
      text-decoration-thickness: 2px;
    }

    @media (max-width: 576px) {
      color: #007074;
      font-weight: 600;
      background-color: #ffffff;
      border-bottom: 2px solid #007074;
      border-radius: 0;
      padding: 0.5rem 1rem;
      margin-top: 20px;
    }
  `;

  const StyledLogoutButton = styled(Button)`
    background-color: red;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    margin-top: 20px;
    margin: 0 0.5rem;

    border: none;
    color: #ffffff;
    font-weight: 600;
    transition: all 0.3s ease-in-out;
    border: 1px solid red;

    &:hover,
    &:active,
    &:focus {
      background-color: #ffffff;
      color: red;
      border: 1px solid red;
    }

    @media (max-width: 576px) {
      color: #ffffff;
      background-color: red;
      border-radius: 10px;
      padding: 0.5rem 1rem;
      margin-top: 20px;
      border: none;
    }
  `;

  const dispatch = useDispatch();
  const router = useRouter();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <StudentNavbarContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(
                setAuth({
                  id: "",
                  name: "",
                  email: "",
                  phone: "",
                  university: "",
                  department: "",
                  srn: "",
                  token: "",
                  role: "",
                })
              );
              router.push("/student/signin");
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Navbar key={"sm"} bg="light" expand={"sm"} className="mb-3">
        <Container fluid>
          <Navbar.Brand
            href="/student/panel"
            style={{
              color: "#007074",
              fontWeight: "600",
            }}
          >
            QR ENGINE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"sm"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
            placement="end"
          >
            <Offcanvas.Header
              closeButton
              style={{
                backgroundColor: "#007074",
                color: "#ffffff",
              }}
            >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                Controls
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <StyledNavLink href="/student/panel">Home</StyledNavLink>
                <StyledNavLink href="/student/panel/classes">
                  Scan QR
                </StyledNavLink>
                <StyledNavLink href="/student/panel/attendance">
                  Attendance Reports
                </StyledNavLink>
                <StyledNavLink href="/student/panel/profile">
                  Profile
                </StyledNavLink>
                <StyledLogoutButton
                  variant="danger"
                  onClick={() => setShow(true)}
                >
                  Logout
                </StyledLogoutButton>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {children}
    </StudentNavbarContainer>
  );
}

export default StudentNavbar;
