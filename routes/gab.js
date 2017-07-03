const routes = require('express').Router();
const models = require('../models');

 routes.get("/newgab", function(req, res){
  res.render("newgab", {sessionExist:req.session.username});
});

routes.post("/newgab", function(req, res){

  let errors = "";
  req.checkBody("newgab", "Enter gab and submit").notEmpty();
  req.getValidationResult().then(function(errors) {
    if(errors.isEmpty()){
        models.tbl_messages.create({
          messages: req.body.newgab,
          user_id: req.session.userid
        }).then(function(gab) {
        res.redirect("/home");
        });
      }
      else {
          console.log("errors");
          res.render("newgab",  {messages: errors.array(), sessionExist:req.session.username});
      }
  });
});

module.exports = routes;
