const { getAllVideogames } = require('../controllers/videogames');
const {Router} = require('express');
const router = Router();



router.get("/", async (req, res) => {
    try {
      const name = req.query.name;
      const videogamesTotal = await getAllVideogames();

      if (name) {
        const videogameName = videogamesTotal.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        try {
          res.status(200).send(videogameName)
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

module.exports = router;