import PanelLayout from "@/components/teacher/PanelLayout";
import withAuth from "@/components/teacher/withAuth";

import {
  getAttendance,
  addStudentToAttendanceById,
  removeStudentFromAttendanceById,
} from "@/helper/teacher/apicalls";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Toast,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { ImBin } from "react-icons/im";
import { useFormik } from "formik";

const Attendance = () => {
  const router = useRouter();

  const cid = router.query.cid;
  const attId = router.query.aid;

  const id = useSelector((state) => state.teacherAuth.id);
  const token = useSelector((state) => state.teacherAuth.token);

  const [attendance, setAttendance] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState({
    status: false,
    message: "",
  });
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState({
    status: false,
    srn: "",
  });

  const formik = useFormik({
    initialValues: {
      srn: "",
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const res = await addStudentToAttendanceById(
          token,
          id,
          cid,
          attId,
          values.srn
        );
        if (!res.ok && res.error) {
          setIsLoading(false);
          setError(res.error);
          setShowAdd(false);
        } else {
          setIsLoading(false);
          setSuccess({
            status: true,
            message: "Student Added Successfully",
          });
          setShowAdd(false);
          preload();
        }
      } catch (error) {
        setShowAdd(false);
        setIsLoading(false);
        setError("Internal Server Error");
      }
    },
  });

  const { handleSubmit, handleChange } = formik;

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await removeStudentFromAttendanceById(
        token,
        id,
        cid,
        attId,
        showDelete.srn
      );
      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
        setShowDelete({
          status: false,
          srn: "",
        });
      } else {
        setIsLoading(false);
        setSuccess({
          status: true,
          message: "Student Removed Successfully",
        });
        setShowDelete({
          status: false,
          srn: "",
        });
        preload();
      }
    } catch (error) {
      setIsLoading(false);
      setShowDelete({
        status: false,
        srn: "",
      });
      setError("Internal Server Error");
    }
  };

  const preload = async () => {
    try {
      setIsLoading(true);
      const res = await getAttendance(token, id, cid, attId);
      console.log(res);
      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
      } else {
        setIsLoading(false);
        setAttendance(res.data);
      }
    } catch (error) {
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    if (cid && attId) {
      preload();
    }
  }, [cid, attId]);

  const dateHandler = (date) => {
    const d = new Date(date);

    const time = d.toLocaleTimeString();

    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${time}`;
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredStudents =
    attendance.students &&
    attendance.students.filter((s) => {
      return (
        s.studentId.name.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId.srn.toLowerCase().includes(search.toLowerCase())
      );
    });

  return (
    <PanelLayout>
      <Toast
        onClose={() => setSuccess({ status: false, message: "" })}
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

      <Toast
        onClose={() => setError(null)}
        show={error ? true : false}
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

      <Modal show={showAdd} onHide={() => setShowAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>SRN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter SRN"
                name="srn"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAdd(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDelete.status}
        onHide={() =>
          setShowDelete({
            status: false,
          })
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to remove {setShowDelete.srn}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              setShowDelete({
                status: false,
              })
            }
          >
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <Row>
          <div>
            <h1
              style={{
                textAlign: "center",
                marginTop: "30px",
                color: "#007074",
                marginBottom: "30px",
              }}
            >
              {dateHandler(attendance.date)}
            </h1>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Use name or srn to search"
                className="me-2 mb-3"
                aria-label="Search"
                onChange={handleSearch}
              />
              <Button variant="outline-success" className="mb-3">
                Search
              </Button>
            </Form>
            <Button
              variant="success"
              className="mb-3"
              style={{ marginLeft: "auto" }}
              onClick={() => setShowAdd(true)}
            >
              Add Student
            </Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr
                style={{
                  backgroundColor: "#007074",
                  color: "white",
                }}
              >
                <th>#</th>
                <th>Student Name</th>
                <th>Roll No.</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {attendance.students &&
                filteredStudents.map((s, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{s.studentId.name}</td>
                      <td>{s.studentId.srn}</td>
                      <td>{s.studentId.phone}</td>
                      <td>{s.studentId.email}</td>
                      <td
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Button
                          variant="danger"
                          onClick={() =>
                            setShowDelete({
                              status: true,
                              srn: s.studentId.srn,
                            })
                          }
                        >
                          <ImBin />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </PanelLayout>
  );
};

export default withAuth(Attendance);
