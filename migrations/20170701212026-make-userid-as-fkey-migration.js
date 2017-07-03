'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addConstraint(
      'tbl_likes',
      ['user_id'],
      {
        type: 'FOREIGN KEY',
        name: 'user_id_fkey_constraint',
        references:{
          table: 'tbl_users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeConstraint('tbl_likes','user_id_fkey_constraint');
  }
};
