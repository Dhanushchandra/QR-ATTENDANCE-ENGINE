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
  table th {
    color: #007074;
    border-top: #007074 1px solid;
  }
  table td {
  }
`;
