import * as actionType from './actionType';

export const removeMovie = (movie) =>{
    return {
        type: actionType.REMOVE_MOVIE,
        movie: movie
    }
}

export const addMovie = (movie) =>{
    return {
        type: actionType.ADD_MOVIE,
        movie: movie
    }
}

export const editMovie = (movie) =>{
    return {
        type: actionType.EDIT_MOVIE,
        movie: movie
    }
}


const getMoviesSuccess = (data) => {

    return {
        type: actionType.GET_MOVIES_SUCCESS,
        data: data
    }

}


const getMoviesFail = () => {

    return {
        type: actionType.GET_MOVIES_FAIL,
    }
}


export const getMovies = () => {

    return dispatch => {
        fetch('https://movies-3064c.firebaseio.com//movies.json')
            .then(response=>response.json())
            .then(data => dispatch(getMoviesSuccess(data)))
            .catch(error => {
                console.log("get Movies Error:" + error)
                dispatch(getMoviesFail())
            }
            )
    }
}