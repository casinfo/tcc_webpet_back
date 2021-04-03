import * as Yup from "yup";

import Pet from "../models/Pets";

class PetController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaPets = await Pet.findAll(query);

    return res.json(listaPets);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      //id_cliente: Yup.integer(),
      nome: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Validação falhou, tente novamente ou contate o suporte!",
      });
    }

    const pet = await Pet.create(req.body);

    return res.json(pet);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: "Validação falhou, tente novamente ou contate o suporte!",
      });
    }

    const { id } = req.params;

    const pet = await Pet.findByPk(id);

    const petAtualizado = await pet.update(req.body);

    return res.json(petAtualizado);
  }

  async delete(req, res) {
    const { id } = req.params;

    const usuario = await Pet.destroy({ where: { id } });

    if (usuario <= 0) {
      return res.status(400).json("Pet não existe.");
    }

    return res.json("Pet deletado com sucesso.");
  }
}

export default new PetController();
