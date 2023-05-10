import Head from "next/head";
import Loading from "@/components/admin/Loading";
import AddStudent from "@/components/teacher/panel/classes/students/AddStudent";
import RemoveStudent from "@/components/teacher/panel/classes/students/RemoveStudent";
import withAuth from "@/components/teacher/withAuth";
import Sidebar from "@/components/teacher/PanelLayout";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStudents } from "@/helper/teacher/apicalls";
import {
  setStudentsState,
  setRefreshState,
} from "@/slices/teacher/classesSlice";
import { Button, Form, Table, Toast } from "react-bootstrap";
import { ImBin } from "react-icons/im";
import { TeacherClassStudentsPanelContainer } from "@/styles/teacher/panel";

const ClassPage = () => {
  const router = useRouter();
  const cid = router.query.cid;

  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showDeleteStudent, setShowDeleteStudent] = useState({
    show: false,
    data: null,
  });
  const [classStudents, setClassStudents] = useState({
    id: "",
    name: "",
    students: [],
  });

  const id = useSelector((state) => state.teacherAuth.id);
  const token = useSelector((state) => state.teacherAuth.token);
  const classes = useSelector((state) => state.teacherClasses.classes);
  const refreshState = useSelector((state) => state.teacherClasses.refresh);

  const selectedClass = classes.find((c) => c.id === cid);

  const preload = async () => {
    try {
      setIsLoading(true);
      const res = await getStudents(token, id, cid);

      if (!res.ok && res.error) {
        dispatch(setRefreshState(false));
        setIsLoading(false);
        setError(res.error);
      }
      setIsLoading(false);
      dispatch(setRefreshState(false));
      setSuccess(true);
      dispatch(setStudentsState({ id: cid, students: res.data.students }));
      setClassStudents({
        id: cid,
        name: selectedClass.name,
        students: res.data.students,
      });
    } catch (error) {
      setIsLoading(false);
      dispatch(setRefreshState(false));
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    if (cid) {
      preload();
    }
  }, [refresh, cid, refreshState]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredStudents =
    classStudents?.students?.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.srn.toLowerCase().includes(searchTerm)
    ) || [];

  return (
    <Sidebar>
      <Head>
        <title>Class Students | Teacher | LMS</title>
      </Head>

      <AddStudent
        show={showAddStudent}
        handleClose={() => setShowAddStudent(false)}
        data={{ cid: classStudents.id }}
      />

      <RemoveStudent
        show={showDeleteStudent.show}
        handleClose={() =>
          setShowDeleteStudent({
            show: false,
          })
        }
        data={{
          cid: classStudents.id,
          name: showDeleteStudent.data?.name,
          id: showDeleteStudent.data?.id,
          srn: showDeleteStudent.data?.srn,
        }}
      />

      <TeacherClassStudentsPanelContainer>
        {isLoading && <Loading />}

        {/* <Toast
          onClose={() => setSuccess(false)}
          show={success}
          delay={3000}
          bg="success"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          autohide
          className="success-toast"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Students Loaded Successfully</Toast.Body>
        </Toast> */}

        <Toast
          onClose={() => setError(null)}
          show={error}
          delay={3000}
          bg="danger"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          autohide
          className="error-toast"
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>

        <h1>{classStudents.name}</h1>

        <Form className="d-flex mb-3">
          <Form.Control
            type="search"
            placeholder="Use Name or SRN to search"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => setShowAddStudent(true)}
          >
            Add Student
          </Button>
          <Button
            variant="secondary"
            className="mb-3 ms-3"
            onClick={() => setRefresh(!refresh)}
          >
            Refresh
          </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>SRN</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.srn}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.department}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() =>
                      setShowDeleteStudent({
                        show: true,
                        data: student,
                      })
                    }
                  >
                    <ImBin />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TeacherClassStudentsPanelContainer>
    </Sidebar>
  );
};

export default withAuth(ClassPage);
