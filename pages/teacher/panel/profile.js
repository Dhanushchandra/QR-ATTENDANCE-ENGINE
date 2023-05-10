import Form from "react-bootstrap/Form";
import PanelLayout from "@/components/teacher/PanelLayout";
import withAuth from "@/components/teacher/withAuth";

import { AdminProfileContainer } from "@/styles/admin/panel";
import { useFormik } from "formik";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const username = useSelector((state) => state.teacherAuth.user);
  const email = useSelector((state) => state.teacherAuth.email);
  const phone = useSelector((state) => state.teacherAuth.phone);
  const department = useSelector((state) => state.teacherAuth.department);

  const [edit, setEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: username,
      email: email,
      phone: phone,
      department: department,
    },
  });

  const { handleSubmit, handleChange, handleBlur, values } = formik;

  return (
    <PanelLayout>
      <AdminProfileContainer>
        <h1>Profile</h1>
        <Form onSubmit={handleSubmit}>
          <FaUserAlt className="profile-icon" />

          <Form.Group controlId="userName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              value={values.username}
              disabled={!edit}
              onChange={handleChange}
              onBlur={handleBlur}
              name="username"
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={values.email}
              disabled={!edit}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
            />
          </Form.Group>
          <Form.Group controlId="organization">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter organization"
              value={values.department}
              disabled={!edit}
              onChange={handleChange}
              onBlur={handleBlur}
              name="department"
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter organization"
              value={values.phone}
              disabled={!edit}
              onChange={handleChange}
              onBlur={handleBlur}
              name="phone"
            />
          </Form.Group>
          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control type="text" disabled value={"Admin"}></Form.Control>
          </Form.Group>
          <div className="float-end">
            <p>
              <a
                href="/teacher/forgot-password"
                style={{
                  color: "#007074",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Change password
              </a>
            </p>
          </div>
        </Form>
      </AdminProfileContainer>
    </PanelLayout>
  );
};

export default withAuth(Profile);
