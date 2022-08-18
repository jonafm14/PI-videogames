import axios from "axios"
export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const GET_GAME_BY_ID = 'GET_GAME_BY_ID'
export const GET_GAME_BY_NAME = 'GET_GAME_BY_NAME'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const CREATE_GAME = 'CREATE_GAME'
export const GET_GAME_DETAILS = 'GET_GAME_DETAILS'

export function getAllGames() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames")
            return dispatch({
                type: "GET_ALL_GAMES",
                payload: json.data
            })
        }catch(e){
            console.log(e)
        }
    }
}

export const getGameById = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`http://localhost:3001/videogame/${id}`)
            return dispatch({
                type: "GET_GAME_BY_ID",
                payload: json.data
            })
        } catch (e) {
            return (e)
        }
    }
}

export const getGameByName = (name) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            return dispatch({
                type: "GET_GAME_BY_NAME",
                payload: json.data
            })
        } catch(e){
            return (e)
        }
    }
}

export const getAllGenres = () => {
    return async (dispatch) => {
        try {
            const json = await axios.get("http://localhost:3001/genres")
            return dispatch({
                type: "GET_ALL_GENRES",
                payload: json.data
            })
        } catch (e) {
            return (e)
        }
    }
}

export const getGameDetails = (id) => {
    return async (dispatch) => {
        try {
            const json = await axios.get(`http://localhost:3001/videogame/${id}`)
            return dispatch({
                type: "GET_GAME_DETAILS",
                payload: json.data
            })      
        } catch (e) {
            return (e)
        }
    }
}

export const createGame = (payload) => {
    return async (dispatch) => {
        try {
            const json = await axios.post(`http://localhost:3001/videogames`,payload)
            return dispatch({
                type: "CREATE_GAME",
                payload: json.data
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export const createdFilter = (payload) => {
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export const byNameFilter = (payload) => {
    return {
        type: "BY_NAME_FILTER",
        payload
    }
}

export const byRatingFilter = (payload) => {
    return {
        type: "BY_RATING_FILTER",
        payload
    }
}

export const byGenresFilter = (payload) => {
    return {
        type: "BY_GENRES_FILTER",
        payload
    }
}