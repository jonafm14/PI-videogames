import React from "react";
import styles from "./Paginated.module.css"

export default function Paginated ({gamesPage, gamesState, paginated}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(gamesState/gamesPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul >
                {pageNumbers?.map((num) => (
                    <li key={num}>
                        <button  onClick={() => paginated(num)}>{num}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}