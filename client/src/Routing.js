import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserDetails from "./pages/UserDetails/UserDetails";
import MarketPlace from "./pages/MarketPlace/MarketPlace";
import NewPost from "./pages/NewPost/NewPost";

const Routing = () => {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/login" element={<Login />}></Route>

            {localStorage.getItem("token") ? (
              <Route exact path="/new" element={<NewPost />}></Route>
            ) : (
              <Route exact path="/new" element={<Login />}></Route>
            )}

            <Route exact path="/register" element={<Register />}></Route>

            <Route exact path="/accounts/:username" element={<UserDetails />}></Route>
            {localStorage.getItem("token") ? (
              <Route exact path="/app" element={<MarketPlace/>}></Route>
            ) : (
              <Route exact path="/app" element={<Login />}></Route>
            )}
          </Routes>
        </BrowserRouter>
      </>
    );
}

export default Routing
