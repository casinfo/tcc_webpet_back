import * as Yup from 'yup';

import Usuario from "../models/Usuario";

class UsuarioController {

  async index(req, res) {

    const UsuarioAutorizado = await Usuario.findOne({
      where: { id: req.id_usuario, tipo_usuario: "A"}
    });

    //if (!UsuarioAutorizado) {
    //  return res.status(401).json({ error: 'Usuário não tem perfil de administrador.' });
    //}

    const { id } = req.query;
    const query = id ? { where: { id } } : {};   
    const usuario = await Usuario.findAll(query);   

    return res.json(usuario);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().required().min(8),
      tipo_usuario: Yup.string().required().min(1),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou, tente novamente ou contate o suporte!' });
    }

    const usuarioExiste = await Usuario.findOne({
      where: { email: req.body.email },
    });

    if (usuarioExiste) {
      return res.status(400).json({ error: "Usuario já existe!" });
    }

    const usuario = await Usuario.create(req.body);

    return res.json(usuario);
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
      senhaAtual: Yup.string().min(8),
      senhaNova: Yup.string().min(8)
        .when('senhaAtual', (senhaAtual, field) =>
          senhaAtual ? field.required() : field
        ),
      confirmaSenha: Yup.string()
        .when('senhaNova', (senhaNova, field) =>
          senhaNova ? field.required().oneOf([Yup.ref('senhaNova')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou, tente novamente ou contate o suporte!' });
    }
    const { id } = req.params;

    const { email, senhaAtual } = req.body;

    const usuario = await Usuario.findByPk(id);

    if (usuario === null) {
      return res.status(400).json("Serviço não existe.");
    }

    if (email && email !== usuario.email) {
      const usuarioExiste = await Usuario.findOne({
        where: { email },
      });

      if (usuarioExiste) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
    }
  
    if (senhaAtual && !(await usuario.checkPassword(senhaAtual))) {
      return res.status(401).json({ error: 'Senha inválida.' });
    }
    const { nome, tipo_usuario } = await usuario.update(req.body);

    return res.json({
      id,
      nome,
      email,
      tipo_usuario,
    });
  }

  async delete(req, res) {

    const UsuarioAutorizado = await Usuario.findOne({
      where: { id: req.id_usuario, tipo_usuario: "A"}
    });

    if (!UsuarioAutorizado) {
      return res.status(401).json({ error: 'Usuário não tem perfil de administrador.' });
    }
    const { id } = req.params;

    const usuario = await Usuario.destroy({ where: {id} });

    if(usuario <= 0) {
      return res.status(400).json('Usuário não existe.');
    }

    return res.json('Usuário deletado com sucesso.');
  }
}

export default new UsuarioController();
