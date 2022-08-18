import React from "react";
import { Link } from "react-router-dom"
import video from "../../multimedia/VideoLanding.mp4"
import img from "../../multimedia/Start.png"
import Style from "../landingPage/LandingPage.module.css"

export default function LandingPage () {
    return (
        <div  className={Style.divLanding}>
            <video className={Style.video} src={video} autoPlay loop/>
            <div>
                <Link to="/home">
                <img className={Style.img} src={img}/>
                </Link>
            </div>
        </div>
    )
}