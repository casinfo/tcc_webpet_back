import Sequelize, { Model } from 'sequelize';

class Servico extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: Sequelize.STRING,
        tempo_medio: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Agenda, { foreignKey: 'id_servico' });
  }
}

export default Servico;
