import Sequelize, { Model } from "sequelize";

class DashPets extends Model {
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

export default DashPets;
