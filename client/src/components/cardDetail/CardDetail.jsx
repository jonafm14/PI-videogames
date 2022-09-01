import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetails, deleteVideogame } from "../../redux/actions";
import Style from "../cardDetail/CardDetail.module.css";
import { useHistory } from "react-router-dom";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const myVideogame = useSelector((state) => state.gameDetails);
  const history = useHistory();

  useEffect(() => {
    dispatch(getGameDetails(id));
  }, [dispatch]);

  function onDeleteVideogame(e) {
    if (e.target.value.includes("-")) {
      dispatch(deleteVideogame(e.target.value));
      console.log(e.target.value);
      alert("The game was removed successfully")
      history.push("/home");
    }else{
      alert("This video game cannot be deleted")
    }
  }

  return (
    <div className={Style.containerGeneral}>
      {myVideogame ? (
        <div className={Style.container}>
          <h1>{myVideogame.name}</h1>
          <img src={myVideogame.image} alt="" />
          <div>
            <h4 className={Style.h4}>Rating: {myVideogame.rating} ⭐</h4>
            <h4 className={Style.h4}>Released: {myVideogame.released}</h4>
            <h4 className={Style.h4}>Platform: {myVideogame.platforms}</h4>
            <h4 className={Style.h4}>
              Genres: {myVideogame.genres?.map((g) => g.name).join(", ")}
            </h4>
            <h4 className={Style.h4}>Description: </h4>
            <p
              className={Style.p}
              dangerouslySetInnerHTML={{ __html: myVideogame.description }}
            />
          </div>
          <div className={Style.divButton}>
          <button className={Style.button} value={id} id={id} onClick={(e) => onDeleteVideogame(e)}>
            Delete
          </button>
          <Link to="/home">
            <button className={Style.button}>Go Home</button>
          </Link>
          </div>
        </div>
      ) : (<h1>El videojuego no existe</h1>)}
    </div>
  );
}

export default Detail;
