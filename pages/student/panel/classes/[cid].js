import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Button, Container, Toast } from "react-bootstrap";
import StudentNavbar from "@/components/student/NavBar";
import { registerAttendance } from "@/helper/student/apicalls";
import { getUserIp, getLocation } from "@/helper/student/utils";
import { IoMdArrowRoundBack } from "react-icons/io";
import Head from "next/head";
import withAuth from "@/components/student/withAuth";

function QRCodeReader() {
  const [scanResults, setScanResults] = useState([]);
  const [className, setClassName] = useState("Scan QR Code");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = useSelector((state) => state.studentAuth.token);
  const id = useSelector((state) => state.studentAuth.id);
  const classes = useSelector((state) => state.studentClasses.classes);

  const isMobile = window.innerWidth <= 500;
  const isDesktop = window.innerWidth > 500;

  const router = useRouter();

  const { cid } = router.query;

  let qrCodeScanner;

  const initQRCodeScanner = () => {
    if (!qrCodeScanner?.getState()) {
      qrCodeScanner = new Html5QrcodeScanner("qr-reader", {
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 1,
      });

      qrCodeScanner.render(handleScanResult, handleScanError);
    }

    const classObj = classes.find((c) => c.classId === cid);
    setClassName(classObj?.className);
  };

  const handleScanResult = (result) => {
    setScanResults((prevResults) => {
      if (prevResults.length < 3) {
        return [...prevResults, result];
      } else {
        return prevResults;
      }
    });
  };

  const handleScanError = (error) => {
    // Handle scan error if needed
  };

  const handleAttendance = async () => {
    try {
      setIsLoading(true);
      const ip = await getUserIp();
      const location = await getLocation();
      const res = await registerAttendance(
        token,
        id,
        cid,
        scanResults,
        ip,
        location
      );

      if (!res.ok && res.error) {
        setIsLoading(false);
        setError(res.error);
        setScanResults([]);
      } else {
        setIsLoading(false);
        setSuccess(true);
        setScanResults([]);
      }
    } catch (error) {
      setScanResults([]);
      setIsLoading(false);
      setError("Internal Server Error");
    }
  };

  useEffect(() => {
    initQRCodeScanner();
  }, []);

  useEffect(() => {
    if (scanResults.length === 3 && !isLoading) {
      handleAttendance();
    }
  }, [scanResults]);

  const MobileSuccess = () => {
    return (
      <Container
        style={{
          height: "90vh",
          width: "100%",
          backgroundColor: "green",
          zIndex: "100",
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            marginTop: "2rem",
            color: "#ffffff",
            textAlign: "center",
            padding: "1rem",
          }}
        >
          Your Attendance has been marked successfully. You can close this page.
        </h3>
        <Button
          onClick={() => router.push("/student/panel/classes")}
          variant="light"
          style={{
            margin: "auto",
            width: "80%",
            bottom: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#007074",
            fontWeight: "bold",
          }}
        >
          <IoMdArrowRoundBack
            style={{
              fontSize: "1.5rem",
              marginRight: "0.5rem",
              color: "#007074",
            }}
          />{" "}
          Go Back
        </Button>
      </Container>
    );
  };

  return (
    <StudentNavbar>
      {isMobile && success && <MobileSuccess />}

      <Head>
        <title> {className} | QR Code Reader</title>
      </Head>

      {isDesktop && success && (
        <Toast
          onClose={() => setSuccess(false)}
          show={success}
          delay={3000}
          autohide
          bg="success"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: "100",
            width: "100%",
          }}
        >
          <Toast.Header>
            <strong className="mr-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>
            Your Attendance has been marked successfully. You can close this
            page.
          </Toast.Body>
        </Toast>
      )}

      <Toast
        onClose={() => setError(null)}
        show={error}
        delay={3000}
        autohide
        bg="danger"
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          zIndex: "100",
          width: "100%",
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>

      <Container>
        <h3
          style={{
            color: "#007074",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
          }}
        >
          {className}
        </h3>
        <div
          style={{
            margin: "auto",
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <div id="qr-reader"></div>
        </div>
      </Container>
    </StudentNavbar>
  );
}

export default withAuth(QRCodeReader);
