// src/api/api.js
import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

const ApiCall = async (query) => {
  try {
    // Determine the appropriate number of results based on the request type
    const resultsLimit = query === 'trending' || query === 'best_sellers' || query === 'new_arrivals' 
      ? 5 
      : Math.max(1, Math.min(maxResults, 40)); // Max 40 results allowed by Google Books API

    const response = await axios.get(`${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${resultsLimit}`);

    // Optionally filter the books based on saleability or other criteria
    const filteredBooks = response.data.items ? response.data.items.filter((book) => {
      return book.saleInfo && book.saleInfo.saleability === "FOR_SALE";
    }) : [];

    return filteredBooks;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export default ApiCall;
