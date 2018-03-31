const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const poll = require('./routes/poll');

//Set Public folder
app.use(express.static(path.join(__dirname,'public')));

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Enable cors
app.use(cors());

app.use('/poll',poll);

const port = 4000 ;

//Databse Connectivity
mongoose.connect('mongodb://Amaan56:password@ds231229.mlab.com:31229/electivepoll', err =>{
    if(err){
        throw err;
    }else{
        console.log("Databse Connected");
    }
});

//Start Server
app.listen(port , () => {
console.log("Server starting at " + port);
})