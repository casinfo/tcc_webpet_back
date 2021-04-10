import Sequelize, { Model } from "sequelize";

class DashClientes extends Model {
  static init(sequelize) {
    super.init(
      {
        ano: Sequelize.INTEGER,
        mes: Sequelize.INTEGER,
        qtd: Sequelize.INTEGER,
        tot: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default DashClientes;
