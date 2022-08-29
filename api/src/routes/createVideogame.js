const {createVideogame} = require("../controllers/Videogames.js")
const { Router } = require("express");
const router = Router();


router.post("/", createVideogame)

module.exports = router;