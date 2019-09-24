import React, { Component } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import styled from "styled-components";

const Input = styled.input`
  padding: 0.5em;
  margin-top: 0px;
  background: #def3fd;
  border: none;
  border-radius: 3px;
  display: block;
  width: 98.5%;
  font-size: 12px;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      search: "",
      result: []
    };
  }

  //Render top 20 trending movies on first load
  componentDidMount() {
    this.getInfo();
  }

  //Get top 20 trending movies for the week
  getInfo = () => {
    if (this.state.search === "") {
      axios
        .get("/popular")
        .then(res => {
          let { data } = res.data;
          const results = data.results;
          console.log("results", results);
          this.setState({
            result: results
          });
        })
        .catch(error => console.log(error));
    } else {
      //Search movie by title
      axios
        .get(`/movies/:${this.state.search}`)
        .then(res => {
          let { data } = res.data;
          const results = data.results;
          this.setState({
            result: results
          });
        })
        .catch(error => console.log(error));
    }
  };

  //handle Search form
  handleSearchForm = () => {
    this.setState(
      {
        search: this.search.value
      },
      () => {
        if (this.state.search && this.state.search.length > 1) {
          this.getInfo();
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Input
          ref={input => (this.search = input)}
          onChange={this.handleSearchForm}
          placeholder="Search"
        />
        <MovieList movies={this.state.result} />
      </div>
    );
  }
}
