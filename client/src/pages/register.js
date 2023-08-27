import '../styles/register.css';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    console.log('Before fetch');

    const res = await fetch('http://localhost:5000/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Add this line
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.status === 400 || data.status === 401) {
      window.alert('Invalid registration');
      console.log('Invalid registration');
    } else {
      window.alert('Registration successful');
      console.log('Registration successful');
      navigate('/my-blogs');
    }
  };

  return (
    <div className="register">
    <h2>Register</h2>
    <form onSubmit={postData}>
      <div className="content">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required 
        />
      </div>
      <div className="content">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required 
        />
      </div>
      <div className="content">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required 
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
  
  );
};

export default Register;
