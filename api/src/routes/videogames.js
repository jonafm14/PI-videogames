const { Router } = require('express');
const axios = require("axios");
const {Videogame, Genres} = require('../db.js');
require('dotenv').config();
const {API_KEY} = process.env;
const router = Router();



//    GET DE TODOS LOS JUEGOS (SI LLEGA UNO EN ESPECIFICO TRAER EL MISMO SOLO)
router.get('/', async (req, res) => {

    let vdb = await Videogame.findAll({
        include: Genres                        //Busco en la dataBase si hay algún juego creado para poder traerlo. (si hay varios trae a todos)
    })

    vdb = JSON.stringify(vdb)                //Parseo el objeto
    vdb = JSON.parse(vdb)

    vdb = vdb.reduce((acc, e) => acc.concat({
        ...e,
        genres: e.genres.map(g => g.name)           //Me quedo solo con el nombre de cada genero
    }), [])


    if (req.query.name) {             //  Si llega algún nombre por query solo traigo ese videojuego.
        try {
            let api = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}`)
            if (!api.data.count){                                                           
                return res.status(204).json(`Game not found ☹️ "${req.query.name}"`)         // Si no trae ningún juego quiere decir que no existe, por ende tiramos error
            } else {
                const games = api.data.results.map(g => {
                    return {
                        id: g.id,                                               
                        name: g.name,                                        //Traigo solo data necesaria
                        image: g.background_image,
                        rating: g.rating,
                        genres: g.genres.map(g => g.name),           
                    }
                })
    
                const dbfilter = vdb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()))  //Filtro los juegos que coincidan de la busqueda con los datos traidos antes por la db
                                                                                                              //toLowerCase para que no haya confusiones entre el nombre del videojuego creado y el nombre introducido por query
                const results = [...dbfilter, ...games.splice(0, 1)]     //Sumo todo y hago que el array corte al llegar a 15
                console.log(results)
                return res.json(results)        //Lo retorno
            }
        } catch (e) {
            return console.log(e)
        }
    }
    else {
        try {
            let pag = 0                
            let results = [...vdb]                      //Guardo los juegos de db acá
            let api = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            while (pag < 1  ) {
                pag++

                const gamme = api.data.results.map(g => {
                    return {
                        id: g.id,
                        name: g.name,
                        image: g.background_image,
                        rating: g.rating,
                        genres: g.genres.map(e => e.name)
                    }
                })

                results = [...results, ...gamme]                        //Sumo la db con lo recien traido
                api = await axios.get(api.data.next)                    //Llamo a la api nuevamente
            }
            return res.json(results)
        } catch(e) {
            console.log(e)
            return res.sendStatus(500)
        }
    }
    
})




router.post('/', async (req, res, next) => {
    const {id, name, image, description, released, rating, genres, platforms} = req.body
    let exists = await Videogame.findOne({
        where: {name},
    });
    if(exists){
        return res.status(400).send("That videogame already exist")
    }
    try {
        let newGame = await Videogame.create({
            id,
            name,
            image,
            description,
            released,
            rating,
            platforms,
        })

        let findGenres = await Genres.findAll({
            where: {name: genres}
        })

        newGame.addGenres(findGenres)
        res.send("Game successfully created!")
    } catch (e) {
        next(e)
    }
})


module.exports = router;