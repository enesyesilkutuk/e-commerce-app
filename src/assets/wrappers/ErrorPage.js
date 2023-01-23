import styled from "styled-components";

const Wrapper = styled.main`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 90vw;
        max-width: 600px;
        display: block;
        margin-bottom: 2rem;
    }
    h3 {
        margin-bottom: 0.5rem;
    }
    p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #627d98;
  }
  a {
    color:#3b82f6;
    text-decoration:underline;
    text-transform: capitalize;
  }
`
export default Wrapper;
