import DashServicos from "../models/DashServicos";

class DashServicosController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaDashServicos = await DashServicos.findAll(query);

    return res.json(listaDashServicos);
  }

  async store(req, res) {
    const dashservico = await DashServicos.create(req.body);

    return res.json(dashservico);
  }

  async update(req, res) {
    const { id } = req.params;

    const dashservico = await DashServicos.findOne({
      where: { id: id },
    });

    if (dashservico === null) {
      res.json({
        status: 400,
        error: "Dashboard de Serviço não existe!",
      });
    }

    const { id_servico, ano, mes, qtd, tot } = req.body;

    const dashservicoAtualizado = await DashServicos.update({
      id_servico,
      ano,
      mes,
      qtd,
      tot,
    });

    return res.json(dashservicoAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const dashservico = await DashServicos.destroy({ where: { id } });

    if (dashservico <= 0) {
      res.json({
        status: 400,
        error: "Dashboard de Serviço não encontrado!",
      });
    }
  }
}

export default new DashServicosController();
