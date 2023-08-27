const express = require('express');
const connectMongoDb = require('./connection');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');



const app = express();
const port = 5000;
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your actual frontend domain
  credentials: true, // If your frontend sends cookies or other credentials
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');

app.use('/api/v1', userRouter); 
app.use('/api/v1', blogRouter);





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