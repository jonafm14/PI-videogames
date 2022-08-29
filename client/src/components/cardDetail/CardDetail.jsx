import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGameDetails } from "../../redux/actions";
import Style from "../cardDetail/CardDetail.module.css";

function Detail() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const myVideogame = useSelector(state => state.gameDetails)

  useEffect(() => {
    dispatch(getGameDetails(id))
    console.log(myVideogame)
    
  },[dispatch])
  

  return (
    <div className={Style.containerGeneral}>
      { myVideogame ? (
        <div className={Style.container}>
          <h1 >{myVideogame.name}</h1>
          <img src={myVideogame.image} alt=""/>
          <div>
            <h4 >🏆Rating: {myVideogame.rating} </h4>
            <h4 >Released: {myVideogame.released}</h4>
            <h4 >Platform: {myVideogame.platforms}</h4>
            <h4 >
              Genres: 
              {myVideogame.genres?.map((g) => g.name).join(", ")}
            </h4>
            <h4 >Description: </h4>
            <p 
            dangerouslySetInnerHTML = {{__html: myVideogame.description }}/>
          </div>
          <Link to="/home">
          <button className={Style.button}>Go Home</button>
          </Link>
        </div>
      ): null}
    </div>
  )
}

export default Detail
