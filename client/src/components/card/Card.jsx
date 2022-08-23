import React from "react";
import Style from "../card/Card.module.css";

export default function Card({ name, image, genres, rating }) {
  return (
    <div className={Style.container}>
      <div className={Style.containerCard}>
        <div>
          <img src={image} alt="No img"></img>
        </div>
        <div className={Style.containerText}>
        <div>
          <h3>{name}</h3>
        </div>
        <div className={Style.genres}>
          <h4>{genres.join(" | ")}</h4>
        </div>
        <div className={Style.rating}>
          <h4>{rating} ⭐</h4>
        </div>
        </div>
      </div>
    </div>
  );
}
