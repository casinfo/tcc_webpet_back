import Sequelize, { Model } from "sequelize";

class DashAgendaMes extends Model {
  static init(sequelize) {
    super.init(
      {
        sem1: Sequelize.INTEGER,
        sem2: Sequelize.INTEGER,
        sem3: Sequelize.INTEGER,
        sem4: Sequelize.INTEGER,
        sem5: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default DashAgendaMes;
