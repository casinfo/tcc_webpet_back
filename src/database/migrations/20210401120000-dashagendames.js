"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("dash_agenda_mes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sem1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sem2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sem3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sem4: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sem5: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("dash_agenda_mes");
  },
};
