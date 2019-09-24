import React, { Component } from "react";
import MovieList from "./MovieList";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";

//Global styling
const GlobalStyle = createGlobalStyle`
  table {
    border-collapse: collapse; 
    color: 'white';
    padding-left: 16px;
    background-color:#DEFDE0;
  td {
    border: 1px solid #def3fd;
    border-collapse: collapse;
  }
  tr {
    padding: 5px;
    font-size: 16px;
  }
  }
`;

//Header styling
const Header = styled.h1`
  font: 24px;
  background: #defde0;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0.5em;
`;

//Search form styling
const SearchForm = styled.input`
  padding: 0.5em;
  margin-top: 0px;
  background: #def3fd;
  border: none;
  border-radius: 3px;
  display: block;
  width: 98.5%;
  font-size: 12px;
  &:hover {
    cursor: text;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      result: []
    };
  }

  //Display top 20 trending movies on first load
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

  //Handle Search form
  handleSearchForm = () => {
    this.setState(
      {
        search: this.search.value
      },
      () => {
        if (this.state.search.length >= 0) {
          this.getInfo();
        }
      }
    );
  };

  render() {
    return (
      <div className="App">
        <GlobalStyle />
        <Header>Discover New and Popular Movies</Header>
        <SearchForm
          ref={input => (this.search = input)}
          onChange={this.handleSearchForm}
          placeholder="Search"
        />
        <MovieList movies={this.state.result} />
      </div>
    );
  }
}
