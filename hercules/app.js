//importing modules
//Import * as app from './expree';
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const userRouter = require("./routes/user.routes");

var app = express();
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');




mongoose.connect("mongodb://localhost:27017/userdb");

mongoose.connection.on('connected',() => {
    console.log('Mongo db has been connected');
});

mongoose.connection.on('error', (err) => {
    if(err) {
        console.log("Error in Database connection : ", err);
    }
    

});
const port =  process.env.PORT || 3000;

app.use(cors());

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "public")));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/", userRouter);

app.get('/', (req, res) => {
    res.send("Atlas");
});

app.listen(port, ()=>{
    console.log(`server started on port: $port`)
});
