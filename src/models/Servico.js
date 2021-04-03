const { Model, DataTypes } = require('sequalize');

class Servico extends Model {
    static init(connection) {
        super.init({
            id_servico: DataTypes.INTEGER,
            descricao: DataTypes.STRING,
            tempo_medio: DataTypes.INTEGER
        })
    }
}

module.exports = Servico;
