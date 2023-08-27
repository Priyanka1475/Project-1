 

 
const express = require('express');
const app = express();
 
const mongoose = require('mongoose');

async function connectMongoDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogdb");
    console.log("Connected successfully to the database");
  } catch (error) {
    console.log("Error connecting to the database", error);
    throw error; 
  }
}

module.exports = connectMongoDb;
