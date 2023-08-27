import '../styles/LginPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const res = await fetch('http://localhost:5000/api/v1/login', {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    }),
    });
  
    const data = await res.json();
  
    if (data.success) {
      localStorage.setItem('userId', data?.userId);
       window.alert('Login successful');
      console.log('Login successful');
      navigate('/my-blogs');
    } else {
      window.alert('Invalid login');
      console.log('Invalid login');
    }
  };
  
  
  return (
    <div className = "login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className = "content">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className = "content">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
