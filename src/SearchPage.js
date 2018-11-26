 import React, { Component } from 'react';
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
		if (query) {BooksAPI.search(query).then((searchedBooks) => {
			this.setState({ searchedBooks })
		   })
	    } else{
	    	this.setState({ searchedBooks: [] });
	    }

	}

	render () {

		return (
				 <div className="search-books">
	            	<div className="search-books-bar">

	              	<a className="close-search" onClick={() => this.setState({
	              		showSearchPage: false})}>Close</a>

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
	              		this.state.searchedBooks.map(searchedBook => (
	              			<li key={searchedBook.id}>
	              				<Books
	              					book={searchedBook}
	              				/>
	              			</li>
	              			))
	              	}
	              </ol>
	            </div>
	          </div>
		);
	}

}

export default SearchPage;