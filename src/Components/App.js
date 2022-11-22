import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, fetchOnlineUsers } from "../store";
import { Link, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { logout } from "../store";
import FavoritePhotos from "./FavoritePhotos";
import CameraIcon from "@mui/icons-material/Camera";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  return (
    <main>
      {!auth.id ? (
        <nav>
          <div>
            <Link to="/">
              <h3 className="logo">
                exp
                <CameraIcon
                  sx={{
                    color: "#4FA095",
                    fontSize: 20,
                  }}
                />
                sure
              </h3>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/login">login</Link>
            <p>&nbsp;|&nbsp;</p>
            <Link to="/register">register</Link>
          </div>
        </nav>
      ) : (
        <nav>
          <div>
            <Link to="/">
              <h3 className="logo">
                exp
                <CameraIcon
                  sx={{
                    color: "#4FA095",
                    fontSize: 20,
                  }}
                />
                sure
              </h3>
            </Link>
          </div>
          <div className="nav-links">
            <p>welcome, {auth.username}</p>
            <p>&nbsp;|&nbsp;</p>
            <Link to="/favorite">saved photos</Link>
            <p>&nbsp;|&nbsp;</p>
            <Link to="#" onClick={() => dispatch(logout())}>
              logout
            </Link>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorite" element={<FavoritePhotos />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
