import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loading from "../../Loading";
import Toast from "react-bootstrap/Toast";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteTeacher } from "@/helper/admin/apicalls";
import { deleteTeacherState } from "@/slices/admin/teacherSlice";

const DeletePopUpModals = ({ show, handleClose, data }) => {
  const id = useSelector((state) => state.adminAuth.id);
  const token = useSelector((state) => state.adminAuth.token);

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      tid: data.tid,
      name: data.name,
      trn: data.trn,
    },
    onSubmit: async (values) => {
      console.log("Delete teacher", values.tid);
      setLoading(true);

      try {
        const res = await deleteTeacher(id, token, values.tid);
        if (!res.ok && res.error) {
          setLoading(false);
          setError(res.error);
          handleClose();
        } else {
          setLoading(false);
          setSuccess(true);
          dispatch(
            deleteTeacherState({
              id: values.tid,
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

  const { handleSubmit, setValues } = formik;

  useEffect(() => {
    if (data) {
      setValues({
        tid: data.tid,
        name: data.name,
        trn: data.trn,
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
          <Modal.Title>Delete Teacher</Modal.Title>
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
                with TRN &nbsp;
                <span
                  style={{
                    color: "green",
                  }}
                >
                  {data.trn}
                </span>
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

export default DeletePopUpModals;
