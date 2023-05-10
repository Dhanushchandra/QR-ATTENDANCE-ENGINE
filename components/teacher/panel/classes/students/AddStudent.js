import { useFormik } from "formik";
import { useState } from "react";
import { Modal, Form, Button, Toast } from "react-bootstrap";
import Feedback from "react-bootstrap/Feedback";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addStudent } from "@/helper/teacher/apicalls";
import Loading from "@/components/admin/Loading";
import {
  addStudentState,
  setRefreshState,
} from "@/slices/teacher/classesSlice";

const AddStudent = ({ show, handleClose, data }) => {
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
    validationSchema: Yup.object({
      srn: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await addStudent(token, id, data.cid, values);

        if (!res.ok && res.error) {
          setLoading(false);
          setError(res.error);
          handleClose();
        } else {
          setLoading(false);
          setSuccess(true);
          dispatch(
            addStudentState({
              id: data.cid,
              student: res.data.student,
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

  const { handleSubmit, handleChange, errors, handleBlur, touched } = formik;

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <div>
      <Toast
        onClose={() => setSuccess(false)}
        show={success}
        delay={3000}
        autohide
        bg="success"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Student added successfully</Toast.Body>
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
          top: 20,
          right: 20,
          zIndex: 1,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>

      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Student SRN</Form.Label>
              <Form.Control
                type="text"
                name="srn"
                placeholder="Enter Student SRN"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.srn && errors.srn}
              />
              <Feedback type="invalid">{errors.srn}</Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Add
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddStudent;
