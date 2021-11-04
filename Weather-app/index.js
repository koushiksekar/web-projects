const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

  app.use(bodyParser.urlencoded({extended:true}));

  app.get("/",function(req,res){
     res.sendFile(__dirname + "/index.html");
   });

   app.post("/",function(req,res){
       console.log(req.body.city);

       const cityName = req.body.city;
       const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=ab9fd866902d79408b798c04cc0e8564" 
   
       https.get(url,function(response){
           console.log(response.statusCode);
     
           response.on("data",function(data){
               const weatherData = JSON.parse(data);
               console.log(weatherData);
               const Temp = weatherData.main.temp;
               console.log(Temp);
               
               const person = {
                   Name:"koushik",
                   Age:23,
                   Quali: "BSC",
                   Hobbies: "Painting"
               };
              console.log( JSON.stringify(person));
     
              const icon = weatherData.weather[0].icon;
              const urlIcon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
     
              res.write("<h1>the pressure in city is " + Temp + " degree</h1>");
              res.write("<img src=" + urlIcon +  ">");
     
              res.send();
           })
       })
   })

 


app.listen(3000, function(){
    console.log("server has been started in port 3000");
});