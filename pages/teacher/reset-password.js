import Feedback from "react-bootstrap/Feedback";
import ParticlesBackground from "@/components/admin/ParticlesBackground";
import Loading from "@/components/admin/Loading";
import Head from "next/head";

import { useRouter } from "next/router";
import { resetPassword } from "@/helper/teacher/apicalls";
import { useFormik } from "formik";
import { Button, Form, Toast } from "react-bootstrap";
import { resetPasswordValidationSchema } from "../../helper/admin/validationSchema";
import { AdminResetPasswordContainer } from "../../styles/admin";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      try {
        const res = await resetPassword(token, values);
        console.log(res);
        if (!res.ok && res.error) {
          setLoading(false);
          setError(res.error);
        } else {
          setLoading(false);
          setSuccess(true);
        }
      } catch (error) {
        setLoading(false);
        setError("Internal server error");
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, values, touched } =
    formik;

  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
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
            zIndex: 9999,
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

            zIndex: 9999,
          }}
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Password reset successfully</Toast.Body>
        </Toast>
      )}

      <AdminResetPasswordContainer>
        <ParticlesBackground />
        <h1>Reset Password</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && errors.password}
            />
            <Feedback type="invalid">{errors.password}</Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.confirmPassword && errors.confirmPassword}
            />
            <Feedback type="invalid">{errors.confirmPassword}</Feedback>
          </Form.Group>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="success">
              <a
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
                href="/teacher/signin"
              >
                <BiArrowBack /> Back
              </a>
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>{" "}
          </div>
        </Form>
      </AdminResetPasswordContainer>
    </>
  );
};

export default ResetPassword;
