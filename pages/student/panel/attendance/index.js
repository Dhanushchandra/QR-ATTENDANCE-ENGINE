import StudentNavbar from "@/components/student/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentClasses } from "@/helper/student/apicalls";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setClassesState } from "@/slices/student/classesSlice";
import { Button, Card, Col, Container, Row, Toast } from "react-bootstrap";
import Loading from "@/components/admin/Loading";
import Head from "next/head";
import withAuth from "@/components/student/withAuth";

const AllClasses = () => {
  const token = useSelector((state) => state.studentAuth.token);
  const id = useSelector((state) => state.studentAuth.id);

  const dispatch = useDispatch();
  const router = useRouter();

  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  useEffect(() => {
    preload();
  }, []);

  return (
    <StudentNavbar>
      <Head>
        <title>Student | Attendance</title>
      </Head>

      {isLoading && <Loading />}

      <Toast
        onClose={() => setError(null)}
        show={error}
        delay={3000}
        autohide
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
        bg="danger"
        className="text-white"
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
          right: "10px",
        }}
        className="text-white"
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Class Loaded Successfully</Toast.Body>
      </Toast>

      <Container>
        <h3
          style={{
            color: "#007074",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
          }}
        >
          Attendance Record
        </h3>
        <Row
          style={{
            marginTop: "2rem",
          }}
        >
          {classes?.map((c) => (
            <Col
              md={4}
              key={c._id}
              style={{
                marginBottom: "2rem",
              }}
            >
              <Card
                style={{
                  boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                }}
              >
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Card.Title
                    style={{
                      alignSelf: "center",
                      marginTop: "6px",
                    }}
                  >
                    {c.className}
                  </Card.Title>
                  <Button
                    variant="primary"
                    onClick={() => {
                      router.push(`/student/panel/attendance/${c.classId}`);
                    }}
                  >
                    View
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </StudentNavbar>
  );
};

export default withAuth(AllClasses);
