
export const checkMovieTItle = (movie,moviesData) =>{
    const index = moviesData.findIndex(m=>m.Title.toLowerCase()===movie.Title.toLowerCase()); 
    if(index !== -1){
        if(movie["id"] !== moviesData[index]["id"]){
            return true;
        }    
    }
    return false;
}


export const searchMovies = (searchValue,moviesData)=>{

    const movies = moviesData.filter(movie=>movie.Title.toLowerCase().includes(searchValue.toLowerCase()));
    return movies.length === moviesData.length?null:movies;
}