const routes = require('express').Router();
const models = require('../models');
//User sees this page first
routes.get("/", function(req, res){
  res.render("login", {sessionExist:req.session.userid});
});

routes.get("/login", function(req, res){
  res.render("login", {sessionExist:req.session.id});
});

//Login to the system
//checks invalid login

routes.post('/login',function(req, res){
  let errors = "";
  let messages = [];

  req.checkBody("username", "Please enter username").notEmpty();
  req.checkBody("password", "Please enter password").notEmpty();

  errors = req.validationErrors();
  if(errors) {
    errors.forEach(function(error){
    messages.push(error.msg);
  });
  res.render("login", {messages: messages,
                       sessionExist:req.session.id,
                       userFullName: req.session.name});
  }
  else {
    models.tbl_user.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }})
    .then(function(user){
       if(!user){
         res.render("login", {messages: "Enter a valid username and password"});
       }
       else {
          req.session.username = user.username;
          req.session.userid = user.id;
          req.session.name = user.name;
          res.redirect("/home");
       }
     });
   }
});
module.exports = routes;
