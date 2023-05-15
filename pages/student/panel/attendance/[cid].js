import { getStudentAttendanceByClassId } from "@/helper/student/apicalls";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Col, Container, Row, Toast } from "react-bootstrap";
import Loading from "@/components/admin/Loading";
import StudentNavbar from "@/components/student/NavBar";
import Head from "next/head";
import withAuth from "@/components/student/withAuth";

const AttendanceReport = () => {
  const token = useSelector((state) => state.studentAuth.token);
  const id = useSelector((state) => state.studentAuth.id);
  const classes = useSelector((state) => state.studentClasses.classes);

  const router = useRouter();

  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [className, setClassName] = useState("Attendance Report");

  const { cid } = router.query;

  const preload = async () => {
    try {
      setIsLoading(true);
      const res = await getStudentAttendanceByClassId(token, id, cid);

      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
      } else {
        setIsLoading(false);
        setAttendance(res.data);
        setSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    preload();
    const classObj = classes.find((c) => c.classId === cid);
    setClassName(classObj?.className);
  }, [cid]);

  const dateHandler = (date) => {
    const d = new Date(date);

    //time
    const time = d.toLocaleTimeString();
    const timeArr = time.split(":");
    const hours = timeArr[0];
    const minutes = timeArr[1];

    const ampm = hours >= 12 ? "pm" : "am";

    //date

    const dateArr = d.toDateString().split(" ");

    const day = dateArr[2];

    const month = dateArr[1];

    const year = dateArr[3];

    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <StudentNavbar>
      <Head>
        <title>{className} | Student | Attendance Report</title>
      </Head>

      <h3
        style={{
          color: "#007074",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
        }}
      >
        {className}
      </h3>

      {isLoading && <Loading />}
      <Toast
        onClose={() => setError(null)}
        show={error}
        delay={3000}
        autohide
        bg="danger"
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          zIndex: 100,
          backgroundColor: "red",
          color: "white",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>

      <Toast
        onClose={() => setSuccess(false)}
        show={success}
        delay={3000}
        autohide
        bg="success"
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          zIndex: 100,
          backgroundColor: "green",
          color: "white",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Attendance Fetched Successfully</Toast.Body>
      </Toast>

      <Container
        style={{
          marginTop: "2rem",
        }}
      >
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Attendance Report</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Attendance Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((att) => (
                        <tr key={att._id}>
                          <td>{dateHandler(att.date)}</td>
                          <td>{att.attendanceId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </StudentNavbar>
  );
};

export default withAuth(AttendanceReport);
