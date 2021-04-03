import app from "./app";

const port = process.env.PORT || 3333;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Servidor rodando na porta ${port}!`);
});
