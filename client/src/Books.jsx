import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  // Fetch all books
  const fetchBooks = () => {
    axios
      .get('http://localhost:3030/books')
      .then((res) => {
        console.log('Books fetched:', res.data);
        setBooks(res.data);
      })
      .catch((err) => console.error('Fetch error:', err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete a book by id
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      axios
        .delete(`http://localhost:3030/books/${id}`)
        .then((res) => {
          console.log('Delete response:', res.data);
          // After delete, fetch updated list
          fetchBooks();
        })
        .catch((err) => {
          if (err.response) {
            console.error('Delete error:', err.response.data);
          } else {
            console.error('Delete error:', err.message);
          }
        });
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/create" className="btn btn-success mb-3">
        Create Book
      </Link>
      {books.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Publisher</th>
              <th scope="col">Book Name</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.publisher}</td>
                <td>{book.name}</td>
                <td>{book.price}</td>
                <td>{book.date}</td>
                <td>
                  <Link
                    to={`/update/${book.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Update
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Records</h2>
      )}
    </div>
  );
};

export default Books;
