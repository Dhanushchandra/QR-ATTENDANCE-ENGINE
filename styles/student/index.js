import styled from "styled-components";

export const StudentSignupContainer = styled.div`
  h1 {
    color: #000000;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
  }

  form {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgb(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    box-shadow: 0px 0px 10px 0px rgb(0 112, 116);
    border-radius: 10px;

    label {
      color: #000000;
      font-weight: 600;
      margin-top: 0.6rem;
    }

    button {
      margin-top: 1rem;
    }

    p {
      margin-top: 1rem;

      a {
        color: blue;
        font-weight: 600;
      }
    }
  }

  @media (min-width: 768px) {
    form {
      width: 50%;

      margin: auto;
      margin-top: 3rem;
    }
  }
`;

export const StudentSigninContainer = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 100;

  .heading {
    color: #000000;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    h1 {
      color: #000000;
    }
  }

  form {
    h3 {
      color: #ffffff;
      font-weight: 600;
      margin-bottom: 1rem;
      text-align: center;
    }

    label {
      color: #000000;
      font-weight: 600;
    }

    margin-top: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgb(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    box-shadow: 0px 0px 10px 0px rgb(0 112, 116);
    border-radius: 10px;
  }

  @media (min-width: 768px) {
    form {
      width: 50%;

      margin: auto;
      margin-top: 5rem;
    }
  }
`;

export const StudentForgotPasswordContainer = styled.div`
  h1 {
    color: #000000;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }

  form {
    margin-top: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgb(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    box-shadow: 0px 0px 10px 0px rgb(0 112, 116);
    border-radius: 10px;

    button {
      margin-top: 1rem;
    }
  }

  @media (min-width: 768px) {
    form {
      width: 50%;
      margin: auto;
      margin-top: 5rem;
    }
  }
`;

export const StudentResetPasswordContainer = styled.div`
  h1 {
    color: #000000;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
  }

  form {
    margin-top: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    background-color: rgb(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    box-shadow: 0px 0px 10px 0px rgb(0 112, 116);
    border-radius: 10px;

    button {
      margin-top: 1rem;
    }
  }

  @media (min-width: 768px) {
    form {
      width: 50%;
      margin: auto;
      margin-top: 5rem;
    }
  }
`;

export const StudentNavbarContainer = styled.div`
  width: 100%;
  height: 100%;

  .navbar-nav a {
    margin: 0 0.5rem;
  }

  /* .navbar-nav a:hover,
  .navbar-nav a:active {
    color: #ffffff;
    background-color: #007074;
  } */

  @media (max-width: 576px) {
  }
`;
