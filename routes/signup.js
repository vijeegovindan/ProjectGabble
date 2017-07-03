const routes = require('express').Router();
const models = require('../models');

routes.get("/signup", function(req, res){
  res.render("signup", {sessionExist:req.session.username});
});

routes.post("/signup", function(req, res){

  let errors = "";
  let messages = [];

  req.checkBody("yourname", "Please enter your name").notEmpty().isLength({max: 30});
  req.checkBody("username", "Please enter a valid username").notEmpty().isLength({max: 30});
  req.checkBody("password", "Please enter a Password").notEmpty();
  req.checkBody("confirmpassword","Please enter a confirm Password").notEmpty();
  req.checkBody("confirmpassword","Passwords do not match").equals(req.body.password);

  errors = req.validationErrors();
  if(errors) {
    errors.forEach(function(error){
    messages.push(error.msg);
  });
  res.render("signup", {messages: messages, sessionExist:req.session.username});
  }
  else {
    models.tbl_user.findOrCreate({
      where: {
        username: req.body.username
      },
      defaults:{
        name: req.body.yourname,
        password:req.body.password
      }
    }).spread(function(user, created){
      if(!created) {
        res.render("signup", {messages: "Username already exists", sessionExist:req.session.username});
      }
      else{
        res.render("login", {sessionExist:req.session.username});
      }
    });
  }
  });

module.exports = routes;
