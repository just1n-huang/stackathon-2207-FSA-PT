// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../store';

// const Home = ()=> {
//   const { auth } = useSelector(state => state);
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <h1>Home</h1>
//       <div>
//         Welcome { auth.username }!!
//         <button onClick={()=> dispatch(logout())}>Logout</button>
//         {
//           !!auth.avatar && <img src={auth.avatar} />
//         }
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, fetchOnlineUsers } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import { CircularProgress } from "@mui/material";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
// console.log(process.env.REACT_APP_ACCESS_KEY);

const clientID = `?client_id=UzwcBb4YoCuV0lvLoU__6v1-cbVYXiK9ILJzKeJhSFU`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function Home() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  // second useEffect for infinite scroll
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          if (oldPage === 0 && !query) {
            return oldPage + 2;
          } else {
            return oldPage + 1;
          }
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image) => {
            return <Photo key={image.id} {...image} />;
          })}
        </div>
        {loading && (
          <h2 className="loading">
            <CircularProgress />
          </h2>
        )}
      </section>
    </main>
  );
}

export default Home;
