const express = require("express");
const routes = express.Router();

const clubeController = require("./controllers/ClubeController");
const partidaController = require("./controllers/PartidaController");
const estadioController = require("./controllers/EstadioController");
const campeonatoController = require("./controllers/CampeonatoController");
const usuarioController = require("./controllers/UsuarioController");
const loginController = require("./controllers/UsuarioController");


login = require("./middleware/login")


routes.get("/clubes", clubeController.index)
    .put("/clubes/destacar/", login, clubeController.destacar)
    .get("/clubes/destaques", login, clubeController.destaque)
    .post("/clubes", clubeController.store)
    .get("/clubes/estMandante", clubeController.estatisticasMandante)
    .get("/clubes/estVisitante", clubeController.estatisticasVisitante)
    .get("/clubes/filtro/:busca", clubeController.filtro);

routes.get("/partidas", partidaController.index)
    .post("/partidas", partidaController.store)
    .put("/partidas", partidaController.update);

routes.get("/estadios", estadioController.index)
    .post("/estadios", estadioController.store);

routes.get("/campeonatos", campeonatoController.index)
    .post("/campeonatos", campeonatoController.store);

routes.get("/usuarios",login, usuarioController.index)
    .post("/usuarios",login, usuarioController.store)
    .post("/login", loginController.login);
    
module.exports = routes;