import ParticlesBackground from "@/components/admin/ParticlesBackground";
import Head from "next/head";

const DesktopOnly = () => {
  return (
    <div className="desktop-only ">
      <Head>
        <title>Desktop Only</title>
      </Head>
      <ParticlesBackground />
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#ffffff",
          marginTop: "10rem",
        }}
      >
        Desktop Only
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "red",
        }}
      >
        This page is only available on desktop. Please visit this page on a
        desktop browser.
      </p>
    </div>
  );
};

export default DesktopOnly;
