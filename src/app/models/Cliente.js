import Sequelize, { Model } from 'sequelize';

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        cep: Sequelize.STRING,
        endereco: Sequelize.STRING,
        numero: Sequelize.STRING,
        complemento: Sequelize.STRING,
        bairro: Sequelize.STRING,
        cidade: Sequelize.STRING,
        uf: Sequelize.STRING,
        fone: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.hasMany(models.Pets, { foreignKey: 'id_cliente' });
    this.hasMany(models.Agenda, { foreignKey: 'id_cliente' });
   }
}

export default Cliente;
