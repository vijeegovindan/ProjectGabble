'use strict';
module.exports = function(sequelize, DataTypes) {
  var tbl_likes = sequelize.define('tbl_likes', {
    user_id: DataTypes.INTEGER,
    messsage_id: DataTypes.INTEGER
  }, {});

  tbl_likes.associate = function(models) {
    tbl_likes.belongsTo(models.tbl_user, { as: "likeusers", foreignKey: 'user_id'});
    tbl_likes.belongsTo(models.tbl_messages, {as: "likegabs", foreignKey: 'messsage_id'});
  }

  return tbl_likes;
};
