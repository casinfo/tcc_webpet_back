import * as Yup from "yup";

import { getTipoUsuario } from "../../config/auth";
import Pet from "../models/Pets";

class PetController {
  async index(req, res) {
    const { id } = req.query;

    const query = id ? { where: { id } } : {};

    const listaPets = await Pet.findAll(query);

    return res.json(listaPets);
  }

  async store(req, res) {
    /*
    const schema = Yup.object().shape({
      //id_cliente: Yup.integer(),
      nome: Yup.string().required(),
      especie: Yup.string().required(),
      raca: Yup.string().required(),
      data_nascto: Yup.string().required(),
      peso: Yup.integer(),
      vacinado: Yup.string().required(),
      porte: Yup.string().required(),
      sexo: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.json({
        status: 401,
        error: "Os dados não foram preenchidos corretamente!",
      });
    }
    */

    const pet = await Pet.create(req.body);

    return res.json(pet);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      especie: Yup.string().required(),
      raca: Yup.string().required(),
      data_nascto: data_nascto,
      peso: Yup.integer(),
      vacinado: Yup.string().required(),
      porte: Yup.string().required(),
      sexo: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.json({
        status: 401,
        error: "Os dados não foram preenchidos corretamente!!",
      });
    }

    const { id } = req.params;

    const pet = await Pet.findByPk(id);

    const petAtualizado = await pet.update(req.body);

    return res.json(petAtualizado);
  }

  async delete(req, res) {
    let tp_usuario = getTipoUsuario();

    console.log(tp_usuario);

    if (tp_usuario !== "A") {
      return res.json({
        status: 401,
        error: "Usuário não tem perfil de Administrador!",
      });
    }

    const { id } = req.params;

    const pet = await Pet.destroy({ where: { id } });

    if (pet <= 0) {
      return res.json({
        status: 400,
        error: "Pet não cadastrado!",
      });
    }

    return res.json("Pet deletado com sucesso.");
  }
}

export default new PetController();
