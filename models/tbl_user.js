'use strict';
module.exports = function(sequelize, DataTypes) {
  var tbl_user = sequelize.define('tbl_user', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  tbl_user.associate = function(models) {
       tbl_user.hasMany(models.tbl_messages, {as: 'users', foreignKey: 'user_id'})
  }

  // tbl_user.associate = function(models) {
  //    tbl_user.belongsToMany(models.tbl_messages, {
  //      as: 'like_users', through: models.tbl_likes, foreignKey: 'user_id', otherKey: 'messsage_id'
  //    });
  // }

  return tbl_user;
};
