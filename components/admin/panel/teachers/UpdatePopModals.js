import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Feedback from "react-bootstrap/Feedback";
import Loading from "@/components/admin/Loading";
import Toast from "react-bootstrap/Toast";

import { useFormik } from "formik";
import { updateTeacher } from "@/helper/admin/apicalls";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateTeacherState } from "@/slices/admin/teacherSlice";
import { updateTeacherValidationSchema } from "@/helper/admin/validationSchema";

const UpdatePopModals = ({ show, handleClose, data }) => {
  const id = useSelector((state) => state.adminAuth.id);
  const token = useSelector((state) => state.adminAuth.token);

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      trn: data.trn,
      department: data.department,
      tid: data.id,
    },
    validationSchema: updateTeacherValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await updateTeacher(id, token, values, data.id);
        if (!res.ok && res.error) {
          setLoading(false);
          setError(res.error);
          handleClose();
        } else {
          setLoading(false);
          setSuccess(true);
          dispatch(
            updateTeacherState({
              ...values,
              id: data.id,
            })
          );
          handleClose();
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Internal server error");
        handleClose();
      }
    },
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values,
    setValues,
  } = formik;

  const handleModalClose = () => {
    handleClose();
  };

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        email: data.email,
        phone: data.phone,
        trn: data.trn,
        department: data.department,
        tid: data.id,
      });
    }
  }, [data]);

  return (
    <>
      {loading && <Loading />}

      {error && (
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
            minWidth: 200,
            zIndex: 100,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      )}

      {success && (
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
            minWidth: 200,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Teacher updated successfully</Toast.Body>
        </Toast>
      )}

      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && errors.name}
              />
              <Feedback type="invalid">{errors.name}</Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && errors.email}
              />
              <Feedback type="invalid">{errors.email}</Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && errors.phone}
              />
              <Feedback type="invalid">{errors.phone}</Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="trn">
              <Form.Label>TRN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter TRN"
                value={values.trn}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.trn && errors.trn}
              />
              <Feedback type="invalid">{errors.trn}</Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department"
                value={values.department}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.department && errors.department}
              />
              <Feedback type="invalid">{errors.department}</Feedback>
            </Form.Group>

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdatePopModals;
