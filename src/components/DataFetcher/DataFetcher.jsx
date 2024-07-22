// src/components/DataFetcher/DataFetcher.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApiCall from '../ApiCall/ApiCall';

const DataFetcher = ({ query, children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await ApiCall(query);
        setBooks(bookData);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return children(books);
};

DataFetcher.propTypes = {
  query: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default DataFetcher;
