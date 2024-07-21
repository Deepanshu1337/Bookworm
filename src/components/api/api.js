// // src/api.js
// const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// export const fetchBooks = async (query) => {
//   try {
//     const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&maxResults=10`);
//     const data = await response.json();
//     return data.items || [];
//   } catch (error) {
//     console.error('Error fetching books:', error);
//     return [];
//   }
// };
