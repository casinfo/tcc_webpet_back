import DashPets from "../models/DashPets";

class DashPetsController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaDashPets = await DashPets.findAll(query);

    return res.json(listaDashPets);
  }

  async store(req, res) {
    const dashpets = await DashPets.create(req.body);

    return res.json(dashpets);
  }

  async update(req, res) {
    const { id } = req.params;

    const dashpets = await DashPets.findOne({
      where: { id: id },
    });

    if (dashpets === null) {
      res.json({
        status: 400,
        error: "Dashboard de Pets não existe!",
      });
    }

    const { ano, mes, qtd, tot } = req.body;

    const dashpetsAtualizado = await DashPets.update({
      ano,
      mes,
      qtd,
      tot,
    });

    return res.json(dashpetsAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const dashpets = await DashPets.destroy({ where: { id } });

    if (dashpets <= 0) {
      res.json({
        status: 400,
        error: "Dashboard de Pets não encontrado!",
      });
    }
  }
}

export default new DashPetsController();
