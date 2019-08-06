import * as actionType from '../actions/actionType';

const initialState = {

movies:[],

}

const moviesReducer = (state = initialState,actions) =>{

switch(actions.type){

case actionType.GET_MOVIES_SUCCESS:return getMoviesSuccess(state,actions);break;
case actionType.EDIT_MOVIE:return editMovie(state,actions);break;
case actionType.REMOVE_MOVIE:return removeMovie(state,actions);break;
case actionType.ADD_MOVIE:return addMovie(state,actions);break;
default:return state;

}
}

const addMovie = (state,actions) =>{
    const movies = [...state.movies];
    movies.push(actions.movie);
    return{
       ...state,
       movies:movies
    }
}

const removeMovie = (state,actions) =>{
    const movies = [...state.movies];
    const newMovies = movies.filter(m=>m.id !== actions.movie.id);
    return{
       ...state,
       movies:newMovies
    }
}

const editMovie = (state,actions) =>{
    const index = state.movies.findIndex(m=>m.id===actions.movie.id);
    const movies = [...state.movies];
    movies[index] = actions.movie;
    return{
       ...state,
       movies:movies
    }
}

const getMoviesSuccess = (state,actions) =>{
return{
    ...state,
    movies:actions.data,
}
}


export default moviesReducer;
