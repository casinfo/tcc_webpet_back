"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("agendas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: { model: "clientes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      id_pet: {
        type: Sequelize.INTEGER,
        references: { model: "pets", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      id_servico: {
        type: Sequelize.INTEGER,
        references: { model: "servicos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hora: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      observacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      concluido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hora_conclusao: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("agendas");
  },
};
