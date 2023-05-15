import Sidebar from "@/components/teacher/PanelLayout";
import Loading from "@/components/admin/Loading";
import withAuth from "@/components/teacher/withAuth";

import { useRouter } from "next/router";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Toast,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ImBin } from "react-icons/im";
import {
  addStudentToAttendance,
  getStudentsInAttendance,
  removeStudentFromAttendance,
} from "@/helper/teacher/apicalls";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { QrAttendanceContainer } from "@/styles/teacher/panel";
import { handleDownloadExcel } from "@/helper/teacher/excelDownload";
import Head from "next/head";

function ClassPage() {
  const router = useRouter();
  const { cid } = router.query;

  const [qrcode, setQrcode] = useState("");
  const [socket, setSocket] = useState(null);
  const [success, setSuccess] = useState({
    status: false,
    message: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showRemoveAttendance, setShowRemoveAttendance] = useState(false);
  const [removeStudent, setRemoveStudent] = useState({
    name: "",
    id: "",
    srn: "",
  });
  const [className, setClassName] = useState("Attendance");

  const token = useSelector((state) => state.teacherAuth.token);
  const id = useSelector((state) => state.teacherAuth.id);
  const classes = useSelector((state) => state.teacherClasses.classes);

  const formik = useFormik({
    initialValues: {
      srn: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await addStudentToAttendance(token, id, cid, values);
        if (!res.ok && res.error) {
          setIsLoading(false);
          setError(res.error);
        } else {
          setIsLoading(false);
          setSuccess({
            status: true,
            message: "Student Added Successfully",
          });
          fetchStudents();
          setError(null);
          formik.resetForm();
        }
      } catch (err) {
        setIsLoading(false);
        setError("Internal Server Error");
      }
    },
  });

  const handleQrWebSocket = () => {
    try {
      var socket = new WebSocket(
        `${process.env.NEXT_PUBLIC_TEACHER_WS}/generate-qr`
      );

      var pollingSocket = new WebSocket(
        `${process.env.NEXT_PUBLIC_TEACHER_WS}/attendance`
      );

      const data = {
        id: id,
        cid: cid,
      };

      socket.addEventListener("open", function (event) {
        socket.send(JSON.stringify(data));
        setSuccess({
          status: true,
          message: "QR Code Generated Started",
        });
      });
      socket.addEventListener("message", function (event) {
        setQrcode(event.data);
      });
      setSocket(socket);

      //polling
      pollingSocket.addEventListener("open", function (event) {
        pollingSocket.send(JSON.stringify(data));
      });
      pollingSocket.addEventListener("message", function (event) {
        setStudents(JSON.parse(event.data));
      });
    } catch (err) {
      console.log(err);
    }
  };

  const stopQrWebSocket = () => {
    if (socket) {
      socket.close();
      setSocket(null);
      setQrcode("");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students?.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.srn.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const fetchStudents = async () => {
    try {
      const res = await getStudentsInAttendance(token, id, cid);
      if (!res.ok && res.error) {
        setError(res.error);
      } else {
        setStudents(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAttendance = async (e, student) => {
    e.preventDefault();
    try {
      const res = await removeStudentFromAttendance(
        token,
        id,
        cid,
        student.srn
      );
      if (!res.ok && res.error) {
        setError(res.error);
      } else {
        setSuccess({
          status: true,
          message: "Student Removed Successfully",
        });
        setError(null);
        setShowRemoveAttendance(false);
        fetchStudents();
      }
    } catch (error) {
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    if (qrcode) {
      fetchStudents();
    }
  }, [qrcode]);

  useEffect(() => {
    const classObj = classes.find((c) => c.id === cid);
    setClassName(classObj?.name);
  }, [cid]);

  const { handleSubmit } = formik;

  return (
    <Sidebar>
      <Head>
        <title>Attendance | {className}</title>
      </Head>

      <QrAttendanceContainer>
        <Toast
          onClose={() =>
            setSuccess({
              status: false,
            })
          }
          show={success.status}
          delay={3000}
          autohide
          bg="success"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: "999",
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>{success.message}</Toast.Body>
        </Toast>

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
            right: "10px",
            zIndex: "999",
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>

        <Modal
          show={showRemoveAttendance}
          onHide={() => setShowRemoveAttendance(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Remove Attendance of&nbsp;
              <span
                style={{
                  color: "red",
                }}
              >
                {removeStudent.name} ({removeStudent.srn})
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowRemoveAttendance(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={(e) => handleRemoveAttendance(e, removeStudent)}
            >
              Remove
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="t-wrap">
          <h1>{className}</h1>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Form className="d-flex mb-3" onSubmit={handleSubmit}>
              <Form.Control
                style={{
                  width: "400px",
                }}
                type="text"
                placeholder="Add Student by SRN"
                className="me-2"
                name="srn"
                onChange={formik.handleChange}
                value={formik.values.srn}
              />
              <Button variant="warning" type="submit">
                ADD
              </Button>
            </Form>
            {socket ? (
              <Button
                variant="danger"
                className="mb-3"
                onClick={stopQrWebSocket}
              >
                Stop QR Code
              </Button>
            ) : (
              <Button
                variant="primary"
                className="mb-3"
                onClick={handleQrWebSocket}
              >
                Generate Qr Code
              </Button>
            )}
          </div>
        </div>
        <Container className="q-wrap">
          <Row>
            <Col sm={8}>
              <div
                style={{
                  width: "100%",
                  marginLeft: "auto",
                  backgroundColor: "white",
                }}
              >
                <QRCodeSVG
                  style={{
                    width: "100%",
                    height: "65vh",
                  }}
                  value={qrcode}
                  size="300"
                  level="Q"
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  renderAs="svg"
                />
              </div>
            </Col>
            <Col sm={4}>
              <Form className="d-flex mb-3">
                <Form.Control
                  type="search"
                  placeholder="Use Name or SRN to search"
                  className="me-2"
                  aria-label="Search"
                  onChange={handleSearch}
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <div style={{ maxHeight: "55vh", overflowY: "scroll" }}>
                <Table striped bordered hover>
                  <thead>
                    <tr
                      style={{
                        position: "sticky",
                        top: "0",
                        backgroundColor: "white",
                      }}
                    >
                      <th>#</th>
                      <th>Student Name</th>
                      <th>SRN</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.length <= 0
                      ? null
                      : filteredStudents
                          ?.slice()
                          .reverse()
                          .map((student, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{student.name}</td>
                              <td>{student.srn}</td>
                              <td>
                                <Button
                                  variant="danger"
                                  onClick={(e) => {
                                    setRemoveStudent(student);
                                    setShowRemoveAttendance(true);
                                  }}
                                >
                                  <ImBin />
                                </Button>
                              </td>
                            </tr>
                          ))}
                  </tbody>
                </Table>
              </div>
              {students?.length <= 0 ? (
                <h3
                  style={{
                    textAlign: "center",
                    color: "gray",
                  }}
                >
                  No students scanned yet.
                </h3>
              ) : null}
              <Button
                onClick={() => handleDownloadExcel(students)}
                variant="success"
                style={{
                  marginTop: "10px",
                }}
              >
                Download Excel
              </Button>
            </Col>
          </Row>
        </Container>
      </QrAttendanceContainer>
    </Sidebar>
  );
}

export default withAuth(ClassPage);
