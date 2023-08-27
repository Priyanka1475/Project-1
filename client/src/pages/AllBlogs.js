import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';


function AllBlogs() {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/all-blogs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        setBlogs(data.blogs);
        console.log('data');
      } else {
        window.alert('Error fetching blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
  <div>
  {blogs.map((blog) => (
    <BlogCard
    title = {blog.title}
    content = {blog.content}
    image = {blog.imageUrl}
    author = {blog.author}
    key = {blog.id}/> 
  ))}
</div>
  )
}

export default AllBlogs;
