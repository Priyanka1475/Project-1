import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function BlogsPage() {
  const navigate = useNavigate();

  const [Blogs, setBlogs] = useState([]);

  const fetchUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId');
      const token = Cookies.get('jwtoken');
      console.log(token);
        const response = await fetch(`http://localhost:5000/api/v1/user-blog/${id}`,{
        method: 'GET',
        headers : {
          Accept : "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
  
      });

      const data = await response.json();

      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user blogs:', error);
     
    }
  };

  useEffect(() => {
    fetchUserBlogs(); 
  }, []);

 

  return (
    <div>
      
    </div>
  );
}

export default BlogsPage;


  

   
 