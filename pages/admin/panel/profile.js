import withAuth from "@/components/admin/withAuth";
import Form from "react-bootstrap/Form";

import { AdminProfileContainer } from "@/styles/admin/panel";
import { useFormik } from "formik";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const username = useSelector((state) => state.adminAuth.user);
  const email = useSelector((state) => state.adminAuth.email);
  const organization = useSelector((state) => state.adminAuth.organization);

  const [edit, setEdit] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: username,
      email: email,
      organization: organization,
    },
  });

  const { handleSubmit, handleChange, handleBlur, values } = formik;

  return (
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
          <Form.Label>Organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter organization"
            value={values.organization}
            disabled={!edit}
            onChange={handleChange}
            onBlur={handleBlur}
            name="organization"
          />
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" disabled value={"Admin"}></Form.Control>
        </Form.Group>
        <div className="float-end">
          <p>
            <a
              href="/admin/forgot-password"
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
  );
};

export default withAuth(Profile);
