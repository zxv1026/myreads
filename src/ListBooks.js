import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from "react-router-dom";
import Book from "./Book";

class ListBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
        console.log("app", this)
    }

    componentDidMount() {
        this.getAllBooks()
    }
    updateBookShelf = (id,shelf) => {
        BooksAPI.update(this.state.books.find((c) => c.id === id),shelf).then(
            this.getAllBooks()
        )
    }
    getAllBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books
            })
        })
    }
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.books.filter((book) => book.shelf === 'currentlyReading')
                                        .map((book) => (
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.books.filter((book) => book.shelf === 'wantToRead')
                                        .map((book) => (
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.books.filter((book) => book.shelf === 'read')
                                        .map((book) => (
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
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                        className="add-books"
                    >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks
