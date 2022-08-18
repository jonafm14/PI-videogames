const { Router } = require('express');
const axios = require("axios");
const { Genres } = require('../db.js');
require('dotenv').config();
const {API_KEY} = process.env;
const router = Router();


router.get('/', async (req, res) => {
    try{
        const gdb = await Genres.findAll()
        if (gdb.length){
            return res.json(gdb)
        } else {
            const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            const genres = api.data.results
            genres.forEach(async g => {
                await Genres.findOrCreate({
                    where:{
                        name: g.name
                    }
                })
            });

            const gamm = genres.map(g => {
                return {
                    id: g.id,
                    name: g.name
                }
            })
            res.json(gamm)
        }
    }catch(e){
        return console.log(e)
    }
})


module.exports = router;