import ParticlesBackground from "@/components/admin/ParticlesBackground";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Feedback from "react-bootstrap/Feedback";
import Loading from "@/components/admin/Loading";
import Head from "next/head";

import { BiArrowBack } from "react-icons/bi";
import { AdminForgotPasswordContainer } from "../../styles/admin";
import { useFormik } from "formik";
import { forgotPasswordValidationSchema } from "../../helper/admin/validationSchema";
import { useState } from "react";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_TEACHER_BASE_API}/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
            }),
          }
        );

        const resdata = await res.json();

        if (!res.ok) {
          setLoading(false);
          setError(resdata.error);
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
    <div>
      <Head>
        <title>Teacher Forgot Password</title>
      </Head>{" "}
      <ParticlesBackground />
      {loading ? (
        <Loading />
      ) : (
        <AdminForgotPasswordContainer>
          <h1>Forgot Password?</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => {
                  handleChange(e);
                  setError(null);
                  setSuccess(false);
                }}
                onBlur={handleBlur}
                value={values.email}
                type="text"
                placeholder="Enter a email"
                isInvalid={(touched.email && errors.email) || error}
              />
              <Feedback type="invalid">
                {errors.email ? errors.email : error}
              </Feedback>
            </Form.Group>
            {success && (
              <p
                style={{
                  color: "green",
                }}
              >
                Please check your email for reset password link.
              </p>
            )}
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
              </Button>
            </div>
          </Form>
        </AdminForgotPasswordContainer>
      )}
    </div>
  );
};

export default ForgotPassword;
