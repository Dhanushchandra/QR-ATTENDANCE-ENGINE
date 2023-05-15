import ParticlesBackground from "@/components/student/ParticlesStudentBg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Feedback from "react-bootstrap/Feedback";
import Loading from "@/components/admin/Loading";
import Head from "next/head";

import { BiArrowBack } from "react-icons/bi";
import { StudentForgotPasswordContainer } from "../../styles/student";
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
          `${process.env.NEXT_PUBLIC_STUDENT_BASE_API}/forgot-password`,
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

        if (!res.ok && resdata.error) {
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
        <title>Forgot Password</title>
      </Head>{" "}
      <ParticlesBackground />
      {loading ? (
        <Loading />
      ) : (
        <StudentForgotPasswordContainer>
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
                  fontWeight: "600",
                  marginTop: "1rem",
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
                  href="/student/signin"
                >
                  <BiArrowBack /> Back
                </a>
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </StudentForgotPasswordContainer>
      )}
    </div>
  );
};

export default ForgotPassword;
