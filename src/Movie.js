import React from "react";
import styled from "styled-components";

const Button = styled.a`
  display: inline-block;
  padding: 0.5rem 0;
  width: 8rem;
  background: transparent;
  color: black;
  border: 3px solid black;
  text-align: center;
  &:hover {
    cursor: pointer;
    background-color: white;
  }
`;

const Movie = props => {
  props.movie.poster_src =
    "http://image.tmdb.org/t/p/w185/" + props.movie.poster_path;

  let viewMore = () => {
    console.log("viewMore");
    const url = "https://www.themoviedb.org/movie/" + props.movie.id;
    window.location.href = url;
  };
  return (
    <tr key={props.movie.id} className="row">
      <td>
        <img alt="poster" width="120" src={props.movie.poster_src} />
      </td>
      <td>{props.movie.original_title}</td>
      <td>
        <p>{props.movie.overview}</p>
        <Button onClick={viewMore}>More Info</Button>
      </td>
    </tr>
  );
};

export default Movie;
