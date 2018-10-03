import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class SearchBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: []
        }
        console.log("SearchBooks",this)
    }

    updateQuery = (query) => {
        if (query) {
            this.setState({ query: query.trim() })
            BooksAPI.search(query).then((results) => {
                if (results.length) {
                    this.setState({
                        results: results
                    })
                } else {
                    this.setState({
                        results: []
                    })
                }
            })
        } else {
            this.setState({
                query: '',
                results: []
            })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"  
                        className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {!this.state.results.length && this.state.query && (
                        <p>抱歉，没有搜索到对应的书籍</p>
                    )}
                    <ol className="books-grid">
                        {this.state.results.map((book) => (
                            <li key={book.id}>
                                <Book book={book} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
