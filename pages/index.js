import Navbar from "../components/Home/Navbar";
import ParticlesBackground from "@/components/student/ParticlesStudentBg";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />

      <h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        Page is under construction! :)
      </h1>
    </>
  );
}
