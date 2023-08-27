const express = require('express');
const connectMongoDb = require('./connection');

const app = express();
const port = 5000;

const userRouter = require('./routes/userRoutes');

connectMongoDb()
  .then(() => {
    
    app.listen(port, () => {
      console.log("Example app listening on port", port);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});