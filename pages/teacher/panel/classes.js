import PanelLayout from "@/components/teacher/PanelLayout";
import CreateClass from "@/components/teacher/panel/classes/CreateClass";
import DeleteClass from "@/components/teacher/panel/classes/DeleteClass";
import withAuth from "@/components/teacher/withAuth";
import Loading from "@/components/admin/Loading";
import Head from "next/head";
import EditClasses from "@/components/teacher/panel/classes/EditClasses";

import { getClasses } from "@/helper/teacher/apicalls";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setClasses } from "@/slices/teacher/classesSlice";
import { Button, Form, Table, Toast } from "react-bootstrap";
import { ImBin } from "react-icons/im";
import { TeacherClassesPanelContainer } from "@/styles/teacher/panel";
import { AiOutlinePlus } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { useRouter } from "next/router";

const Classes = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const id = useSelector((state) => state.teacherAuth.id);
  const token = useSelector((state) => state.teacherAuth.token);
  const classes = useSelector((state) => state.teacherClasses.classes);

  const preload = async () => {
    try {
      setIsLoading(true);
      const res = await getClasses(token, id);
      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
      }
      setIsLoading(false);
      setSuccess(true);
      dispatch(setClasses(res.data));
    } catch (error) {
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    preload();
  }, [refresh]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredTeachers = classes.filter((c) =>
    c.name.toLowerCase().includes(searchTerm)
  );

  return (
    <PanelLayout>
      <Head>
        <title>Teacher | Classes</title>
      </Head>
      <TeacherClassesPanelContainer>
        {isLoading && <Loading />}

        <Toast
          onClose={() => setSuccess(false)}
          show={success}
          delay={3000}
          autohide
          bg="success"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Classes Loaded Successfully</Toast.Body>
        </Toast>

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

        <CreateClass
          show={show}
          handleClose={() => {
            setShow(false);
          }}
        />

        <EditClasses
          show={edit}
          data={selectedClass}
          handleClose={() => {
            setEdit(false);
          }}
        />

        <DeleteClass
          show={showDelete}
          data={selectedClass}
          handleClose={() => {
            setShowDelete(false);
          }}
        />

        <h1>Classes</h1>

        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Use class name to search"
            className="me-2"
            aria-label="Search"
            onChange={handleSearch}
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            style={{
              marginTop: "20px",
            }}
            size="xl"
            onClick={() => {
              setShow(true);
            }}
          >
            Add Class{" "}
            <AiOutlinePlus
              style={{
                marginLeft: "5px",
                color: "white",
              }}
              size={20}
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
              <th>No</th>
              <th>Class Name</th>
              <th>No of Students</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((c) => {
              return (
                <tr key={c.id}>
                  <td>{classes.findIndex((cl) => cl.id === c.id) + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.students.length}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        router.push(
                          `/teacher/panel/classes/${c.id}/attendance`
                        );
                      }}
                    >
                      Attendance
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        router.push(`/teacher/panel/classes/${c.id}/students`);
                      }}
                    >
                      Students
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setEdit(true);
                        setSelectedClass(c);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setShowDelete(true);
                        setSelectedClass(c);
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
      </TeacherClassesPanelContainer>
    </PanelLayout>
  );
};

export default withAuth(Classes);
