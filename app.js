const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

//Set Public folder
app.use(express.static(path.join(__dirname,'public')));

//body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Enable cors
app.use(cors());

const port = 4000 ;

//Start Server
app.listen(port , () => {
console.log("Server starting at " + port);
})