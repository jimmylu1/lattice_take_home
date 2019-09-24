import React from "react";
import Movie from "./Movie";

const MovieList = props => (
  <table key={props.movies.id}>
    <tbody>
      {props.movies.map(movie => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </tbody>
  </table>
);

export default MovieList;
