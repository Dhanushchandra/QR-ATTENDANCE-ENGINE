import { Button, Form, Modal, Toast } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Feedback from "react-bootstrap/Feedback";
import { createClass } from "@/helper/teacher/apicalls";
import { useDispatch, useSelector } from "react-redux";
import Loading from "@/components/admin/Loading";
import { addClass } from "@/slices/teacher/classesSlice";

const CreateClass = ({ show, handleClose }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  const id = useSelector((state) => state.teacherAuth.id);
  const token = useSelector((state) => state.teacherAuth.token);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required").min(3, "Too Short"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await createClass(token, values, id);

        if (!res.ok && res.error) {
          setLoading(false);
          setError(res.error);
          handleClose();
        } else {
          setLoading(false);
          setSuccess(true);
          dispatch(
            addClass({
              id: res.data.id,
              name: res.data.name,
              recentAttendance: res.data.recentAttendance,
              students: res.data.students,
            })
          );

          handleClose();
        }
      } catch (error) {
        setLoading(false);
        setError("Internal server error");
        handleClose();
      }
    },
  });

  const { errors, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <>
      {loading && <Loading />}

      <Toast
        onClose={() => setError(null)}
        show={error}
        delay={3000}
        autohide
        bg="danger"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
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
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Class created successfully</Toast.Body>
      </Toast>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Class Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.name}
              />
              <Feedback type="invalid">{errors.name}</Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Create
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateClass;
