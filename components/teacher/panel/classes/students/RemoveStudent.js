import { useFormik } from "formik";
import { useState } from "react";
import { Modal, Form, Button, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeStudent } from "@/helper/teacher/apicalls";
import Loading from "@/components/admin/Loading";
import {
  removeStudentState,
  setRefreshState,
} from "@/slices/teacher/classesSlice";

const RemoveStudent = ({ show, handleClose, data }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const id = useSelector((state) => state.teacherAuth.id);
  const token = useSelector((state) => state.teacherAuth.token);

  const formik = useFormik({
    initialValues: {
      srn: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await removeStudent(token, id, data.cid, data);

        if (!res.ok && res.error) {
          setLoading(false);
          setError(res.error);
          handleClose();
        } else {
          setLoading(false);
          setSuccess(true);
          dispatch(
            removeStudentState({
              id: data.cid,
              sid: data.id,
            })
          );
          dispatch(setRefreshState(true));
          formik.resetForm();
          handleClose();
        }
      } catch (error) {
        setLoading(false);
        setError("Internal server error");
        handleClose();
      }
    },
  });

  const { handleSubmit } = formik;

  return (
    <>
      <Toast
        onClose={() => setSuccess(false)}
        show={success}
        delay={3000}
        bg="success"
        autohide
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
        <Toast.Body>Student removed successfully</Toast.Body>
      </Toast>

      {loading && <Loading />}

      <Toast
        onClose={() => setError(null)}
        show={error}
        delay={3000}
        bg="danger"
        autohide
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove&nbsp;
            <span
              style={{
                fontWeight: "bold",
                color: "red",
              }}
            >
              {data.name} ({data.srn})
            </span>
            ?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={handleSubmit}>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="danger"
              type="submit"
              style={{
                marginLeft: "10px",
              }}
            >
              Yes
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveStudent;
