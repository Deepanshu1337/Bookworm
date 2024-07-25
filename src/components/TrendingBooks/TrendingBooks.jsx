import React from "react";
import BookDataHandler from "../DataFetcher/BookDataHandler";

const TrendingBooks = () => {
  return <BookDataHandler query={"trending"} maxResults={5} />;
};

export default TrendingBooks;
