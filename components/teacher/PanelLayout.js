import React, { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { Container, Row, Col, Nav, Modal, Button } from "react-bootstrap";
import { MdDashboardCustomize, MdLogout } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TeacherSidebarContainer } from "../../styles/teacher/panel";
import { TbReportAnalytics } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Loading from "../admin/Loading";

const Sidebar = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const isActiveLink = (href) => {
    return window.location.pathname === href;
  };

  const handleLinkClick = () => {
    setIsLoading(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("persist:teacherAuth");
    window.location.href = "/teacher/signin";
  };

  return (
    <TeacherSidebarContainer>
      <Modal show={showLogout} onHide={() => setShowLogout(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogout(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid>
        <Row className="h-100 ">
          <Col sm={2} className="sidebar">
            <div
              style={{
                color: "#007074",
              }}
            >
              <h2>Teacher Panel</h2>
              <FiGithub size={50} />
            </div>

            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link
                href="/teacher/panel/dashboard"
                onClick={handleLinkClick}
                className={
                  isActiveLink("/teacher/panel/dashboard") ? "active" : ""
                }
              >
                <MdDashboardCustomize />
                DashBoard
              </Nav.Link>
              <Nav.Link
                href="/teacher/panel/classes"
                onClick={handleLinkClick}
                className={
                  isActiveLink("/teacher/panel/classes") ? "active" : ""
                }
              >
                <FaChalkboardTeacher />
                Classes
              </Nav.Link>
              <Nav.Link
                href="/teacher/panel/attendance"
                onClick={handleLinkClick}
                className={
                  isActiveLink("/teacher/panel/attendance") ? "active" : ""
                }
              >
                <TbReportAnalytics />
                Attendance
              </Nav.Link>
              <Nav.Link
                href="/teacher/panel/profile"
                onClick={handleLinkClick}
                className={
                  isActiveLink("/teacher/panel/profile") ? "active" : ""
                }
              >
                <CgProfile />
                Profile
              </Nav.Link>
              <Nav.Link
                style={{
                  color: "#ffffff",
                  backgroundColor: "red",
                }}
                onClick={() => setShowLogout(true)}
              >
                <MdLogout />
                Logout
              </Nav.Link>
            </Nav>
          </Col>
          <Col sm={10} className="pnl-content">
            {isLoading ? <Loading /> : children}
          </Col>
        </Row>
      </Container>
    </TeacherSidebarContainer>
  );
};

export default Sidebar;
