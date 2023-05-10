import Loading from "@/components/admin/Loading";
import withAuth from "@/components/teacher/withAuth";
import PanelLayout from "@/components/teacher/PanelLayout";

import { getAllAttendance, deleteAttendance } from "@/helper/teacher/apicalls";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Toast,
} from "react-bootstrap";
import { ImBin } from "react-icons/im";

const AttendanceStats = () => {
  const router = useRouter();

  const cid = router.query.cid;

  const id = useSelector((state) => state.teacherAuth.id);
  const token = useSelector((state) => state.teacherAuth.token);

  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState({
    status: false,
    message: "",
  });
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});

  const preload = async () => {
    setIsLoading(true);
    try {
      const res = await getAllAttendance(token, id, cid);

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

  const deleteHandler = async (attId) => {
    try {
      setIsLoading(true);
      const res = await deleteAttendance(token, id, cid, attId);
      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
      } else {
        setIsLoading(false);
        setSuccess({
          status: true,
          message: "Attendance deleted successfully",
        });
        preload();
      }
    } catch (error) {
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    if (cid) {
      preload();
    }
  }, [cid]);

  const dateHandler = (date) => {
    const d = new Date(date);

    const time = d.toLocaleTimeString();

    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${time}`;
  };

  return (
    <PanelLayout>
      {isLoading && <Loading />}

      <Toast
        show={success.status}
        onClose={() => setSuccess({ status: false, message: "" })}
        bg="success"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "999",
          minWidth: "200px",
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{success.message}</Toast.Body>
      </Toast>

      <Toast
        show={error}
        onClose={() => setError(null)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "999",
          minWidth: "200px",
        }}
        delay={3000}
        autohide
        bg="danger"
        text="white"
      >
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>

      <Modal show={showDelete} onHide={() => setShowDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {dateHandler(deleteItem.date)}{" "}
          attendance?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowDelete(false);
              deleteHandler(deleteItem._id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <h1
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "#007074",
          }}
        >
          Attendance Reports
        </h1>
        <Row>
          {attendance
            .slice()
            .reverse()
            .map((a) => {
              return (
                <Col>
                  <Card style={{ width: "18rem", marginTop: "30px" }}>
                    <Card.Body>
                      <Card.Title>{dateHandler(a.date)}</Card.Title>
                      <Card.Text>
                        No of students present: {a.students.length}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => {
                          router.push(
                            `/teacher/panel/classes/${cid}/attendance-stats/${a._id}`
                          );
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="danger"
                        className="m-2"
                        onClick={() => {
                          setShowDelete(true);
                          setDeleteItem(a);
                        }}
                      >
                        <ImBin />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
    </PanelLayout>
  );
};

export default withAuth(AttendanceStats);
