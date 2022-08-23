import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  createdFilter,
  byNameFilter,
  byRatingFilter,
  byGenresFilter,
  getAllGenres,
} from "../../redux/actions";
import Card from "../card/Card";
import NavBar from "../navBar/NavBar";
import Paginated from "../paginated/Paginated";
import Style from "../home/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const gamesState = useSelector((state) => state.allGames);
  const genres = useSelector((state) => state.genres);
  const [, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPage, setGamePage] = useState(15);
  const indexLast = currentPage * gamesPage;
  const indexFirst = indexLast - gamesPage;
  const currentGames = gamesState.slice(indexFirst, indexLast);

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let handleClick = (e) => {
    e.preventDefault();
    setGamePage(1);
    setOrder("");
    window.location.reload(); // Recargar la página y limpiar todos los select
  };

  function handleCreatedFilter(e) {
    dispatch(createdFilter(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(byNameFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleSortRating(e) {
    e.preventDefault();
    dispatch(byRatingFilter(e.target.value));
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  }

  function handleSortGenres(e) {
    e.preventDefault();
    dispatch(byGenresFilter(e.target.value));
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <div className={Style.containerHome}>
      <div>
        <NavBar />
        <div className={Style.containerButtons}>
          <button className={Style.button} onClick={handleClick}>
            Reload
          </button>
          <select className={Style.button} onChange={(e) => handleSort(e)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select
            className={Style.button}
            onChange={(e) => handleSortRating(e)}
          >
            <option value="higher">Lower Rating</option>
            <option value="lower">Higher Rating</option>
          </select>
          <select
            className={Style.button}
            onChange={(e) => handleCreatedFilter(e)}
          >
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">Api</option>
          </select>
          <select
            className={Style.button}
            onChange={e => handleSortGenres(e)}
          >
            <option value = 'all'>All</option>
            {
            genres?.map((g) => (
              <option value={g.name} key={g.name}>{g.name.charAt(0).toUpperCase()+g.name.slice(1)} </option>
            ))
            }
            
          </select>
          <button className={Style.button}>
            <Link to={"/form/"}>Form</Link>
          </button>
        </div>
      </div>
      <div className={Style.divCard}>
        {currentGames.map((c) => {
          return (
            <div>
              <Link to={"/home/" + c.id}>
                <Card
                  name={c.name}
                  image={c.image}
                  genres={c.genres}
                  rating={c.rating}
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className={Style.containerPaginated}>
        <Paginated
          gamesPage={gamesPage}
          gamesState={gamesState.length}
          paginated={paginated}
        />
      </div>
    </div>
  );
}
