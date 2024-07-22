import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const DataFetcher = ({ query, maxResults, children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Create finalURL inside useEffect to ensure it updates with query and maxResults
    const finalURL = `${BASE_URL}?q=${encodeURIComponent(
      query
    )}&maxResults=${maxResults}`;

    const fetchData = async () => {
      if (!query) {
        // Skip fetch if query is empty
        setLoading(false);
        return;
      }

      try {
        console.log("final URL:", finalURL);
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
  }, [query, maxResults]); // Depend on query and maxResults

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
