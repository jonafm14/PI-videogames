import React, { useState, useEffect } from "react";
import {
  getAllGenres,
  createGame,
  getAllGames,
} from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Style from "../form/Form.module.css";
// import { useNavigate } from "react-router-dom";

function validate(game) {
  let errors = {};

  if (!game.name) {
    errors.name = "Name is required!";
  } else if (!/^[a-zA-Z0-9-() .]+$/.test(game.name)) {
    errors.name = "Only accepts letters, numbers, mid dashes and parenthesis!";
  }

  if (
    game.image.length !== 0 &&
    !/^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(game.image)
  ) {
    errors.image = "Invalid URL!";
  }

  if (!game.released) {
    errors.released = "Released date is required!";
  }

  if (!game.description) {
    errors.description = "Description is required!";
  }

  if (!game.rating) {
    errors.rating = "Rating is required";
  } else if (game.rating > 5) {
    errors.rating = "Rating must be less than 5";
  } else if (game.rating < 0) {
    errors.rating = "Rating cannot be negative";
  }

  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const genres = useSelector((state) => state.genres);
  const allNames = useSelector((state) => state.allGames);
  const platforms = useSelector((state) => state.platforms);

  const [errorsForm, setErrorsForm] = useState({});

  const [errorsBtn] = useState(
    Object.keys(errorsForm).length < 1 ? false : true
  );

  const [game, setGame] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllGames());
  }, []);

  function handleGenres(e) {
    setGame({
      ...game,
      genres: [...new Set([...game.genres, e.target.value])],
    });
  }

  const handleDeleteG = (g) => {
    setGame({
      ...game,
      genres: game.genres.filter((e) => e !== g),
    });
  };

  function handlePlatforms(e) {
    setGame({
      ...game,
      platforms: game.platforms.includes(e.target.value)
        ? game.platforms
        : [...game.platforms, e.target.value],
    });
  }

  function handleDeleteP(e) {
    setGame({
      ...game,
      platforms: game.platforms.filter((p) => p !== e),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    !game.image
      ? setGame({
          ...(game.image =
            "https://previews.123rf.com/images/mattbadal/mattbadal2012/mattbadal201200056/161901103-sin-vector-de-icono-de-imagen-no-hay-s%C3%ADmbolo-de-imagen-disponible-adecuado-para-el-elemento-de-inter.jpg?fj=1"),
        })
      : setGame(game);
    setGame({ ...(game.name = game.name.toLowerCase()) });
    let noRepeat = allNames.filter((n) => n.name === game.name);
    if (noRepeat.length !== 0) {
      alert("That videogame already exists");
      window.location.reload();
    } else {
      setErrorsForm(validate(game));
      dispatch(createGame(game));
      setGame({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      alert("Videogame created successfully");
    }
    // navigate("/home");
  }

  function handleChange(e) {
    e.preventDefault();
    setGame((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorsForm(validate(game));
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <div className={Style.all}>
      <div className={Style.cont}>
        <form onSubmit={handleSubmit} className={Style.formCont}>
          <div className={Style.form}>
            <label>Name</label>
            <input
              className={Style.input}
              type="text"
              placeholder="Enter a name..."
              name="name"
              value={game.name}
              onChange={handleChange}
            ></input>
            {errorsForm.name ? (
              <h4>
                <small>{errorsForm.name}</small>
              </h4>
            ) : (
              false
            )}
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter a description..."
              value={game.description}
              onChange={handleChange}
            ></textarea>
            {errorsForm.description ? (
              <h4>
                <small>{errorsForm.description}</small>
              </h4>
            ) : (
              false
            )}
            <label>Released</label>
            <input
              className={Style.input}
              type="date"
              name="released"
              placeholder="yyyy-mm-dd"
              value={game.released}
              onChange={handleChange}
            ></input>
            {errorsForm.released ? (
              <h4>
                <small>{errorsForm.released}</small>
              </h4>
            ) : (
              false
            )}
            <label>Image</label>
            <input
              className={Style.input}
              type="text"
              placeholder="Enter a URL"
              name="image"
              value={game.image}
              onChange={handleChange}
            ></input>
            {errorsForm.image ? (
              <h4>
                <small>{errorsForm.image}</small>
              </h4>
            ) : (
              false
            )}
            <label>Rating</label>
            <input
              className={Style.input}
              name="rating"
              placeholder="Enter a rating 0 - 5"
              value={game.rating}
              onChange={handleChange}
            ></input>
            {errorsForm.rating ? (
              <h4>
                <small>{errorsForm.rating}</small>
              </h4>
            ) : (
              false
            )}
            <label>Genres</label>
            <div>
              <select
                id="genres"
                name="genres"
                value={game.genres}
                onChange={(e) => handleGenres(e)}
              >
                {genres.map((g) => {
                  return (
                    <option key={g.id} value={g.name}>
                      {g.name}
                    </option>
                  );
                })}
              </select>
              {game.genres.map((g) => (
                <div>
                  <label>{g}</label>
                  <button onClick={(g) => handleDeleteG(g)} key={g} value={g}>
                    X
                  </button>
                </div>
              ))}
            </div>
            {/* <label>Genres</label>
                        <select name="genres" value={game.genres} onChange={e => handleGenres(e)}>
                            {genres.map((g) => (
                                <option value={g.name}>{g.name}</option>
                            ))}
                        </select> */}
            <label>Platforms</label>
            <div>
              <select id="plataforms" onChange={(e) => handlePlatforms(e)}>
                {platforms?.map((p) => {
                  return (
                    <option value={p} key={p}>
                      {p}
                    </option>
                  );
                })}
              </select>
              {game.platforms.map((p) => (
                <div>
                  <label>{p}</label>
                  <button onClick={() => handleDeleteP(p)} key={p} value={p}>
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className={Style.buttonFrom}>
              <button className={Style.button} type="submit">
                CREATE
              </button>
              <Link to={"/home"}>
                <button className={Style.button} disabled={errorsBtn}>
                  BACK
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
