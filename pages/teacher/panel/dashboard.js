import PanelLayout from "@/components/teacher/PanelLayout";
import DBChart from "@/components/teacher/panel/dashboard/DBChart";
import Card from "react-bootstrap/Card";
import Loading from "@/components/admin/Loading";
import withAuth from "@/components/teacher/withAuth";

import { AdminDashBoardContainer } from "@/styles/admin/panel";
import { useEffect, useState } from "react";
import { setClasses } from "@/slices/teacher/classesSlice";
import { getClasses } from "@/helper/teacher/apicalls";
import { Container, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const DashBoard = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const organization = useSelector((state) => state.adminAuth.organization);
  const id = useSelector((state) => state.teacherAuth.id);
  const token = useSelector((state) => state.teacherAuth.token);

  const dispatch = useDispatch();

  const preload = async () => {
    try {
      setIsLoading(true);
      const res = await getClasses(token, id);
      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
      }
      setIsLoading(false);
      setSuccess(true);
      dispatch(setClasses(res.data));
    } catch (error) {
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    preload();
  }, []);

  const noOfClasses = useSelector(
    (state) => state.teacherClasses.classes
  ).length;

  var noOfAttendance = 0;

  const classes = useSelector((state) => state.teacherClasses.classes);

  for (let i = 0; i < classes.length; i++) {
    noOfAttendance += classes[i].recentAttendance.length;
  }

  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <PanelLayout>
      {isLoading && <Loading />}

      <Toast
        onClose={() => setSuccess(false)}
        show={success}
        delay={3000}
        autohide
        bg="success"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "9999",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Dashboard loaded successfully</Toast.Body>
      </Toast>

      <Toast
        onClose={() => setError(null)}
        show={error}
        delay={3000}
        autohide
        bg="danger"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "9999",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>

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
              <Card.Title>No of classes</Card.Title>
              <Card.Text>
                <h1>{noOfClasses}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>No of Attendance</Card.Title>
              <Card.Text>
                <h1>{noOfAttendance}</h1>
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
    </PanelLayout>
  );
};

export default withAuth(DashBoard);
