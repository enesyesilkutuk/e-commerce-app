import styled from "styled-components";

const Wrapper = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }

    .form {
         border-top:5px solid #3b82f6;
         max-width:400px;
    }

    h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
    user-select: none;
  }
  .btn {
    margin-top: 1rem;
  }

  .member-btn {
    background-color: transparent;
    border: transparent;
    color:  #3b82f6;
    letter-spacing: 1px;
    cursor: pointer;
  }
`

export default Wrapper;