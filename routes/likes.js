const routes = require('express').Router();
const models = require('../models');
//Get the message based on the message clicked
const getMessage = function(req, res, next) {
   models.tbl_messages.findOne({
         where: {
           id: req.query.msgId
         },
         include: [{
           model: models.tbl_user,
           as: "gabs"
         }]
   }).then(function(userMsg) {
     if (userMsg) {
       req.Msg = userMsg;
       next();
     } else {
       res.status(404).send("Record not found - User Message");
     }
   });
 }
//Display all the users liked the message so far
  const getLikedUsersList = function(req,res, next){
     models.tbl_likes.findAll({
       where:{
          messsage_id:req.query.msgId
         },
       include: [{
          model: models.tbl_user,
          as: "likeusers",
       include: [{
            model: models.tbl_messages,
            as: "users"
          }]
        }]
      }).then(function(users){
       if(users){
         req.likedUsersList = users;
         next();
       } else {
          res.status(404).send("Records not found - List of users liked the message");
      }
   });
  }
//Get number of persons liked the message , the count
  const getNumberOfLikes = function(req, res, next){
    models.tbl_messages.findAndCountAll({
      where:{
        id : req.query.msgId
      },
      include: [{
         model: models.tbl_likes,
         as: "gabsliked",
       }]
     }).then(function(users){
      if(users){
        if(users.count == 0){
            req.countUsersLiked  = false;
        }
        else{
            req.countUsersLiked  = users.count;
        }
       next();
     }
     else {
       res.status(404).send("Records not found - Error in the count");
      }
   });
  }

// Page Display 
routes.get('/likes', getMessage, getLikedUsersList, getNumberOfLikes, function(req, res) {
                      res.render("likes", {allMsg:req.Msg,
                       likedUsersList: req.likedUsersList,
                       getNumberOfLikes: req.countUsersLiked,
                       sessionExist:req.session.username,
                       userFullName: req.session.name});
});


module.exports = routes;
