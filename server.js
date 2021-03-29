// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Requiring Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Setting Dependencies
// Requiring bodyParser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Requiring Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initializing the main project folder
app.use(express.static('website'));

// Setting up Server port
const port = 8000;

//Spinning up the server
const server = app.listen(port, listening);

//Callback to debug
function listening() {
    console.log('server is');
    console.log(`running on localhost: ${port}`);
};

// Initializing all routes with a callback function
// get Route
app.get('/all', sendData);

//callback function
function sendData(req, res) {
    res.send(projectData);
    
}

// Post Route
app.post('/add', addData);

//callback function
function addData(req,res){
       projectData = { 
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
    res.send(projectData);
        console.log(req.body);
   
}



    


