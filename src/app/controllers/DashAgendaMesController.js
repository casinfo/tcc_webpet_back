import DashAgendaMes from "../models/DashAgendaMes";

class DashAgendaMesController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaDashAgendaMes = await DashAgendaMes.findAll(query);

    return res.json(listaDashAgendaMes);
  }

  async store(req, res) {
    const dashagendames = await DashAgendaMes.create(req.body);

    return res.json(dashagendames);
  }

  async update(req, res) {
    const { id } = req.params;

    const dashagendames = await DashAgendaMes.findOne({
      where: { id: id },
    });

    if (dashagendames === null) {
      res.json({
        status: 400,
        error: "Dashboard Agenda Mes não existe!",
      });
    }

    const { sem1, sem2, sem3, sem4, sem5 } = req.body;

    const dashagendamesAtualizado = await DashAgendaMes.update({
      sem1,
      sem2,
      sem3,
      sem4,
      sem5,
    });

    return res.json(dashagendamesAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const dashagendames = await DashAgendaMes.destroy({ where: { id } });

    if (dashagendames <= 0) {
      res.json({
        status: 400,
        error: "Dashboard Agenda Mes não encontrado!",
      });
    }
  }
}

export default new DashAgendaMesController();
