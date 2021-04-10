"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("dash_agenda_sem", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dom: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      seg: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ter: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qua: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      qui: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sex: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sab: {
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
    return queryInterface.dropTable("dash_agenda_sem");
  },
};
