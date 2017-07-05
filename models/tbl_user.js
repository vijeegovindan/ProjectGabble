'use strict';
module.exports = function(sequelize, DataTypes) {
  var tbl_user = sequelize.define('tbl_user', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  tbl_user.associate = function(models) {
       tbl_user.hasMany(models.tbl_messages, {as: 'users', foreignKey: 'user_id'});
       tbl_user.hasMany(models.tbl_likes, {as: 'usersliked', foreignKey: 'user_id'});
  }

  return tbl_user;
};
