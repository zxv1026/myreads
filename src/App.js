import React from 'react'
import { Route } from "react-router-dom";
import './App.css'
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path = "/search" render={() => (
          <SearchBooks />
        )}/>
        < Route exact path = "/" render={() => (
          <ListBooks />
        )}/>
      </div>
    )
  }
}

export default BooksApp
