import React from "react";
import { Link } from "react-router-dom";
import img from "../../multimedia/Start.png";
import Style from "../landingPage/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={Style.divLanding}>
      <div>
        <Link to="/home">
          <img className={Style.img} src={img} alt="No img"/>
        </Link>
      </div>
    </div>
  );
}
