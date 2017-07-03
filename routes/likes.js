const routes = require('express').Router();
const models = require('../models');

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

routes.get('/likes', getMessage, function(req, res) {
  res.render("likes", {allMsg:req.Msg, sessionExist:req.session.username});
});

routes.get("/likes/:msgId/display", function(req, res){

});


module.exports = routes;
