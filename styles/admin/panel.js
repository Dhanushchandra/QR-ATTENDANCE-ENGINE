import styled from "styled-components";

export const AdminPanelContainer = styled.div`
  .panel-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    color: #007074;
  }

  .panel-title span {
    font-size: 2rem;
    margin-right: 10px;
  }

  .panel-bottom-options {
  }

  .nav-item {
    margin: 0 1rem;
  }
  .nav-link {
    background-color: #ffffff;
    border-radius: 20px;
    text-align: center;
    margin-top: 10px;
    color: #000000;
    display: flex;
    align-items: center;
  }

  .nav-link svg {
    margin-right: 10px;
    font-size: 20px;
  }

  .nav-link.active {
    background-color: #007074;
  }
`;

export const AdminDashBoardContainer = styled.div`
  h1 {
    color: #007074;
  }

  .cards {
    margin-top: 2rem;
  }
`;

export const AdminTeachersPanelContainer = styled.div`
  h1 {
    color: #007074;
  }
  form {
    margin-top: 2rem;
    /* width: 40%; */
  }
  table {
    margin-top: 1rem;
  }
  .btn-wrap {
    display: flex;
    justify-content: space-between;
  }
  table th {
    color: #007074;
    border-top: #007074 1px solid;
  }
  table td {
  }
`;

export const AdminStudentsPanelContainer = styled.div`
  h1 {
    color: #007074;
  }
  form {
    margin-top: 2rem;
    /* width: 40%; */
  }
`;

export const AdminProfileContainer = styled.div`
  h1 {
    color: #007074;
  }
  form {
    width: 60%;
    margin: auto;
    margin-top: 40px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 30px;
    border-radius: 20px;
    color: #000000;

    & > div {
      margin-bottom: 20px;
    }

    button {
      margin-left: 20px;
    }
  }

  .profile-icon {
    font-size: 50px;
    color: #007074;
    width: 100%;
    position: relative;
    margin-left: auto;
    border-radius: 50%;
  }
`;

export const AdminAttendanceContainer = styled.div`
  h1 {
    color: #007074;
  }

  .form1 {
    width: 80%;
    padding: 20px;
    /* margin: auto; */
    margin-top: 50px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 20px;

    .form-control {
      margin-top: 20px;
      width: 70%;
    }

    .form-label {
      font-size: 20px;
      font-weight: 600;
    }

    .form-switch {
      margin-top: 20px;
      font-size: 20px;
    }

    .btn {
      margin-top: 20px;
    }
  }

  .form2 {
    width: 80%;
    padding: 20px;
    /* margin: auto; */
    margin-top: 100px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 20px;

    .form-control {
      margin-top: 20px;
      width: 100%;
    }

    .form-label {
      font-size: 20px;
      font-weight: 600;
    }

    .form-switch {
      margin-top: 20px;
      font-size: 20px;
    }

    .btn {
      margin-top: 20px;
    }
  }
`;
