import Head from "next/head";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Feedback from "react-bootstrap/Feedback";
import Loading from "@/components/admin/Loading";
import Toast from "react-bootstrap/Toast";
import ParticlesBackground from "@/components/admin/ParticlesBackground";

import { AdminSignupContainer } from "../../styles/admin";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setAuth } from "@/slices/admin/authSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signUpValidationSchema } from "../../helper/admin/validationSchema";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      organization: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.username,
              email: values.email,
              organization: values.organization,
              password: values.password,
              confirmPassword: values.confirmPassword,
            }),
          }
        );

        const resdata = await res.json();

        setLoading(false);

        if (!res.ok) {
          if (resdata.data.isExist) {
            setEmailExist(true);
            return;
          }
          setLoading(false);
          setError(true);
        } else {
          dispatch(
            setAuth({
              id: resdata.data.id,
              user: resdata.data.username,
              email: resdata.data.email,
              organization: resdata.data.organization,
              role: resdata.data.role,
            })
          );
          setSuccess(true);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    },
  });

  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    formik;

  useEffect(() => {
    if (success) {
      router.push("/admin/verify-email");
    }
  }, [success]);

  return (
    <div>
      <ParticlesBackground />
      {loading ? (
        <Loading />
      ) : (
        <AdminSignupContainer>
          <Head>
            <title>Admin Signup</title>
          </Head>
          {error && (
            <Toast
              style={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
              onClose={() => setError(false)}
              show={error}
              delay={3000}
              autohide
              bg="danger"
              className="toast"
            >
              <Toast.Header>
                <strong className="me-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>
                <p>Something went wrong</p>
              </Toast.Body>
            </Toast>
          )}
          <h1>Admin Signup</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && errors.username}
                value={values.username}
              />
              <Feedback type="invalid">{errors.username}</Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a email"
                onChange={(e) => {
                  handleChange(e);
                  setEmailExist(false);
                }}
                onBlur={handleBlur}
                isInvalid={(touched.email && errors.email) || emailExist}
                value={values.email}
              />
              <Feedback type="invalid">
                {errors.email
                  ? errors.email
                  : emailExist && "User already exists"}
              </Feedback>
            </Form.Group>
            <Form.Group controlId="organization">
              <Form.Label>Organization name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization name"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.organization && errors.organization}
                value={values.organization}
              />
              <Feedback type="invalid">{errors.organization}</Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter a password"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
                value={values.password}
              />
              <Feedback type="invalid">{errors.password}</Feedback>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
                value={values.confirmPassword}
              />
              <Feedback type="invalid">{errors.confirmPassword}</Feedback>
            </Form.Group>

            <Button type="submit">Submit</Button>
            <p>
              Already have an account?{" "}
              <a
                style={{
                  textDecoration: "none",
                }}
                href="/admin/signin"
              >
                Login
              </a>
            </p>
          </Form>
          <Container>
            <h6>
              This page can not be accessed on mobile phone or tablet. Please
              use a desktop or laptop to access this page.
            </h6>
          </Container>
        </AdminSignupContainer>
      )}
    </div>
  );
};

export default Signup;
