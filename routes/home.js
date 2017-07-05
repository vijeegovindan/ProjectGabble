const routes = require('express').Router();
const models = require('../models');
const sequelize = require("sequelize");

//Get Messages of other users who has notlogged in yet
const getUserMessages = function(req, res, next) {
   models.tbl_messages.findAll({
        order: [['createdAt','DESC']],
         where: {
           user_id: req.session.userid
         },
         include: [{
           model: models.tbl_user,
           as: "gabs"
         }],

   }).then(function(userMsg) {
     if (userMsg) {
       req.userMsg = userMsg;
       next();
     } else {
       res.status(404).send("Record not found - User Message");
     }
   });
 }
//Get Messages of users logged in the system
const getAllMessages = function(req, res, next) {
   models.tbl_messages.findAll({
        order: [['createdAt','DESC']],
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

//Display Gabble
routes.get("/home", getUserMessages, getAllMessages, function(req, res){

  res.render("home",{allMsg:req.AllMsg,
                     userMsg:req.userMsg,
                     sessionExist:req.session.username,
                     userFullName: req.session.name});
});
//Delete and like functionality of user Messages
routes.post("/home", getUserMessages, getAllMessages, function(req, res){

  let allMsg = req.AllMsg;
  let userMsg = req.userMsg;

  if(req.body.action =="likeOthersMsg" || req.body.action =="likeUserMsg" )
  {
      models.tbl_likes.findOrCreate({
      where: {
        messsage_id: req.body.id_hidden,
        user_id: req.session.userid
      }
    }).catch(sequelize.ValidationError, function(err) {
      console.log("Not Valid! ", err);
    }).catch(sequelize.UniqueConstraintError, function(err) {
      console.log("Not Unique! ", err);
    }).spread(function(like, created){
        res.redirect("/likes?msgId=" + req.body.id_hidden);
    });
  }
  else if(req.body.action =="delUserMsg"){
    models.tbl_messages.findById(req.body.id_hidden).then(function(msg){
      msg.destroy().then(function(){
        res.redirect("/home");
      });
    });
  }
});
module.exports = routes;
