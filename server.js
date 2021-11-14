// Setup empty JS object to act as endpoint for all routes
projectData = {
    temp: "",
    date: "",
    feelings: ""
};

// Require Express to run server and routes
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

// Start up an instance of app
const app = express()

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('/website'));


/* Routing Section  */
// Home
app.get('/home', function(req, res) {
    // returns projectDate object
    res.send(projectData)
});


/**
 * Update projectData object with from data
 * 
 * @return projectData
 */
app.post('/updateProjectData', function(req, res) {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    };
    console.log(projectData);
    res.send(projectData)
})

// Run Server
const port = 3000;

app.listen(port, ()=> {
    console.log("Started on PORT 3000");
})
