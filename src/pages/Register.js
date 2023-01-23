import React, { useState } from 'react'
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    console.log(e.target)
    setValues({...values, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>
        {/* name */}
        <FormRow type="text" value={values.name} name="name" handleChange={handleChange} /> 
          {/* email */}
        <FormRow type="email" value={values.email} name="email" handleChange={handleChange} /> 
          {/* password */}
        <FormRow type="password" value={values.password} name="password" handleChange={handleChange} /> 
        <button type='submit' className='btn btn-block'>Save</button>
      </form>
    </Wrapper>
  )
}

export default Register
