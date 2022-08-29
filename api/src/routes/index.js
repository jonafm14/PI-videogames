const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Videogames = require("./videogames");
const Videogame = require("./videogame");
const Genres = require("./genre");

const router = Router();

//
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", Videogames);
router.use("/videogame", Videogame);
router.use("/genres", Genres);

module.exports = router;