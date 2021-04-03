import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import Usuario from '../models/Usuario';

class SessaoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({status: 401, error: 'Informe e-mail e senha, ou use sua conta Google!' });
    }

    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.json({status: 401, error: 'Usuário não existe.' });
    }

    if (!(await usuario.checkPassword(senha))) {
      return res.json({status: 401, error: 'Senha ou Login inválidos, verifique suas credenciais.' });
    }

    const { id, nome, tipo_usuario } = usuario;

    return res.json({
      status: 200,
      usuario: {
        id,
        nome,
        email,
        tipo_usuario,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),

    });
  }

  async checkToken(req, res){
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    req.token = token;

    if (!token) {
      res.json({status:401, error: "Token inexistente!"}) 
    } else {
      jwt.verify(token, authConfig.secret, function(err, decoded){
        if(err) {
            res.json({status: 401, error: "Token inválido!"});
        } else {
            res.json({status:200})
        }
      })
    }
  }

  async destroyToken(req, res) {
    const token = req.headers.token;
    if (token){
        res.cookie('token',null,{httpOnly:true});
    } else {
        res.status(401).send("Logout não autorizado!");
    }

    res.json({status:200})
    
  }
}

export default new SessaoController();
