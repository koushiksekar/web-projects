const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});

const wikiSchema = {
    title: String,
    content: String
}

const article = mongoose.model('Article',wikiSchema);

const article1 = new article({
    title: "Bootstrap",
    content: "its a framework which consists of css class names which is used for development"
});

const article2 = new article({
    title: "DOM",
    content: "its like an api to interact with the html"
});

const article3 = new article({
    title: "API",
    content: "Application programming interface. its an communication protocol which is used to building a software"
});

const article4 = new article({
    title: "REST",
    content: "Representational state transfer. its a architectural style of api"
});

const articles = [article1,article2,article3,article4];

app.route("/articles")
     .get(function(req,res){
           article.find({},function(err,foundItems){
           if(foundItems.length===0){
             article.insertMany(articles,function(err){
               if(err){
                    console.log(err);
               }else{
                   console.log("successfully inserted the articles");
               }
           })
           res.redirect("/articles");
        }else{
            res.send(foundItems);
        }
    })
})
    .post(function(req,res){
       const article5 = new article({
        title:req.body.title,
        content:req.body.content
    })
      article5.save(function(err){
        if(err){
            res.send(err);
        }else{
            res.send("successfully saved the article");
        }
    })

})
    .delete(function(req,res){
    article.deleteMany({},function(err){
        if(err){
            res.send(err);
        }else{
            res.send("successfully deleted all articles");
        }
    })
})

///to target specific route ////

app.route("/articles/:articleTitle")
      .get(function(req,res){
          article.findOne({title:req.params.articleTitle},
            function(err,foundItems){
                if(err){
                    res.send(err);
                }else{
                    res.send(foundItems);
                }
            })
      })
      .put(function(req,res){
          article.update({title:req.params.articleTitle},
            {title:req.body.title, content:req.body.content},
            {overwrite: true},
            function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("successfully updated entire article");
                }
            })
      })
      .patch(function(req,res){
          article.update({title:req.params.articleTitle},
            {$set:req.body},
            function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("successfully updated the particular article");
                }
            })
      })
      .delete(function(req,res){
          article.deleteOne({title:req.params.articleTitle},
            function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send("successfully deleted the specific article");
                }
            })
      })


app.listen(3000,function(){
  console.log("app started working in port 3000");
})