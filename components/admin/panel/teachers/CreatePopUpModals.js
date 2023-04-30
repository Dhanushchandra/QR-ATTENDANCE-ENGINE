import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Feedback from "react-bootstrap/Feedback";
import Loading from "../../Loading";
import Toast from "react-bootstrap/Toast";

import { useFormik } from "formik";
import { createTeacherValidationSchema } from "@/helper/admin/validationSchema";
import { createTeacher } from "@/helper/admin/apicalls";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTeacher } from "@/slices/admin/teacherSlice";

const CreatePopUpModals = ({ show, handleClose }) => {
  const id = useSelector((state) => state.adminAuth.id);
  const token = useSelector((state) => state.adminAuth.token);

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      trn: "",
      department: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: createTeacherValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const res = await createTeacher(id, token, values);

        if (!res.ok && res.error) {
          if (res.isExist) {
            setLoading(false);
            formik.setErrors({ email: "Email already exist" });
            return;
          }
          if (res.isTrnExist) {
            setLoading(false);
            formik.setErrors({ trn: "TRN already exist" });
            return;
          }
          setLoading(false);
          setError(res.error);
          handleClose();
        } else {
          setLoading(false);
          setSuccess(true);
          dispatch(
            addTeacher({
              ...values,
              _id: res.data._id,
            })
          );
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

  const { handleSubmit, handleChange, handleBlur, errors, values, touched } =
    formik;

  const handleModalClose = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <>
      {loading && <Loading />}
      {error && (
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
            zIndex: 1,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Teacher created successfully</Toast.Body>
        </Toast>
      )}
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Teacher</Modal.Title>
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
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
              />
              <Feedback type="invalid">{errors.password}</Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
              />
              <Feedback type="invalid">{errors.confirmPassword}</Feedback>
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

export default CreatePopUpModals;
