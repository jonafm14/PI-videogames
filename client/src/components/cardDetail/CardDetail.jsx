import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetails } from "../../redux/actions";
import Style from "../cardDetail/CardDetail.module.css";

export default function GamesDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGameDetails(props.match.params.id));
  }, [dispatch]);

  const games = useSelector((state) => state.gameDetails);

  return (
    <div className={Style.containerGeneral}>
      <div className={Style.container}>
        <h1>{games.name}</h1>
        <img src={games.background_image} alt="" />
        <br></br>
        <h3>⭐ {games.rating}</h3>
        <br></br>
        <h4>{games.genres}</h4>
        <br></br>
        <h4>{games.platforms}</h4>
        <br></br>
        <h5>{games.description}</h5>
        <br></br>
        <h5>Released at {games.releaseDate}</h5>
        <br></br>
        <Link to={"/home"}>
          <button className={Style.button}>BACK</button>
        </Link>
      </div>
    </div>
  );
}
