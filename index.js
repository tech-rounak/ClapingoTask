const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const app = express();
require('./models/db');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('/user',require('./routes/user'));
app.listen(3000,()=>{
    console.log("server is running at port 3000");
})