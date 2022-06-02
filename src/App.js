import React from "react"
import {BrowserRouter, Routes, Route } from "react-router-dom"
import FindFilms from "./components/FindFilms"
import Watchlist from "./components/Watchlist"
import usePageLogic from "./hooks/usePageLogic"






export default function App() {
    const {
      watchlistStorage, 
      removeStorage, 
      addStorage,
     } =  usePageLogic()
    
     const findFilms = <FindFilms watchlistStorage={watchlistStorage} removeStorage={removeStorage} addStorage={addStorage} />

    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={findFilms} />
            <Route path="/watchlist" element={<Watchlist watchlistStorage={watchlistStorage} removeStorage={removeStorage}  />} />
            <Route path="*" element={findFilms} />
        </Routes>
      </BrowserRouter>
  )
}




