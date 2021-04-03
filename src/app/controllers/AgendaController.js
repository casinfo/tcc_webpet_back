import * as Yup from "yup";

import Agenda from "../models/Agenda";

class AgendaController {
  async index(req, res) {

    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaAgenda = await Agenda.findAll(query);

    return res.json(listaAgenda);
  }

  async store(req, res) {

    const schema = Yup.object().shape({
      id_usuario: Yup.number().required(),
      id_cliente: Yup.number().required(),
      id_servico: Yup.number().required(),
      id_pet: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({
          error: "Validação falhou, tente novamente ou contate o suporte!",
        });
    }

    const agenda = await Agenda.create(req.body);

    return res.json(agenda);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id_usuario: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({
          error: "Validação falhou, tente novamente ou contate o suporte!",
        });
    }

    const { id } = req.params;

    const agenda = await Agenda.findByPk(id);

    const agendaAtualizada = await agenda.update(req.body);

    return res.json(agendaAtualizada);
  }

  async delete(req, res) {
    const { id } = req.params;

    const agenda = await Agenda.destroy({ where: { id } });

    if (agenda <= 0) {
      return res.status(400).json("Agendamento não existe.");
    }

    return res.json("Agendamento deletado com sucesso.");
  }

}

export default new AgendaController();
