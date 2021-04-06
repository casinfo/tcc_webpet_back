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
      where: { id: req.id_usuario, tipo_usuario: "A" },
    });

    if (!UsuarioAutorizado) {
      res.json({
        status: 401,
        error: "Usuário não tem perfil de administrador!",
      });
    }

    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
      tempo_medio: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.json({
        status: 401,
        error: "Os dados não foram preenchidos corretamente!",
      });
    }

    const servico = await Servico.create(req.body);

    return res.json(servico);
  }

  async update(req, res) {
    const UsuarioAutorizado = await Usuario.findOne({
      where: { id: req.id_usuario, tipo_usuario: "A" },
    });

    if (!UsuarioAutorizado) {
      res.json({
        status: 401,
        error: "Usuário não tem perfil de administrador!",
      });
    }

    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
      tempo_medio: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.json({
        status: 401,
        error: "Os dados não foram preenchidos corretamente!",
      });
    }

    const { id } = req.params;

    const servico = await Servico.findOne({
      where: { id: id },
    });

    if (servico === null) {
      res.json({
        status: 400,
        error: "Serviço não existe!",
      });
    }

    const { descricao, tempo_medio } = req.body;

    const servicoAtualizado = await servico.update({ descricao, tempo_medio });

    return res.json(servicoAtualizado);
  }

  async delete(req, res) {
    const UsuarioAutorizado = await Usuario.findOne({
      where: { id: req.id_usuario, tipo_usuario: "A" },
    });

    if (!UsuarioAutorizado) {
      res.json({
        status: 401,
        error: "Usuário não tem perfil de Administrador!",
      });
    }
    const { id } = req.params;

    const servico = await Servico.destroy({ where: { id } });

    if (servico <= 0) {
      res.json({
        status: 400,
        error: "Serviço não encontrado!",
      });
    }
  }
}

export default new ServicoController();
