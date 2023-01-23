import styled from "styled-components";

const Wrapper = styled.nav`
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
    background-color: #fff;
.nav-center {
    border: 1px solid green;
    width: 90vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo {
    display: flex;
    align-items: center;
    width: 100px;
}
.toggle-btn {
    background-color: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color:#3b82f6;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.logo-text {
    display: none;
}
.btn-container {
    position: relative;
}
.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.dropdown {
    border: 1px solid red;
    position: absolute;
    top:40px;
    left:0;
    width: 100%;
    background-color: #dbeafe;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 0.5rem;
    text-align: center;
    /* visibility: hidden; */
    border-radius: 0.25rem;
}

.show-dropdown {
    visibility: visible;
}

.dropdown-btn {
    background-color: transparent;
    border-color: transparent;
    color:#3b82f6;
    letter-spacing: 1px;
    text-transform: capitalize;
    cursor: pointer;
}

@media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
        width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
}


`
export default Wrapper;