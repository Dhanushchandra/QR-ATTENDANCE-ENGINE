import styled from "styled-components";

export const AdminSignupContainer = styled.div`
  h1 {
    text-align: center;
    color: #ffffff;
    font-size: 4rem;
    text-shadow: 2px 2px 4px #ffffff;
  }

  form {
    width: 50%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 70px 30px 50px -6px rgba(0, 0, 0, 0.2);
    padding: 20px;

    & > div {
      margin-bottom: 10px;

      & > label {
        color: #000000;
        font-weight: 600;
      }
    }
  }
  p {
    margin-top: 10px;
  }

  button {
    margin-top: 10px;
  }

  .container {
    display: none;
  }

  min-height: 100vh;
  height: 100%;
  /* background: #fc5c7d;
  background: -webkit-linear-gradient(to right, #6a82fb, #fc5c7d);
  background: linear-gradient(to right, #6a82fb, #fc5c7d);

  background-image: url("/images/admin/bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
    background-image: none;

    h1 {
      color: #000000;
      font-size: 50px;
    }

    form {
      display: none;
    }

    .container {
      margin-top: 20%;
      display: block;
      color: red;
    }
  }
`;

export const AdminSigninContainer = styled.div`
  h1 {
    text-align: center;
    color: #ffffff;
    font-size: 4rem;
    text-shadow: 2px 2px 4px #ffffff;
    margin-bottom: 80px;
  }

  form {
    width: 50%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 70px 30px 50px -6px rgba(0, 0, 0, 0.2);
    padding: 20px;

    & > div {
      margin-bottom: 10px;

      & > label {
        color: #000000;
        font-weight: 600;
      }
    }

    button {
      margin-top: 10px;
    }

    p {
      margin-top: 10px;
    }
  }

  .container {
    display: none;
  }

  min-height: 100vh;
  height: 100%;
  /* background: #fc5c7d;
  background: -webkit-linear-gradient(to right, #6a82fb, #fc5c7d);
  background: linear-gradient(to right, #6a82fb, #fc5c7d);

  background-image: url("/images/admin/bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: block;
    background-image: none;

    h1 {
      color: #000000;
      font-size: 50px;
    }

    form {
      display: none;
    }

    .container {
      margin-top: 20%;
      display: block;
      color: red;
    }
  }
`;

export const AdminEmailVerifyContainer = styled.div`
  h1 {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: orangered;
    font-size: 4rem;
  }

  p {
    text-align: center;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: 500;
  }

  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AdminForgotPasswordContainer = styled.div`
  h1 {
    text-align: center;
    color: #ffffff;
    font-size: 4rem;
    text-shadow: 2px 2px 4px #ffffff;
    margin-bottom: 80px;
  }

  form {
    width: 50%;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    box-shadow: 70px 30px 50px -6px rgba(0, 0, 0, 0.2);
    padding: 20px;

    & > div {
      margin-bottom: 10px;

      & > label {
        color: #000000;
        font-weight: 600;
      }
    }

    button {
      margin-top: 10px;
    }

    p {
      margin-top: 10px;
    }
  }
`;
