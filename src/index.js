import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, browserHistory } from 'react-router-dom';
import "./styles.css"
import App from './App';
import FindFilms from "./components/FindFilms"
import Watchlist from "./components/Watchlist"


ReactDOM.render(
    <BrowserRouter history={browserHistory}>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path="/watchlist" element={<Watchlist  />} />
                <Route index element={<FindFilms />} />
                <Route path="/findfilms" element={<FindFilms />} />
            </Route>
        </Routes>
    </BrowserRouter>

, document.getElementById("root"))
