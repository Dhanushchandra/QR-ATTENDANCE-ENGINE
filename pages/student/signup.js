import Head from "next/head";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Feedback from "react-bootstrap/Feedback";
import Loading from "@/components/admin/Loading";
import Toast from "react-bootstrap/Toast";
import ParticlesBackground from "@/components/student/ParticlesStudentBg";

import { StudentSignupContainer } from "../../styles/student";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { universitiesList } from "@/helper/student/apicalls";
import { studentSignup } from "@/helper/student/apicalls";
import * as Yup from "yup";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [srnExist, setSrnExist] = useState(false);
  const [error, setError] = useState(null);
  const [universities, setUniversities] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      university: "",
      department: "",
      srn: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3, "Too short"),
      email: Yup.string().email("Invalid email address").required("Required"),
      university: Yup.string().required("University is required"),
      department: Yup.string().required("Department is required"),
      srn: Yup.string().required("SRN is required"),
      phone: Yup.number().min(10, "Too short").required("Phone is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await studentSignup(values);
        if (!res.ok && res.error) {
          if (res.isStudentExist) {
            setLoading(false);
            setSrnExist(true);
            return;
          }

          if (res.isExist) {
            setLoading(false);
            setEmailExist(true);
            return;
          }
          setLoading(false);
          setError(res.error);
          setSuccess(false);
        } else {
          setLoading(false);
          setSuccess(true);
          setError("");
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
      setLoading(true);
      setTimeout(() => {
        router.push("/student/verify-email");
      }, 2000);
    }
  }, [success, router]);

  const loadUniversities = async () => {
    try {
      setLoading(true);
      const res = await universitiesList();

      if (!res.ok && res.error) {
        setLoading(false);
        setError(res.error);
        setSuccess(false);
      } else {
        setLoading(false);
        setUniversities(res.data.admin);
      }
    } catch (error) {
      setLoading(false);
      setError("Internal server error");
    }
  };

  useEffect(() => {
    loadUniversities();
  }, [router]);

  return (
    <div>
      <ParticlesBackground />

      <Head>
        <title>Student Signup</title>
      </Head>

      {loading ? (
        <Loading />
      ) : (
        <StudentSignupContainer>
          <Head>
            <title>Student Signup</title>
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
                <p>{error}</p>
              </Toast.Body>
            </Toast>
          )}
          <h1>Student Signup</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && errors.name}
                value={values.name}
              />
              <Feedback type="invalid">{errors.name}</Feedback>
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

            <Form.Group controlId="university">
              <Form.Label>University</Form.Label>
              <Form.Select
                aria-label="Default select example"
                isInvalid={touched.university && errors.university}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>Open this select menu</option>
                {universities?.map((university) => {
                  return (
                    <option key={university._id} value={university._id}>
                      {university.organization}
                    </option>
                  );
                })}
              </Form.Select>
              <Feedback type="invalid">{errors.university}</Feedback>
            </Form.Group>

            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter department name"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.department && errors.department}
                value={values.department}
              />
              <Feedback type="invalid">{errors.department}</Feedback>
            </Form.Group>
            <Form.Group controlId="srn">
              <Form.Label>Student Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your student id"
                onChange={(e) => {
                  handleChange(e);
                  setSrnExist(false);
                }}
                onBlur={handleBlur}
                isInvalid={(touched.srn && errors.srn) || srnExist}
                value={values.srn}
              />
              <Feedback type="invalid">
                {errors.srn
                  ? errors.srn
                  : srnExist && "Student id already exists"}
              </Feedback>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter phone number"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.phone && errors.phone}
                value={values.phone}
              />
              <Feedback type="invalid">{errors.phone}</Feedback>
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
            <p>
              Already have an account?{" "}
              <a
                style={{
                  textDecoration: "none",
                }}
                href="/student/signin"
              >
                Login
              </a>
            </p>
          </Form>
        </StudentSignupContainer>
      )}
    </div>
  );
};

export default Signup;
