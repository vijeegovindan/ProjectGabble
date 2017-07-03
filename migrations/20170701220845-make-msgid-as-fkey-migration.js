'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    queryInterface.addConstraint(
      'tbl_likes',
      ['messsage_id'],
      {
        type: 'FOREIGN KEY',
        name: 'message_id_fkey_constraint',
        references:{
          table: 'tbl_messages',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    );

  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeConstraint('tbl_likes','message_id_fkey_constraint');
  }
};
