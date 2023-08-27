import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import BlogsPage from './pages/BlogsPage';
import Register from './pages/register';
import AllBlogs from './pages/AllBlogs';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<AllBlogs/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/my-blogs" element={<BlogsPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;



