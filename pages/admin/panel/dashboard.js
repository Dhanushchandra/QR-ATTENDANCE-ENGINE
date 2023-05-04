import withAuth from "@/components/admin/withAuth";
import DBChart from "@/components/admin/panel/dashboard/DBChart";

import { AdminDashBoardContainer } from "@/styles/admin/panel";
import { useState } from "react";

import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const organization = useSelector((state) => state.adminAuth.organization);
  const teacher = useSelector((state) => state.adminTeacher.teachers);
  const student = useSelector((state) => state.adminStudent.students);

  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <AdminDashBoardContainer>
      <h1>DashBoard</h1>

      <Container className="d-flex justify-content-around align-items-center cards">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Organization</Card.Title>
            <Card.Text>
              <h1>{organization}</h1>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>No of Teachers</Card.Title>
            <Card.Text>
              <h1>{teacher.length}</h1>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>No of Students</Card.Title>
            <Card.Text>
              <h1>{student.length}</h1>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Time</Card.Title>
            <Card.Text>
              <h1>{time}</h1>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <DBChart />
      </Container>
    </AdminDashBoardContainer>
  );
};

export default withAuth(DashBoard);
