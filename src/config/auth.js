export default {
  secret: "14251830",
  expiresIn: "7d",
};

export const ID_USUARIO = "&id_usuario";
export const TIPO_USUARIO = "&tipo_usuario";

export const getIdUsuario = () => localStorage.getItem(ID_USUARIO);
export const getTipoUsuario = () => localStorage.getItem(TIPO_USUARIO);
