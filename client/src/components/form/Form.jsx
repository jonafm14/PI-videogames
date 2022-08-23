import React, {useState, useEffect} from "react";
import { getAllGenres } from "../../redux/actions/index"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import axios from "axios"
import Style from "../form/Form.module.css"

export default function Form () {

    const dispatch = useDispatch()

    const genres = useSelector((state) => state.genres)
    const allNames = useSelector((state) => state.allGames);
    
    const [errorsForm, setErrorsForm] = useState({})

    const [errorsBtn, ] = useState(Object.keys(errorsForm).length < 1 ? false : true)

    const [game, setGame] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: []
    })

    useEffect(() => {
        dispatch(getAllGenres())
    }, [dispatch])


    function handleGenres (e) {
        setGame({
            ...game,
            genres: [...new Set([...game.genres, e.target.value])]
        })
    }

    function handlePlatforms (e) {
        setGame({
            ...game,
            platforms: [...new Set([...game.platforms, e.target.value])]
        })
    }

     function validate (game) {
        let errors = {};
        
        if (!game.name) {
            errors.name = "Name is required!"
        } else if (!/^[a-zA-Z0-9-() .]+$/.test(game.name)){
            errors.name = "Only accepts letters, numbers, mid dashes and parenthesis!"
        }

        if (game.image.length !== 0 && !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(game.image)) {
            errors.image = "Invalid URL!"
        }

        if (!game.released) {
            errors.released = "Released date is required!"
        }

        if (!game.description) {
            errors.description = "Description is required!"
        }

        if (!game.rating) {
            errors.rating = "Rating is required"
        } else if (game.rating > 5) {
            errors.rating = "Rating must be less than 5"
        } else if (game.rating < 0) {
            errors.rating = "Rating cannot be negative"
        }

        return errors
    }


    async function handleSubmit (e) {
        e.preventDefault();
        !game.image?setGame({...game.image="https://agencias.assist1.com.co/assets/images/no-image.png"}) : setGame(game);
        setGame({...game.name = game.name.toLowerCase()})
        let noRepeat = allNames.filter((n) => n.name === game.name);
        if (noRepeat.length !== 0) {
			alert("That videogame already exists");
		}else{
        setErrorsForm(validate(game))
            await axios.post("http://localhost:3001/videogames", game);
            setGame({
              name: "",
              image: "",
              description: "",
              released: "",
              rating: "",
              genres: [],
              platforms: []
            });
        }
        
    }

    function handleChange (e) {
        e.preventDefault()
        setErrorsForm(validate(game))
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
        
    }
    return (
        <div className={Style.all}>
            <div className={Style.cont}>
                <form onSubmit={handleSubmit} className={Style.formCont}>
                    <div className={Style.form}>
                        <label>Name</label>
                        <input type="text" placeholder="Enter a name..." name="name" value={game.name} onChange={handleChange}></input>
                        {errorsForm.name ? <h4><small>{errorsForm.name}</small></h4> : false}
                        <label>Description</label>
                        <textarea name="description" placeholder="Enter a description..." value={game.description} onChange={handleChange}></textarea>
                        {errorsForm.description ? <h4><small>{errorsForm.description}</small></h4> : false}
                        <label>Released</label>
                        <input type="date" name="released" placeholder='yyyy-mm-dd' value={game.released} onChange={handleChange}></input>
                        {errorsForm.released ? <h4><small>{errorsForm.released}</small></h4> : false}
                        <label>Image</label>
                        <input type="text" placeholder="Enter a URL" name="image" value={game.image} onChange={handleChange}></input>
                        {errorsForm.image ? <h4><small>{errorsForm.image}</small></h4> : false}
                        <label>Rating</label>
                        <input name="rating" placeholder="Enter a rating 0 - 5" value={game.rating} onChange={handleChange}></input>
                        {errorsForm.rating ? <h4><small>{errorsForm.rating}</small></h4> : false}
                        <label>Genres</label>
                        <select name="genres" value={game.genres} onChange={e => handleGenres(e)}>
                            {genres.map((g) => (
                                <option value={g.name}>{g.name}</option>
                            ))}
                        </select>
                        <label>Platforms</label>
                        <select name="platforms" value={game.platforms} onChange={handlePlatforms}>
                            <option value={1}>PC</option>
                            <option value={2}>Android</option>
                            <option value={3}>PlayStation 5</option>
                            <option value={4}>XBOX</option>
                            <option value={5}>iOS</option>
                        </select>
                        <div className={Style.buttonFrom}>
                        <button className={Style.button} type="submit" disabled={errorsBtn}>
                            CREATE
                        </button>
                        <Link to={"/home"}>
                        <button className={Style.button}>
                            BACK
                        </button>
                        </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}