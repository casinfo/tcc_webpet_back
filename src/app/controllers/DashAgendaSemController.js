import DashAgendaSem from "../models/DashAgendaSem";

class DashAgendaSemController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaDashAgendaSem = await DashAgendaSem.findAll(query);

    return res.json(listaDashAgendaSem);
  }

  async store(req, res) {
    const dashagendasem = await DashAgendaSem.create(req.body);

    return res.json(dashagendasem);
  }

  async update(req, res) {
    const { id } = req.params;

    const dashagendasem = await DashAgendaSem.findOne({
      where: { id: id },
    });

    if (dashagendasem === null) {
      res.json({
        status: 400,
        error: "Dashboard Agenda Semanal não existe!",
      });
    }

    const { dom, seg, ter, qua, qui, sex, sab } = req.body;

    const dashagendasemAtualizado = await DashAgendaSem.update({
      dom,
      seg,
      ter,
      qua,
      qui,
      sex,
      sab,
    });

    return res.json(dashagendasemAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const dashagendasem = await DashAgendaSem.destroy({ where: { id } });

    if (dashagendasem <= 0) {
      res.json({
        status: 400,
        error: "Dashboard Agenda Semanal não encontrado!",
      });
    }
  }
}

export default new DashAgendaSemController();
