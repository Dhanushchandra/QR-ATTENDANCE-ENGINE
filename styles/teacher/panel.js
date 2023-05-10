import styled from "styled-components";

export const TeacherSidebarContainer = styled.div`
  background-color: #ffffff;
  height: 100vh;

  .sidebar {
    background-color: #d9d9d9;
    color: #ffffff;
    padding: 0 1rem;
    height: 100vh;
    position: fixed;
    z-index: 1;
    text-align: center;

    h2 {
      margin-top: 20px;
    }
  }

  .pnl-content {
    margin-left: 16%;
    padding: 0 1rem;
    overflow-x: hidden;
  }

  .nav {
    margin-top: 50px;
  }

  .nav-link {
    background-color: #ffffff;
    border-radius: 20px;
    text-align: left;
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
    color: #ffffff;
  }

  .nav-link:hover {
    background-color: #007074;
    color: #ffffff;
  }
`;

export const TeacherClassesPanelContainer = styled.div`
  h1 {
    color: #007074;
    margin-bottom: 1rem;
  }

  table {
    margin-top: 1rem;
  }

  table th {
    color: #007074;
    border-top: #007074 1px solid;
  }

  td:nth-child(4) {
    display: flex;
    justify-content: space-evenly;
  }
`;

export const TeacherClassStudentsPanelContainer = styled.div`
  h1 {
    color: #007074;
    margin-bottom: 1rem;
  }

  table {
    margin-top: 1rem;
  }

  table th {
    color: #007074;
    border-top: #007074 1px solid;
  }
`;

export const QrAttendanceContainer = styled.div`
  width: 100%;
  height: 100vh;

  h1 {
    color: #007074;
    margin-bottom: 1rem;
  }

  .t-wrap {
    width: 100%;
    padding: 5px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #d4d4d4;
    border-radius: 10px;
    margin-bottom: 20px;
    position: sticky;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    top: 0;
  }

  .q-wrap {
    width: 100%;
    padding: 20px;
  }
`;
