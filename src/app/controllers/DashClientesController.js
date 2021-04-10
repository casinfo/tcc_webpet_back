import DashClientes from "../models/DashClientes";

class DashClientesController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaDashClientes = await DashClientes.findAll(query);

    return res.json(listaDashClientes);
  }

  async store(req, res) {
    const dashclientes = await DashClientes.create(req.body);

    return res.json(dashclientes);
  }

  async update(req, res) {
    const { id } = req.params;

    const dashclientes = await DashClientes.findOne({
      where: { id: id },
    });

    if (dashclientes === null) {
      res.json({
        status: 400,
        error: "Dashboard de Clientes não existe!",
      });
    }

    const { ano, mes, qtd, tot } = req.body;

    const dashclientesAtualizado = await DashClientes.update({
      ano,
      mes,
      qtd,
      tot,
    });

    return res.json(dashclientesAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const dashclientes = await DashClientes.destroy({ where: { id } });

    if (dashclientes <= 0) {
      res.json({
        status: 400,
        error: "Dashboard de Clientes não encontrado!",
      });
    }
  }
}

export default new DashClientesController();
