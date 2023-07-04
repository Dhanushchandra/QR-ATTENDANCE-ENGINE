import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.div`
  footer {
    margin-top: 2rem;
    position: sticky;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #212529;
    color: #ffffff;
    padding: 10px 0;

    font-size: 14px;
    z-index: 20;
    border-top: 1px solid #e7e7e7;
    box-shadow: 0 -10px 4px -6px rgba(35, 194, 14, 0.541);
  }

  .footer-content {
    margin: 0;
  }

  footer a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }

  @media screen and (max-width: 767px) {
    .footer-content {
      font-size: 14px;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-12 text-center">
              <p>
                &copy; Copyright 2023 QR-Attendance-Engine. All Rights Reserved.
                The Conference |
                <Link href={"https://github.com/Dhanushchandra"}>
                  {" "}
                  <span
                    style={{
                      color: "#6222CB",
                    }}
                  >
                    Developed by Dhanush.C
                  </span>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </footer>
    </StyledFooter>
  );
};

export default Footer;
