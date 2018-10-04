import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class SearchBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: [],
            books: []
        }
        console.log("SearchBooks",this)
    }

    componentDidMount() {
        this.getAllBooks()
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

    updateBookShelf = ( id , shelf) => {
        BooksAPI.update(this.state.results.find((c) => c.id === id), shelf).then(
            this.getAllBooks()
        )
    }

    getAllBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({books})
        })
    }

    render() {
        this.state.results.map((results) => {
            results.shelf = 'none'
            this.state.books.forEach((book) => {
                if(results.id === book.id){
                    results.shelf = book.shelf
                }
            })
        })
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        to="/"  
                        className="close-search"
                    >Close</Link>
                    <div className="search-books-input-wrapper">
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
                                <Book 
                                    book={book}
                                    onUpdateBookShelf={this.updateBookShelf}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
