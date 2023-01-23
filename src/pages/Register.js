import React, { useState } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values;
    if (!name || !email || (isMember && !name)) {
      console.log("Please fill out all fields");
      setValues(initialState);
      return;
    }
    console.log(name,email, password, isMember);
    setValues(initialState);
  };
 
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name */}
        {!values.isMember && (
          <FormRow
            type="text"
            value={values.name}
            name="name"
            handleChange={handleChange}
          />
        )}
        {/* email */}
        <FormRow
          type="email"
          value={values.email}
          name="email"
          handleChange={handleChange}
        />
        {/* password */}
        <FormRow
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
