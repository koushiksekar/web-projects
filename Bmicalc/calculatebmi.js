const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/",function(req,res){
    var height = req.body.height;
    var weight = req.body.weight;
    var bmicalc = weight/(height*height);  
   res.send("your BMI is "+ bmicalc );
});

app.listen(3000,function(){
    console.log("server has been iniatialised at port 3000");
});

