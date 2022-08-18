import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import Card from "../card/Card"
import {Link} from "react-router-dom"
import { getAlGames, getAllGames } from "../../redux/actions/index"
import Style from "../cards/Cards.module.css"
import LoadingPage from "../landingPage/LandingPage"

export default function AllCards () {
    let gamesState = useSelector((state) => state.allGames)
    const dispatch = useDispatch()
    console.log(gamesState);

    useEffect(() => {
        dispatch(getAllGames())
    }, [dispatch])

    return (
        <div>
            {gamesState.length > 0? (
                gamesState.map((g) => (
                    <Link key={g.id} to={`/details/${g.id}`}>
                        <Card name={g.name} image={g.image} genres={g.genres} rating={g.rating}/>
                    </Link>
                ))
            ):(
                <LoadingPage/>
            )}
        </div>
    )
}