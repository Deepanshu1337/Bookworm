import React from 'react'
import HomePageBooksContainer from '../../layouts/HomepageBooksContainer/HomePageBooksContainer'
import Hero from "../../layouts/hero/Hero"
import GenreContainer from"../../../components/layouts/Genre/GenreContainer";

function HomePage() {
  return (
    <>
    <GenreContainer/>
    <HomePageBooksContainer/>
    </>
  )
}

export default HomePage