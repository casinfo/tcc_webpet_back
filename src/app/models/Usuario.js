/* eslint-disable no-param-reassign */
import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
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
        senha: Sequelize.VIRTUAL, // só existirá aqui no código e nunca na base.
        senha_hash: Sequelize.STRING,
        tipo_usuario: Sequelize.STRING
      },
      {
        sequelize,
      },
    );

    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        usuario.senha_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });

    return this;
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }

  static associate(models) {
    this.hasMany(models.Agenda, { foreignKey: 'id_usuario' });
  }
}

export default Usuario;
