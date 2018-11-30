 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
 import Books from './Books';
 import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
	state = {
		query: '',
		searchedBooks: []
	}

	updateQuery = (query) => {
		this.setState({
			query: query
		})
		this.updateSearchedBooks(query);
	}

	updateSearchedBooks = (query) => {
		if (query) {
			 BooksAPI.search(query).then((searchedBooks) => {
				if(searchedBooks.error) {
					this.setState({ searchedBooks: [] });
				} else {
			      this.setState({ searchedBooks });
		        }
		      })
		     } else {
		   	this.setState({ searchedBooks: [] });
	        }
	    if(query !== this.state.query) return
        }

	render () {

		return (
				 <div className="search-books">
	            	<div className="search-books-bar">

	              	<Link
	              	to='/'
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
	              <ol className="books-grid">
	              	{
	              		this.state.searchedBooks.map(searchedBook => {
	              			let shelf= "none";

	              			this.props.books.map(book => (
	              				book.id === searchedBook.id ?
	              				shelf = book.shelf :
	              				""
	              				));

	              			return(
	              			<li key={searchedBook.id}>
	              				<Books
	              					book={searchedBook}
	              					moveShelf={this.props.moveShelf}
	              					currentShelf = {shelf}
	              				/>
	              			</li>
	              			)
	              		})
	              	}
	              </ol>
	            </div>
	          </div>
		);
	}

}

export default SearchPage;