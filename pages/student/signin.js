import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { StudentSigninContainer } from "../../styles/student/index.js";
import ParticlesBackground from "@/components/student/ParticlesStudentBg";
import { FiGithub } from "react-icons/fi";
import { studentSignin } from "@/helper/student/apicalls.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import Feedback from "react-bootstrap/Feedback";
import { useState } from "react";
import Loading from "@/components/admin/Loading.js";
import { setAuth } from "@/slices/student/authSlice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router.js";
import Head from "next/head.js";

function Signin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const res = await studentSignin(values);
      if (!res.ok && res.error) {
        setError(res.error);
        setLoading(false);
        setSuccess(false);
      } else {
        setLoading(false);
        setSuccess(true);
        dispatch(
          setAuth({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone,
            university: res.data.university,
            department: res.data.department,
            srn: res.data.srn,
            token: res.data.token,
            role: res.data.role,
          })
        );
        setError("");
        router.push("/student/panel");
      }
    },
  });

  const { handleChange, handleSubmit, touched, handleBlur, errors } = formik;

  return (
    <div>
      <ParticlesBackground />

      <Head>
        <title>Student Signin</title>
      </Head>

      {loading && <Loading />}

      <StudentSigninContainer>
        <div className="text-center heading">
          <FiGithub />
          <h1>QR ATTENDANCE ENGINE</h1>
        </div>{" "}
        <Form onSubmit={handleSubmit}>
          {" "}
          <h3>Student Signin</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={(e) => {
                handleChange(e);
                setError("");
              }}
              onBlur={handleBlur}
              isInvalid={touched.email && errors.email}
              placeholder="Enter email"
            />
            <Feedback type="invalid">{errors.email}</Feedback>
            <Form.Text
              style={{
                color: "#ffffff",
                fontWeight: "600",
              }}
            >
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => {
                handleChange(e);
                setError("");
              }}
              onBlur={handleBlur}
              isInvalid={touched.password && errors.password}
              placeholder="Password"
            />
            <Feedback type="invalid">{errors.password}</Feedback>
          </Form.Group>
          {error && (
            <Form.Text
              className="mb-2"
              style={{
                color: "red",
                fontWeight: "600",
              }}
            >
              {error}
            </Form.Text>
          )}
          <div
            style={{
              color: "#ffffff",
              fontWeight: "600",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <p>
              Forgot Password?{" "}
              <a
                style={{
                  color: "yellow",
                }}
                href="/student/forgot-password"
              >
                Reset
              </a>
            </p>
          </div>
          <div
            style={{
              color: "#ffffff",
              fontWeight: "600",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <p>
              Don't have an account?{" "}
              <a
                href="/student/signup"
                style={{
                  color: "blue",
                }}
              >
                Signup
              </a>
            </p>
          </div>
        </Form>
      </StudentSigninContainer>
    </div>
  );
}

export default Signin;
