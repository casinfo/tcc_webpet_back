import Sequelize, { Model } from "sequelize";

class DashServicos extends Model {
  static init(sequelize) {
    super.init(
      {
        id_servico: Sequelize.INTEGER,
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

export default DashServicos;
