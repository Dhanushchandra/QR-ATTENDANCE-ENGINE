import StudentNavbar from "@/components/student/NavBar";
import Head from "next/head";
import { Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import withAuth from "@/components/student/withAuth";

const Profile = () => {
  const student = useSelector((state) => state.studentAuth);

  return (
    <StudentNavbar>
      <Head>
        <title>Student Profile</title>
      </Head>

      <h3
        style={{
          color: "#007074",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
        }}
      >
        Student Profile
      </h3>
      <Container>
        <Form
          style={{
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
            padding: "2rem",
            marginTop: "2rem",
            borderRadius: "10px",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Name"
              name="name"
              value={student.name}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>SRN</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your SRN"
              name="srn"
              value={student.srn}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Email"
              name="email"
              value={student.email}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Phone Number"
              name="phone"
              value={student.phone}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Branch</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Branch"
              name="branch"
              value={student.department}
              disabled
            />
          </Form.Group>
        </Form>
      </Container>
    </StudentNavbar>
  );
};

export default withAuth(Profile);
