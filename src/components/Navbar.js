import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn">
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn">
            <FaUserCircle />
            {"Test"}
            <FaCaretDown />
          </button>
          <div className="dropdown">
            <button type="button" className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
