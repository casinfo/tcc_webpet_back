import { Router } from "express";
import { uuid } from "uuidv4";

import UsuarioController from "./app/controllers/UsuarioController";
import ClienteController from "./app/controllers/ClienteController";
import PetController from "./app/controllers/PetController";
import ServicoController from "./app/controllers/ServicoController";
import AgendaController from "./app/controllers/AgendaController";
import SessaoController from "./app/controllers/SessaoController";
import DashClientesController from "./app/controllers/DashClientesController";
import DashPetsController from "./app/controllers/DashPetsController";
import DashServicosController from "./app/controllers/DashServicosController";
import DashAgendaMesController from "./app/controllers/DashAgendaMesController";
import DashAgendaSemController from "./app/controllers/DashAgendaSemController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

//Rota de Sessão e que não passam pelo middleware.
routes.post("/sessao", SessaoController.store);
routes.get("/checkToken", SessaoController.checkToken);
routes.get("/destroyToken", SessaoController.destroyToken);

routes.post("/usuarios", UsuarioController.store);

// middleware só funciona para as rotas abaixos
routes.use(authMiddleware);

//Rota de Usuários
routes.get("/usuarios", UsuarioController.index);
routes.put("/usuarios/:id", UsuarioController.update);
routes.delete("/usuarios/:id", UsuarioController.delete);

//Rota de Clientes
routes.get("/clientes", ClienteController.index);
routes.post("/clientes", ClienteController.store);
routes.put("/clientes/:id", ClienteController.update);
routes.delete("/clientes/:id", ClienteController.delete);

//Rota de Serviços
routes.get("/servicos", ServicoController.index);
routes.post("/servicos", ServicoController.store);
routes.put("/servicos/:id", ServicoController.update);
routes.delete("/servicos/:id", ServicoController.delete);

//Rota de Pets
routes.get("/pets", PetController.index);
routes.post("/pets", PetController.store);
routes.put("/pets/:id", PetController.update);
routes.delete("/pets/:id", PetController.delete);

//Rota de Agenda
routes.get("/agenda", AgendaController.index);
routes.post("/agenda", AgendaController.store);
routes.put("/agenda/:id", AgendaController.update);
//routes.put("/agenda/:id", AgendaController.updateConfirma);
routes.delete("/agenda/:id", AgendaController.delete);

//Rota de Dashboard Clientes
routes.get("/dashclientes", DashClientesController.index);
routes.post("/dashclientes", DashClientesController.store);
routes.put("/dashclientes/:id", DashClientesController.update);
routes.delete("/dashclientes/:id", DashClientesController.delete);

//Rota de Dashboard Pets
routes.get("/dashpets", DashPetsController.index);
routes.post("/dashpets", DashPetsController.store);
routes.put("/dashpets/:id", DashPetsController.update);
routes.delete("/dashpets/:id", DashPetsController.delete);

//Rota de Dashboard Servicos
routes.get("/dashservicos", DashServicosController.index);
routes.post("/dashservicos", DashServicosController.store);
routes.put("/dashservicos/:id", DashServicosController.update);
routes.delete("/dashservicos/:id", DashServicosController.delete);

//Rota de Dashboard Agenda Mes
routes.get("/dashagendames", DashAgendaMesController.index);
routes.post("/dashagendames", DashAgendaMesController.store);
routes.put("/dashagendames/:id", DashAgendaMesController.update);
routes.delete("/dashagendames/:id", DashAgendaMesController.delete);

//Rota de Dashboard Agenda Semanal
routes.get("/dashagendasem", DashAgendaSemController.index);
routes.post("/dashagendasem", DashAgendaSemController.store);
routes.put("/dashagendasem/:id", DashAgendaSemController.update);
routes.delete("/dashagendasem/:id", DashAgendaSemController.delete);

module.exports = routes;
