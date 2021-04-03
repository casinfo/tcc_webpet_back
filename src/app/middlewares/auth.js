import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';


export default async (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.json({status: 401, error: 'Token não autorizado' });
  }
  // fazendo um desestruturação, para pegar apenas a 1ª posição do array. Bearer seria a posição [0]
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.id_usuario = decoded.id;

    return next();
  } catch (err) {
      return res.json({status: 401, error: 'Token inválido. (auth)' });
  }
};
