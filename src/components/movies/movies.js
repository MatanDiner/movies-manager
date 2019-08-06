import React from 'react';
import Movie from './movie/movie';
import classes from './movies.css';

const movies = (props) =>props.movies.map(movie=><Movie key={movie.id} movie={movie}/>)

export default movies;