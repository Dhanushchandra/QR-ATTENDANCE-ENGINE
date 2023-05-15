import Loading from "@/components/admin/Loading";
import StudentNavbar from "@/components/student/NavBar";
import {
  getAllStudentClasses,
  getAttendancePercentage,
} from "@/helper/student/apicalls";
import { setClassesState } from "@/slices/student/classesSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "@/components/student/withAuth";

const Index = () => {
  const token = useSelector((state) => state.studentAuth.token);
  const id = useSelector((state) => state.studentAuth.id);
  const classesState = useSelector((state) => state.studentClasses);

  const dispatch = useDispatch();

  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [attendancePercentage, setAttendancePercentage] = useState({
    percentage: 0,
    totalClasses: 0,
    attendedClasses: 0,
  });

  const preload = async () => {
    try {
      setIsLoading(true);
      const res = await getAllStudentClasses(token, id);

      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
      } else {
        setIsLoading(false);
        setClasses(res.data);
        setSuccess(true);
        dispatch(
          setClassesState({
            classes: res.data,
          })
        );
      }
    } catch (error) {
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  const preloadAttendance = async () => {
    try {
      setIsLoading(true);
      const res = await getAttendancePercentage(token, id);
      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
      } else {
        setIsLoading(false);
        setSuccess(true);
        setAttendancePercentage({
          percentage: res.data.percentage,
          totalClasses: res.data.total,
          attendedClasses: res.data.attended,
        });
      }
    } catch (error) {
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    preload();
    preloadAttendance();
  }, []);

  return (
    <StudentNavbar>
      {isLoading && <Loading />}

      <Head>
        <title>Student Panel</title>
      </Head>

      <h3
        style={{
          color: "#007074",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
        }}
      >
        Student Panel
      </h3>
      <Container>
        <Row>
          <Col xs={12} md={6} className="mt-3 mt-md-0">
            <Card>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#007074",
                  }}
                >
                  Classes
                </Card.Title>
                <Card.Text>
                  View your classes and scan QR code to mark attendance.
                </Card.Text>
                <Card.Link href="/student/panel/classes">
                  View Classes
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} className="mt-3 mt-md-0">
            <Card>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#007074",
                  }}
                >
                  Attendance Report
                </Card.Title>
                <Card.Text>
                  View your attendance report for all classes.
                </Card.Text>
                <Card.Link href="/student/panel/attendance">
                  View Attendance Report
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} className="mt-3 ">
            <Card>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#007074",
                  }}
                >
                  No of classes: &nbsp;
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    {classesState.classes.length}
                  </span>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} className="mt-3  mb-2">
            <Card>
              <Card.Body>
                <Card.Title
                  style={{
                    color: "#007074",
                  }}
                >
                  Attendance Percentage
                </Card.Title>
                <Card.Text>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Total Classes</th>
                        <th>Attended Classes</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{attendancePercentage.totalClasses}</td>
                        <td>{attendancePercentage.attendedClasses}</td>
                        <td>{attendancePercentage.percentage}%</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </StudentNavbar>
  );
};

export default withAuth(Index);
