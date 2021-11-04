const express = require("express");
const app = express();

app.get("/",function(request,response){
    response.send("<h1>hello</h1>");
});

app.get("/contact",function(req,res){
    res.send("contact me at: www.koushiksekar98@gmail.com");
});

app.get("/about",function(req,res){
  res.send("iam koushik and i love coding");
});

app.get("/hobbies",function(req,res){
    res.send("<ul><li>pubg</li><li>playstation</li></ul>");
})

app.listen(3000,function(){
    console.log("server has been started at port 3000");
});

