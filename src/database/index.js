import Sequelize from "sequelize";
// Config
import databaseConfig from "../config/database";
// Models
import Usuario from "../app/models/Usuario";
import Cliente from "../app/models/Cliente";
import Pets from "../app/models/Pets";
import Servico from "../app/models/Servico";
import Agenda from "../app/models/Agenda";
import DashClientes from "../app/models/DashClientes";
import DashPets from "../app/models/DashPets";
import DashServicos from "../app/models/DashServicos";
import DashAgendaMes from "../app/models/DashAgendaMes";
import DashAgendaSem from "../app/models/DashAgendaSem";

const models = [
  Usuario,
  Cliente,
  Pets,
  Servico,
  Agenda,
  DashClientes,
  DashPets,
  DashServicos,
  DashAgendaMes,
  DashAgendaSem,
];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
