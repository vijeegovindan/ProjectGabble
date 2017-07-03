'use strict';
module.exports = function(sequelize, DataTypes) {
  var tbl_messages = sequelize.define('tbl_messages', {
    messages: DataTypes.TEXT,
    user_id: DataTypes.INTEGER
  }, {});

  tbl_messages.associate = function(models) {
    tbl_messages.belongsTo(models.tbl_user, {as: 'gabs', foreignKey: 'user_id'});
  }

  // tbl_messages.associate = function(models){
  //     tbl_messages.belongsToMany(models.tbl_user,
  //                               {as:'like_messages', through: 'tbl_likes', foreignKey: 'messsage_id', otherKey: 'user_id'});
  // }
  //
   return tbl_messages;
};
