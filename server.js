/** @format */
const port = 8000;
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//GET request:
app.get('/allData', (requst, response) => {
  response.send(projectData);
});
//POST request
app.post('/addData', (request, response) => {
  const newContent = {
    temp: request.body.temp,
    date: request.body.date,
    feeling: request.body.feeling,
  };
  projectData = newContent;
  response.send(projectData);
  return projectData;
});
// RUNNING THE SERVER ON PORT 8000

const server = app.listen(port, () => {
  console.log(`The server is running on Port number: ${port}`);
});
