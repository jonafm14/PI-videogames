import {
    GET_ALL_GAMES,
    GET_ALL_GENRES,
    GET_GAME_BY_ID,
    GET_GAME_BY_NAME,
    GET_GAME_DETAILS,
    CREATE_GAME,
} from '../actions'

const initialState = {
    allGames: [],
    videogame: [],
    genres: [],
    gameDetails: [],
    idGame: [],
    allGamesCopy: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload,
                allGamesCopy: action.payload
            }
        case GET_GAME_BY_ID:
            return {
                ...state,
                idGame: action.payload,
            }
        case GET_GAME_BY_NAME:
            return {
                ...state,
                allGames: action.payload
            }
        case GET_GAME_DETAILS:
            return {
                ...state,
                gameDetails: action.payload
            }
        case CREATE_GAME:
            return {
                ...state
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                genres: action.payload,
            }
        case "FILTER_CREATED":
            const allGamesCopy = state.allGamesCopy
            const filterCreated = action.payload === "created" ? allGamesCopy.filter(a => a.createdInDb) : allGamesCopy.filter(a => !a.createdInDb)
            return {
                ...state,
                allGames: action.payload === "All" ? state.allGamesCopy : filterCreated
            }
        case "BY_NAME_FILTER":
            let sort = action.payload === "asc" ? state.allGames.sort(function (a,b) {
                if (a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0
            }) : state.allGames.sort(function (a,b) {
                if (a.name > b.name) {
                    return -1
                }
                if (b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                allGames: sort
            }
        case "BY_RATING_FILTER":
            let sort2 = action.payload === "higher" ? state.allGames.sort(function (a,b) {
                if (a.rating > b.rating) {
                    return 1
                }
                if (b.rating > a.rating) {
                    return -1
                }
                return 0
            }) : state.allGames.sort(function (a,b) {
                if (a.rating > b.rating) {
                    return -1
                }
                if (b.rating > a.rating) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                allGames: sort2
            }
        case "FILTER_BY_GENRE":
            return {...state, filtered: state.allGames.filter((game) => {
                return game.genres.find((genre) => {
                    return genre === action.payload})
            })
        }
        default: 
            return state;
    }
}

export default rootReducer;