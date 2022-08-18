const { Router} = require('express');
const axios = require("axios");
const {Videogame, Genres} = require('../db.js');
require('dotenv').config();
const {API_KEY} = process.env;
const router = Router();



router.get('/:idVideogame', async (req, res)  => {
    const { idVideogame } = req.params                 

    if (idVideogame.includes('-')) {                    //con includes pregunto si el id tiene un "-" porque el id que se genera utilizando UUID tiene separaciones con guiones, por lo que se veria algo parecido a esto: (a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11)
        let vdb = await Videogame.findOne({
            where: {
                id: idVideogame                         //Busco si es un juego creado anteriormente y traigo la data de la db
            },
            include: Genres
        })

        vdb = JSON.stringify(vdb)
        vdb  = JSON.parse(vdb)                          //Lo parseo

        vdb.genres = vdb.genres.map(g => g.name)        //Mapeo los generos para quedarme solamente con el nombre
        res.json(vdb)                                   //Lo devuelvo
    } else {                                            //Si no es un juego que se haya creado se busca de la api
        try {
            const api = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
            let {id, name, background_image, genres, description, released: releaseDate, rating, platforms} = api.data
            genres = genres.map (g => g.name)
            platforms = platforms.map (p => p.platform.name)         //Mapeo genero y plataforma para quedarme con el nombre (vienen como array de objetos)
            return res.json({
                id,
                name,
                background_image,
                genres,
                description,                            //Lo devuelvo
                releaseDate,
                rating,
                platforms
            })
        } catch (e) {
            return console.log(e)
        }
    }
})


module.exports = router;