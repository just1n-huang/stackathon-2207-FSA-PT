import React, { useState, useEffect, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, fetchOnlineUsers } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
import { CircularProgress } from "@mui/material";

const clientID = `?client_id=UzwcBb4YoCuV0lvLoU__6v1-cbVYXiK9ILJzKeJhSFU`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [newImages, setNewImages] = useState(false);
  const mounted = useRef(false);

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
      setNewImages(false);
      setLoading(false);
    } catch (ex) {
      setNewImages(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
  }, [newImages]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
      return;
    }
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <center>
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
        </center>
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
};

export default Home;
