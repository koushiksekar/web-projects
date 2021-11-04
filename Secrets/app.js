require('dotenv').config()
const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: "my new code",
    resave: false,
    saveUninitialized: false,
  }))
  app.use(passport.initialize());
  app.use(passport.session());  

mongoose.connect('mongodb://localhost:27017/SecretsDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const Schema = new mongoose.Schema({
    email: String,
    password: String,
    googleId: String,
    facebookId: String,
    secrets: String
});

Schema.plugin(passportLocalMongoose);
Schema.plugin(findOrCreate);

const user = mongoose.model('User',Schema);
passport.use(user.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
    user.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
    user.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/",function(req,res){
    res.render("home");
});



app.get("/register",function(req,res){
    res.render("register");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/secrets",function(req,res){
    if(req.isAuthenticated()){
        user.find({"secrets":{$ne:null}},function(err,foundItems){
            if(err){
                console.log(err);
            }else{
                if(foundItems){
                    res.render("secrets",{userWithsecrets:foundItems});
                }
            }
        })
    }else{
        res.redirect("/login");
    }
   
});

app.get("/submit",function(req,res){
    if(req.isAuthenticated()){
        res.render("submit");
    }else{
        res.redirect("/login");
    }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });  

  app.get('/auth/facebook',
  passport.authenticate('facebook'));

  app.get('/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

app.post("/register",function(req,res){
    user.register({username:req.body.username},req.body.password,function(err,user){
       if(err){
           console.log(err);
           res.redirect("/register");
       }else{
           passport.authenticate("local")(req,res,function(){
               res.redirect("/secrets");
           });
       }
    });
 
});

app.post("/login",function(req,res){
   const user1 = new user({
       username:req.body.username,
       password:req.body.password
   });

   req.login(user1,function(err){
       if(err){
           console.log(err);
       }else{
           passport.authenticate("local")(req,res,function(){
               res.redirect("/secrets");
           });
       }
   });

});

app.post("/submit",function(req,res){
    const collectedSecret = req.body.secret;
    user.findById(req.user.id,function(err,foundItems){
        if(err){
            console.log(err);
        }else{
            if(foundItems){
                foundItems.secrets=collectedSecret;
                foundItems.save(function(){
                    res.redirect("/secrets");
                })
            }
        }
    })
})

app.listen(3000,function(){
    console.log("sever started running in the port 3000");
});