import Table from "react-bootstrap/Table";
import Loading from "@/components/admin/Loading";
import Form from "react-bootstrap/Form";
import CreatePopUpModals from "@/components/admin/panel/teachers/CreatePopUpModals";
import UpdatePopModals from "@/components/admin/panel/teachers/UpdatePopModals";
import DeletePopUpModals from "@/components/admin/panel/teachers/DeletePopUpModals";
import withAuth from "@/components/admin/withAuth";
import Button from "react-bootstrap/Button";

import { getTeachers } from "@/helper/admin/apicalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminTeachersPanelContainer } from "../../../styles/admin/panel";
import { ImBin } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { setAllTeachers } from "@/slices/admin/teacherSlice";
import { Toast } from "react-bootstrap";

const Teachers = () => {
  const id = useSelector((state) => state.adminAuth.id);
  const token = useSelector((state) => state.adminAuth.token);
  const teachers = useSelector((state) => state.adminTeacher.teachers);

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [deleteTeacher, setDeleteTeacher] = useState({
    show: false,
    tid: "",
    name: "",
    trn: "",
  });
  const [selectedTeacher, setSelectedTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    trn: "",
    department: "",
    id: "",
  });

  const preload = async () => {
    setLoading(true);
    try {
      const res = await getTeachers(id, token);
      if (!res.ok && res.error) {
        setLoading(false);
        setError(res.error);
      } else {
        setLoading(false);
        dispatch(setAllTeachers(res.data));
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

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm) ||
      teacher.trn.toLowerCase().includes(searchTerm)
  );

  const handleEdit = (teacher) => {
    setSelectedTeacher({
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      trn: teacher.trn,
      department: teacher.department,
      id: teacher.id,
    });
    setEdit(true);
  };

  return (
    <AdminTeachersPanelContainer>
      <h1>Teachers</h1>

      <UpdatePopModals
        show={edit}
        data={selectedTeacher}
        handleClose={() => setEdit(false)}
      />

      <CreatePopUpModals
        show={show}
        handleClose={() => {
          setShow(false);
        }}
      />

      <DeletePopUpModals
        show={deleteTeacher.show}
        handleClose={() => {
          setDeleteTeacher(false);
        }}
        data={deleteTeacher}
      />

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
            top: "10px",
            right: "10px",
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      )}

      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Use name or TRN to search"
          className="me-2"
          aria-label="Search"
          onChange={handleSearch}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
      <div className="btn-wrap">
        <Button
          variant="primary"
          onClick={() => {
            setShow(true);
          }}
          style={{ marginTop: "20px" }}
        >
          Add Teacher
          <AiOutlinePlus
            size={20}
            style={{
              marginLeft: "10px",
              marginBottom: "3px",
            }}
          />
        </Button>

        <Button
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
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>TRN</th>
            <th>Department</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.map((teacher) => {
            return (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>{teacher.trn}</td>
                <td>{teacher.department}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => {
                      handleEdit(teacher);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      marginLeft: "30px",
                    }}
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setDeleteTeacher({
                        show: true,
                        tid: teacher.id,
                        name: teacher.name,
                        trn: teacher.trn,
                      });
                    }}
                  >
                    <ImBin />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </AdminTeachersPanelContainer>
  );
};

export default withAuth(Teachers);
