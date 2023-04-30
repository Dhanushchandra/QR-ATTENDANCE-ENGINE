import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Head from "next/head";
import Loading from "@/components/admin/Loading";
import ParticlesBackground from "@/components/admin/ParticlesBackground";
import Feedback from "react-bootstrap/Feedback";

import { AdminSigninContainer } from "../../styles/admin";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "@/slices/admin/authSlice";
import { useRouter } from "next/router";
import { signInValidationSchema } from "../../helper/admin/validationSchema";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_BASE_API}/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          }
        );

        const resdata = await res.json();

        setLoading(false);

        if (!res.ok) {
          setLoading(false);
          setError(resdata.err);
        } else {
          setLoading(false);
          dispatch(
            setAuth({
              id: resdata.data.id,
              user: resdata.data.username,
              email: resdata.data.email,
              organization: resdata.data.organization,
              role: resdata.data.role,
              token: resdata.data.token,
              isAuthenticated: true,
            })
          );
          setSuccess(true);
        }
      } catch (error) {
        setLoading(false);
        setError("Internal server error");
      }
    },
  });

  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    formik;

  useEffect(() => {
    if (success) {
      router.push("/admin/dashboard");
    }
  }, [success]);

  return (
    <div>
      <ParticlesBackground />
      {loading ? (
        <Loading />
      ) : (
        <AdminSigninContainer>
          <Head>
            <title>Admin Signin</title>
          </Head>
          <h1>Admin Signin</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a email"
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                onBlur={handleBlur}
                isInvalid={touched.email && errors.email}
                value={values.email}
              />
              <Feedback type="invalid">{errors.email}</Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a password"
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                }}
                onBlur={handleBlur}
                isInvalid={touched.password && errors.password}
                value={values.password}
              />
              <Feedback type="invalid">{errors.password}</Feedback>
            </Form.Group>
            {error && (
              <p
                style={{
                  color: "red",
                }}
              >
                {error}
              </p>
            )}
            <Button type="submit">Submit</Button>{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>
                Don't have an account?{" "}
                <a
                  style={{
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                  href="/admin/signup"
                >
                  Sign up
                </a>
              </p>
              <p>
                <a
                  style={{
                    color: "orangered",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                  href="/admin/forgot-password"
                >
                  Forgot password ?
                </a>
              </p>
            </div>
          </Form>
          <Container>
            <h6>
              This page can not be accessed on mobile phone or tablet. Please
              use a desktop or laptop to access this page.
            </h6>
          </Container>
        </AdminSigninContainer>
      )}
    </div>
  );
};

export default Signin;
