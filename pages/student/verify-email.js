import { useSelector } from "react-redux";

const { AdminEmailVerifyContainer } = require("../../styles/admin");
import ParticlesBackground from "@/components/admin/ParticlesBackground";
import Head from "next/head";

const VerifyEmail = () => {
  const email = useSelector((state) => state.studentAuth.email);

  return (
    <div style={{ position: "relative" }}>
      <ParticlesBackground />

      <Head>
        <title>Verify Email</title>
      </Head>

      <AdminEmailVerifyContainer
        style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "2rem" }}
      >
        <h1>Verify Your Email</h1>
        <p>Thank you for signing up! We have sent you an email to verify.</p>

        {email && (
          <p>
            Email:{" "}
            <span
              style={{
                color: "yellow",
              }}
            >
              {" "}
              {email}
            </span>
          </p>
        )}

        <p>
          Please check your email for the verification link. If you do not see
          the email, please check your spam folder.
        </p>
        <p>
          You can login here:{" "}
          <a
            style={{
              color: "yellow",
              textDecoration: "none",
            }}
            href="/student/signin"
          >
            Login
          </a>
        </p>
      </AdminEmailVerifyContainer>
    </div>
  );
};

export default VerifyEmail;
