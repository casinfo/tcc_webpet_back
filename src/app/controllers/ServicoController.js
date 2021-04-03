import * as Yup from "yup";

import Servico from "../models/Servico";
import Usuario from "../models/Usuario";

class ServicoController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaServicos = await Servico.findAll(query);

    return res.json(listaServicos);
  }

  async store(req, res) {

    const UsuarioAutorizado = await Usuario.findOne({
      where: { id: req.id_usuario, tipo_usuario: "A"}
    });

    if (!UsuarioAutorizado) {
      return res.status(401).json({ error: 'Usuário não tem perfil de administrador.' });
    }

    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
      tempo_medio: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Validação falhou, tente novamente ou contate o suporte!",
      });
    }

    const servico = await Servico.create(req.body);

    return res.json(servico);
  }

  async update(req, res) {
    const UsuarioAutorizado = await Usuario.findOne({
      where: { id: req.id_usuario, tipo_usuario: "A"}
    });

    if (!UsuarioAutorizado) {
      return res.status(401).json({ error: 'Usuário não tem perfil de administrador.' });
    }

    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
      tempo_medio: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Validação falhou, tente novamente ou contate o suporte!",
      });
    }

    const { id } = req.params;

    const servico = await Servico.findOne({
      where: { id: id }
    });

    if (servico === null) {
      return res.status(400).json("Serviço não existe.");
    }

    const { descricao, tempo_medio } = req.body;

    const servicoAtualizado = await servico.update({ descricao, tempo_medio});

    return res.json(servicoAtualizado);
  }

  async delete(req, res) {
    const UsuarioAutorizado = await Usuario.findOne({
      where: { id: req.id_usuario, tipo_usuario: "A" },
    });

    if (!UsuarioAutorizado) {
      return res
        .status(401)
        .json({ error: "Usuário não tem perfil de administrador." });
    }
    const { id } = req.params;

    const servico = await Servico.destroy({ where: { id } });

    if (servico <= 0) {
      return res.status(400).json("Serviço não existe.");
    }

    return res.json("Serviço deletado com sucesso.");
  }
}

export default new ServicoController();
