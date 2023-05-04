import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import DashBoard from "@/pages/admin/panel/dashboard";
import Head from "next/head";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Teachers from "@/pages/admin/panel/teachers";
import Students from "@/pages/admin/panel/students";
import Attendance from "@/pages/admin/panel/attendance";
import Profile from "@/pages/admin/panel/profile";

import { AdminPanelContainer } from "../../styles/admin/panel";
import { FiGithub } from "react-icons/fi";
import { FaUserGraduate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { RiBillFill } from "react-icons/ri";
import { MdLogout, MdDashboard, MdSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { useState } from "react";

const StyledCol = styled(Col)`
  background-color: #d9d9d9;
  position: fixed;
  padding: 0;
  height: 100vh;
  overflow: auto;
  position: fixed;
`;

const PanelLayout = () => {
  const [show, setShow] = useState(false);

  const router = useRouter();

  const Logout = () => {
    localStorage.removeItem("persist:adminAuth");
    router.push("/admin/signin");
  };

  const handleClose = () => setShow(false);

  return (
    <AdminPanelContainer>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you want to logout?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                Logout();
                handleClose();
              }}
            >
              Logout
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <StyledCol sm={2}>
            <div className="panel-title">
              <span>
                <FiGithub />
              </span>
              <h3>Admin Panel</h3>
            </div>
            <Container>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">
                    <MdDashboard />
                    DashBoard
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="teachers">
                    <GiTeacher />
                    Teachers
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="students">
                    <FaUserGraduate />
                    Students
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="attendance">
                    <RiBillFill />
                    Attendance
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="profile">
                    <CgProfile />
                    Profile
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    style={{
                      backgroundColor: "red",
                      color: "white",
                    }}
                    eventKey="logout"
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    {" "}
                    <MdLogout
                      style={{
                        color: "white",
                      }}
                    />
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
          </StyledCol>
          <Col
            sm={12}
            style={{
              paddingLeft: "20%",
              overflowY: "scroll",
              height: "100vh",
            }}
          >
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <DashBoard />
              </Tab.Pane>
              <Tab.Pane eventKey="teachers">
                <Teachers />
              </Tab.Pane>
              <Tab.Pane eventKey="students">
                <Students />
              </Tab.Pane>
              <Tab.Pane eventKey="attendance">
                <Attendance />
              </Tab.Pane>
              <Tab.Pane eventKey="profile">
                <Profile />
              </Tab.Pane>
            </Tab.Content>
          </Col>{" "}
        </Row>{" "}
      </Tab.Container>
    </AdminPanelContainer>
  );
};

export default PanelLayout;
