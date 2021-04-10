import Sequelize, { Model } from "sequelize";

class DashAgendaSem extends Model {
  static init(sequelize) {
    super.init(
      {
        dom: Sequelize.INTEGER,
        seg: Sequelize.INTEGER,
        ter: Sequelize.INTEGER,
        qua: Sequelize.INTEGER,
        qui: Sequelize.INTEGER,
        sex: Sequelize.INTEGER,
        sab: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default DashAgendaSem;
