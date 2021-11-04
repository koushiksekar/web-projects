const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js")

var foods = ["chicken","prawn","fish"];
var food1 = [];
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    const day = date.getdate1();

res.render("week", {myKindaDay: day,newDish : foods});
})

app.post("/", function(req,res){
   var food = req.body.L1;
if(req.body.button === "work"){
    food1.push(food);
    res.redirect("/home");
}else{
    foods.push(food);
   res.redirect("/");
}

  
})

app.get("/home",function(req,res){
    res.render("week", {myKindaDay:"work done",newDish: food1 });
})

app.get("/new",function(req,res){
    res.render("my-new");
})




app.listen(3000,function(){
    console.log("app have been started at port 3000");
})