import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName } from "../../redux/actions";
import Style from "./NavBar.module.css"
import { Link } from "react-router-dom";

export default function NavBar () {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getGameByName(name))
        setName("")
    }

    return (
        <div>
          <div className={Style.container}>
            <div>
            <Link to="/">
              <h2 className={Style.text}>PI VIDEOGAMES</h2>
            </Link>
            </div>
            <div className={Style.inputGroup}>
              <input
                className={Style.input}
                type="text"
                placeholder="Search..."
                value={name}
                onChange={e => handleChange(e)}
              ></input>
    
              <button
                className={Style.buttonSubmit}
                type="submit"
                onClick={e => handleSubmit(e)}
              >
                SEARCH
              </button>
            </div>
            <div>
              <h5 className={Style.text}>MUSCIACHIO JONATAN</h5>
            </div>
          </div>
        </div>
      );
}