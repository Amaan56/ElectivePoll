const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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

//Start Server
app.listen(port , () => {
console.log("Server starting at " + port);
})