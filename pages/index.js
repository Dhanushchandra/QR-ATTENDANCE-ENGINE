import Navbar from "../components/Home/Navbar";
import ParticlesBackground from "@/components/student/ParticlesStudentBg";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdOutlineNetworkLocked } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import { BsQrCode } from "react-icons/bs";
import Footer from "@/components/Home/Footer";
import GoToTop from "@/components/Home/GoToTop";

const QRCode = styled.div`
  width: 270.4px;
  height: 270.4px;
  margin: 0 auto;
  margin-top: 130px;
  position: relative;

  .spinner {
    width: 100%;
    height: 100%;
    animation: spinner 3.6s infinite ease;
    transform-style: preserve-3d;
    position: absolute;
    top: 0;
    left: 0;
  }

  .spinner > div {
    background-image: url("https://www.qrcode-monkey.com/img/default-preview-qr.svg");
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    height: 100%;
    position: absolute;
    width: 100%;
    border: 3.5px solid var(--clr);
  }

  .spinner div:nth-of-type(1) {
    transform: translateZ(-35.2px) rotateY(180deg);
  }

  .spinner div:nth-of-type(2) {
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
  }

  .spinner div:nth-of-type(3) {
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
  }

  .spinner div:nth-of-type(4) {
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
  }

  .spinner div:nth-of-type(5) {
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
  }

  .spinner div:nth-of-type(6) {
    transform: translateZ(35.2px);
  }

  @keyframes spinner {
    0% {
      transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    }

    50% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    }

    100% {
      transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    }
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin-top: 100px;
  }
`;

const HeroContainer = styled(Container)`
  .hero-style {
    margin-top: 130px;
    color: #ffffff;

    h1 {
      font-size: 3rem;
      text-align: center;
      font-weight: 600;
      background: #341f87;
      background: linear-gradient(to left, #341f87 35%, #ffffff 58%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p {
      font-size: 1.5rem;
      font-family: "Goudy Bookletter 1911", sans-serif;
      font-weight: 600;
      background: #341f87;
      background: linear-gradient(to right, #341f87 35%, #ffffff 58%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  @media (max-width: 768px) {
    .hero-style {
      margin-top: 0px;

      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1.3rem;
      }
    }
  }
`;

const CardContainer = styled(Container)`
  margin-top: 120px;

  .card {
    width: 190px;
    height: 254px;
    margin: auto;
    background: #07182e;
    position: relative;
    display: flex;
    place-content: center;
    place-items: center;
    overflow: hidden;
    border-radius: 20px;
  }

  .card h3 {
    z-index: 1;
    color: white;
    font-size: 1em;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
  }

  .card .icon {
    height: 50px;
    width: 50px;
    z-index: 1;
    color: white;
    display: flex;
    place-content: center;
    place-items: center;

    padding: 10px;
    border-radius: 50%;
    background: rgb(2, 0, 36);
    background: -moz-linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(101, 9, 121, 1) 35%,
      rgba(0, 212, 255, 1) 100%
    );
    background: -webkit-linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(101, 9, 121, 1) 35%,
      rgba(0, 212, 255, 1) 100%
    );
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(101, 9, 121, 1) 35%,
      rgba(0, 212, 255, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024",endColorstr="#00d4ff",GradientType=1);
  }

  .card .icon svg {
    z-index: 1;
    color: white;
    font-size: 24px;
    font-weight: 600;
  }

  .card p {
    z-index: 1;
    color: white;
    font-size: 1em;
    font-weight: 300;
    text-align: center;
    padding: 5px;
  }

  .card::before {
    content: "";
    position: absolute;
    width: 100px;
    background-image: linear-gradient(
      180deg,
      rgb(0, 183, 255),
      rgb(255, 48, 255)
    );
    height: 130%;
    animation: rotBGimg 3s linear infinite;
    transition: all 0.2s linear;
  }

  @keyframes rotBGimg {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .card::after {
    content: "";
    position: absolute;
    background: #07182e;
    inset: 5px;
    border-radius: 15px;
  }
  .card:hover:before {
    background-image: linear-gradient(180deg, rgb(81, 255, 0), purple);
    animation: rotBGimg 3.5s linear infinite;
  }

  @media screen and (max-width: 768px) {
    .card {
      margin-top: 50px;
      width: 250px;
    }
  }
`;

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <GoToTop />

      <HeroContainer>
        <Row>
          <Col className="hero-style">
            <h1 className="text-center mt-5">QR-Attendance-Engine</h1>
            <p className="text-center mt-3">
              A QR code based attendance system for students.
            </p>
          </Col>
          <Col>
            <QRCode>
              <div class="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </QRCode>
          </Col>
        </Row>
      </HeroContainer>

      <CardContainer>
        <Row>
          <Col>
            {" "}
            <div class="card">
              <div className="icon">
                <BsQrCode
                  style={{
                    color: "white",
                  }}
                />
              </div>
              <h3>Dynamic QR Code</h3>
              <p>QR Code will be generated every second to avoid proxy.</p>
            </div>
          </Col>
          <Col>
            {" "}
            <div class="card">
              <div className="icon">
                <MdOutlineNetworkLocked
                  style={{
                    color: "white",
                  }}
                />
              </div>
              <h3>IP Tracker</h3>
              <p>
                The IP address of the student will be tracked to avoid proxy.
              </p>
            </div>
          </Col>
          <Col>
            {" "}
            <div class="card">
              <div className="icon">
                <ImLocation2
                  style={{
                    color: "white",
                  }}
                />
              </div>
              <h3>Location Tracker</h3>
              <p>The location of the student will be tracked to avoid proxy.</p>
            </div>
          </Col>
        </Row>
      </CardContainer>
      <Footer />
    </>
  );
}
