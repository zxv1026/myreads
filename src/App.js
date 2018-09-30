import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from "react-router-dom";
import './App.css'
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
    console.log("app", this)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path = "/search" render={() => (
          <SearchBooks />
        )}/>
        < Route exact path = "/" render={() => (
          <ListBooks 
            books = {this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
