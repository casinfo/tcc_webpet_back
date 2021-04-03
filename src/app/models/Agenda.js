import Sequelize, { Model } from 'sequelize';

class Agenda extends Model {
  static init(sequelize) {
    super.init(
      {
        data: Sequelize.DATE,
        hora: Sequelize.STRING,
        confirmado: Sequelize.STRING,
        observacao: Sequelize.STRING,
        concluido: Sequelize.STRING,
        hora_conclusao: Sequelize.STRING
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Pets, { foreignKey: 'id_pet' });
    this.belongsTo(models.Cliente, { foreignKey: 'id_cliente' });
    this.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
    this.belongsTo(models.Servico, { foreignKey: 'id_servico' });
  }
}

export default Agenda;
