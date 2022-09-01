const { getAllVideogames } = require("../controllers/videogames");
const { Router } = require("express");
const router = Router();
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const name = req.query.name;
    const videogamesTotal = await getAllVideogames();

    if (name) {
      const videogameName = videogamesTotal.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      try {
        res.status(200).send(videogameName);
      } catch (error) {
        res.status(404).send(error);
      }
    } else {
      res.status(200).send(videogamesTotal);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let detail;

  if (id.includes("-")) {
    // este if es para encontrar los games que ya estan creados
    try {
      detail = await Videogame.findOne({
        where: {
          id: id,
        },
        include: {
          model: Genres,
          attributes: ["name"],
        },
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    // si el apk no incluye "-"
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const elem = response.data;
      detail = {
        id: elem.id,
        name: elem.name,
        description: elem.description_raw,
        image: elem.background_image,
        rating: elem.rating,
        released: elem.released,
        genres: elem.genres,
        platforms: elem.platforms.map((p) => p.platform.name).join(","),
      };
    } catch (e) {
      console.log(e);
    }
  }
  if (detail) {
    res.send(detail);
  } else {
    res.status(404).send("error");
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      // lo que reciben por body osea por formulario.
      name,
      image,
      genres,
      description,
      released,
      rating,
      platforms,
      createdInDb,
    } = req.body;

    const createVideoGame = await Videogame.create({
      //creo el personaje desde la base db
      name,
      image,
      description,
      released,
      rating,
      platforms,
      createdInDb,
    });
    const searchGenre = await Genres.findAll({
      //me traigo los generos y luego comparo por nombre. El correcto lo agrego abajo con el "AddGenre()"
      where: { name: genres },
    });
    createVideoGame.addGenre(searchGenre);
    res.send("Videogame created successfully");
  } catch (e) {
    console.log(e);
  }
});

router.delete("/:id", (req, res) => {
  try {
    Videogame.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("The game was removed successfully");
  } catch (e) {
    console.log(e);
  }
});



module.exports = router;
