import Sequelize from 'sequelize';
// Config
import databaseConfig from '../config/database';
// Models
import Usuario from '../app/models/Usuario';
import Cliente from '../app/models/Cliente';
import Pets from '../app/models/Pets';
import Servico from '../app/models/Servico';
import Agenda from '../app/models/Agenda';

const models = [Usuario, Cliente, Pets, Servico, Agenda];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
