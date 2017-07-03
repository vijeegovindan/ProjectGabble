const routes = require('express').Router();
const models = require('../models');

const getUserMessages = function(req, res, next) {
   models.tbl_messages.findAll({
         where: {
           user_id: req.session.userid
         },
         include: [{
           model: models.tbl_user,
           as: "gabs"
         }]
   }).then(function(userMsg) {
     if (userMsg) {
       req.userMsg = userMsg;
       next();
     } else {
       res.status(404).send("Record not found - User Message");
     }
   });
 }

const getAllMessages = function(req, res, next) {
   models.tbl_messages.findAll({
         where: {
           user_id: {$not:req.session.userid}
         },
         include: [{
           model: models.tbl_user,
           as: "gabs"
         }]
   }).then(function(userMsg) {
     if (userMsg) {
       req.AllMsg = userMsg;
       next();
     } else {
       res.status(404).send("Record not found - All Messages");
     }
   });
 }

routes.get("/home", getUserMessages, getAllMessages, function(req, res){
  res.render("home",{allMsg:req.AllMsg, userMsg:req.userMsg,sessionExist:req.session.username});
});

routes.post("/home", getUserMessages, getAllMessages, function(req, res){
  let allMsg = req.AllMsg;
  let userMsg = req.userMsg;

  if(req.body.action =="update")
  {
    models.tbl_likes.findOrCreate({
      where: {
        messsage_id: req.body.id_update,
        user_id: req.session.userid
      }
      }).spread(function(like, created){
        res.redirect("/likes?msgId=" + req.body.id_update);
    });
  }
  else if(req.body.action =="delete"){
    models.tbl_messages.findById(req.body.id_delete).then(function(msg){
      msg.destroy().then(function(){
      res.redirect("/home");
      });
    });
  }
});

routes.get("/home/logout", function(req, res){
  req.session.destroy();
  res.redirect("/login");
});

module.exports = routes;
