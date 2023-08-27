import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { Card, Button } from 'react-bootstrap'; // Import specific Bootstrap components

function BlogCard({title , content , image }) {
  return (
   
    <div className="App">
    <Card style={{ width: '30rem', margin: 'auto', padding: '5px', marginTop: '40px', boxShadow: '5px 5px 10px #ccc', transition: 'box-shadow 0.3s' }}>
  <Card.Img variant="top" src={image} style={{ height: '200px', objectFit: 'cover' }} />
  <Card.Body style={{ height: '200px' }}>
    <Card.Title>{title}</Card.Title>
    <Card.Text>
      {content}
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>

    </div>
  );
}




export default BlogCard;

