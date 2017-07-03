'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'tbl_messages',
      'user_id',
      {
        type:Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id"
        }
      }
    )

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'tbl_messages',
      'user_id'
    )
  }
};
