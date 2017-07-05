const routes = require('express').Router();
const models = require('../models');

routes.get("/logout", function(req, res){
  req.session.destroy();
  res.redirect("/");
});
module.exports = routes;
