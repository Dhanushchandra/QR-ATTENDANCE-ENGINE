import withAuth from "@/components/admin/withAuth";
import Loading from "@/components/admin/Loading";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";

import { FiRefreshCcw } from "react-icons/fi";
import { AdminStudentsPanelContainer } from "@/styles/admin/panel";
import { getAllStudents } from "@/helper/admin/apicalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllStudents } from "@/slices/admin/studentSlice";

const Students = () => {
  const id = useSelector((state) => state.adminAuth.id);
  const token = useSelector((state) => state.adminAuth.token);
  const students = useSelector((state) => state.adminStudent.students);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  const preload = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents(id, token);
      if (!res.ok && res.error) {
        setLoading(false);
        setError(res.error);
      } else {
        setLoading(false);
        dispatch(setAllStudents(res.data));
      }
    } catch (error) {
      setLoading(false);
      setError("Internal server error");
    }
  };

  useEffect(() => {
    preload();
  }, [refresh]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.srn.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      {loading && <Loading />}
      {error && (
        <Toast
          onClose={() => setError(null)}
          show={error ? true : false}
          delay={3000}
          autohide
          bg="danger"
          style={{
            position: "absolute",
            top: "10%",
            right: "10px",
            minWidth: "250px",
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      )}

      <AdminStudentsPanelContainer>
        <h1>Students</h1>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Use name or SRN to search"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Button
          className="float-end"
          variant="secondary"
          onClick={() => {
            setRefresh(!refresh);
          }}
          style={{ marginTop: "20px" }}
        >
          Refresh
          <FiRefreshCcw
            size={20}
            style={{
              marginLeft: "10px",
              marginBottom: "3px",
            }}
          />
        </Button>
        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>SRN</th>
              <th>Department</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.srn}</td>
                  <td>{student.department}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </AdminStudentsPanelContainer>
    </>
  );
};

export default withAuth(Students);
