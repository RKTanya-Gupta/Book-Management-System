import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [values, setValues] = useState({
    publisher: '',
    name: '',
    price: '',
    date: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post('http://localhost:3030/books', values)
      .then((res) => {
        console.log('Book added:', res.data);
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <h1>Add a Book</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="publisher" className="form-label">
            Publisher:
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Enter Publisher Name"
            value={values.publisher}
            onChange={(e) => setValues({ ...values, publisher: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bookname" className="form-label">
            Book Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="bookname"
            placeholder="Enter Book Name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bookprice" className="form-label">
            Book Price:
          </label>
          <input
            type="number"
            className="form-control"
            id="bookprice"
            placeholder="Enter Book Price"
            value={values.price}
            onChange={(e) => setValues({ ...values, price: e.target.value })}
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="publishdate" className="form-label">
            Publish Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="publishdate"
            value={values.date}
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
