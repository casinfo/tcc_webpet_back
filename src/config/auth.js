export default {
  secret: "14251830",
  expiresIn: "7d",
};

export const getTipoUsuario = () => localStorage.getItem(TIPO_USUARIO);
