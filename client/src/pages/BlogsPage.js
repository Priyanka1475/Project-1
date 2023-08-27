import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BlogsPage() {
  const navigate = useNavigate();

  const [Blogs, setBlogs] = useState([]);

  const fetchUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId');
      
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwtoken='))
        .split('=')[1];

      const response = await fetch(`http://localhost:5000/api/v1/user-blog/${id}`,{
        method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
      });

      const data = await response.json();

      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user blogs:', error);
      // You might want to display an error message to the user
    }
  };

  useEffect(() => {
    fetchUserBlogs(); // Renamed the function for clarity
  }, []);

 

  return (
    <div>
      
    </div>
  );
}

export default BlogsPage;


  

   
 