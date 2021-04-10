import * as Yup from "yup";

import Cliente from "../models/Cliente";
import Usuario from "../models/Usuario";

class ClienteController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaClientes = await Cliente.findAll(query);

    return res.json(listaClientes);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      cpf: Yup.string().required().min(11),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({
        status: 400,
        error: "Nome, e-mail e cpf devem ser preenchidos!",
      });
    }

    const clienteExiste = await Cliente.findOne({
      where: { email: req.body.email },
    });

    if (clienteExiste) {
      return res.json({
        status: 400,
        error: "Cliente já existe com este e-mail!",
      });
    }

    const cliente = await Cliente.create(req.body);

    return res.json(cliente);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({
        status: 400,
        error: "Nome, e-mail e cpf, devem ser preenchidos!",
      });
    }

    const { id } = req.params;
    const { email } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (email && email !== cliente.email) {
      const clienteExiste = await Cliente.findOne({
        where: { email },
      });

      if (clienteExiste) {
        return res.json({
          status: 400,
          error: "Clliente já cadastrado!",
        });
      }
    }

    const clienteAtualizado = await cliente.update(req.body);

    return res.json(clienteAtualizado);
  }

  async delete(req, res) {
    const UsuarioAutorizado = await Usuario.findOne({
      where: { id: req.id_usuario, tipo_usuario: "A" },
    });

    const { id } = req.params;

    const usuario = await Cliente.destroy({ where: { id } });

    if (usuario <= 0) {
      return res.json({
        status: 400,
        error: "Clliente não cadastrado!",
      });
    }

    return res.json("Cliente deletado com sucesso.");
  }
}
export default new ClienteController();
