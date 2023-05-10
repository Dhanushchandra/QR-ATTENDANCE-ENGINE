import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loading from "../../../../components/admin/Loading";
import Toast from "react-bootstrap/Toast";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteClass } from "@/helper/teacher/apicalls";
import { deleteClassState } from "@/slices/teacher/classesSlice";

const DeleteClass = ({ show, handleClose, data }) => {
  const id = useSelector((state) => state.teacherAuth.id);
  const token = useSelector((state) => state.teacherAuth.token);

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: data.name,
      cid: data.id,
    },
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const res = await deleteClass(token, id, values.cid);
        if (!res.ok && res.error) {
          setLoading(false);
          setError(res.error);
          handleClose();
        } else {
          setLoading(false);
          setSuccess(true);
          dispatch(deleteClassState({ id: values.cid }));
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

  const { handleSubmit, setValues } = formik;

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        cid: data.id,
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
          <Toast.Body>Teacher Deleted successfully</Toast.Body>
        </Toast>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <h5>
                Are you sure you want to delete{" "}
                <span
                  style={{
                    color: "green",
                  }}
                >
                  {data.name}
                </span>{" "}
                ?
              </h5>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger" type="submit">
                Delete
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteClass;
