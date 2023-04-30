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
