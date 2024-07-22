import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const DataFetcher = ({ query, maxResults, children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const finalURL = `${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("final URl : "+finalURL);
        const response = await axios.get(finalURL);
        setBooks(response.data.items || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, maxResults]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return children(books);
};

DataFetcher.propTypes = {
  query: PropTypes.string.isRequired,
  maxResults: PropTypes.number.isRequired,
  children: PropTypes.func.isRequired,
};

export default DataFetcher;
