import React from "react"
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom"
import FindFilms from "./components/FindFilms"
import Watchlist from "./components/Watchlist"
import usePageLogic from "./hooks/usePageLogic"






export default function App() {
    const {
      watchlistStorage, 
      removeStorage, 
      addStorage,
     } =  usePageLogic()
    
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<FindFilms watchlistStorage={watchlistStorage} removeStorage={removeStorage} addStorage={addStorage} />} />
            <Route path="/watchlist" element={<Watchlist watchlistStorage={watchlistStorage} removeStorage={removeStorage}  />} />
        </Routes>
      </BrowserRouter>
  )
}




