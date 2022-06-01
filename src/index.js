import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles.css"
import App from './App';
import FindFilms from "./components/FindFilms"

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path="" />
            </Route>

        </Routes>
    </BrowserRouter>

, document.getElementById("root"))
