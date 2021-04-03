import Sequelize, { Model } from 'sequelize';

class Pets extends Model {
  static init(sequelize) {
    super.init(
      {

        nome: Sequelize.STRING,
        especie: Sequelize.STRING,
        raca: Sequelize.STRING,
        data_nascto: Sequelize.DATE,
        peso: Sequelize.INTEGER,
        vacinado: Sequelize.STRING,
        porte: Sequelize.STRING,
        sexo: Sequelize.STRING
      },
      {
        sequelize
      });
  }

  static associate(models) {
    this.hasMany(models.Agenda,  { foreignKey: 'id_pet' });
    this.belongsTo(models.Cliente, { foreignKey: 'id_cliente' });
  }
}

export default Pets;
