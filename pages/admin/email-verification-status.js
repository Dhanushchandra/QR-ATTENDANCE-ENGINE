import ParticlesBackground from "@/components/admin/ParticlesBackground";
import { useEffect } from "react";
import { verifyEmail } from "@/helper/admin/apicalls";
import { useRouter } from "next/router";

const EmailVerificationStatus = () => {
  const router = useRouter();

  useEffect(() => {
    const token = router.query.token;

    if (token) {
      async function verify() {
        const res = await verifyEmail(token);
        if (!res.ok && res.error) {
          router.push("/admin/signin");
        }
      }
      verify();
    }
  }, [router.query.token]);

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ParticlesBackground />
      <h1 style={{ color: "#ffffff" }}>
        Your email has been verified. You can now{" "}
        <a
          style={{
            color: "yellow",
          }}
          href="/admin/signin"
        >
          login
        </a>{" "}
        .
      </h1>
    </div>
  );
};

export default EmailVerificationStatus;
