// import React, { useEffect } from 'react';
// import Home from './Home';
// import Login from './Login';
// import Register from './Register';
// import Cart from './Cart';
// import Profile from './Profile';
// import { connect, useSelector, useDispatch } from 'react-redux';
// import { loginWithToken, fetchCart, fetchOnlineUsers } from '../store';
// import { Link, Routes, Route } from 'react-router-dom';

// class App extends React.Component{
//   componentDidUpdate(prevProps){
//     if(prevProps.auth.id && !this.props.auth.id){
//       window.socket.close();
//     }
//     if(!prevProps.auth.id && this.props.auth.id){
//       window.socket = io();
//       window.socket.emit('auth', window.localStorage.getItem('token'));
//       this.props.dispatch(fetchOnlineUsers());
//       window.socket.on('userEntered', user => {
//         this.props.dispatch({ type: 'USER_ENTERED', user});
//       });
//       window.socket.on('userLeft', user => {
//         this.props.dispatch({ type: 'USER_LEFT', user});
//       });
//     }
//   }
//   render(){
//     return <_App />;
//   }
// }

// const _App = ()=> {
//   const { auth, onlineUsers } = useSelector(state => state);
//   const dispatch = useDispatch();
//   useEffect(()=> {
//     dispatch(loginWithToken());
//   }, []);

//   useEffect(()=> {
//     if(auth.id){
//       dispatch(fetchCart());
//     }
//   }, [auth]);
//   return (
//     <div>
//       <h1>Acme Shopping</h1>
//       {
//         auth.id ? <Home /> : <div><Login /><Register /></div>
//       }
//       {
//         !!auth.id  && (
//           <div>
//             <nav>
//               <Link to='/'>Home</Link>
//               <Link to='/cart'>Cart</Link>
//               <Link to='/profile'>Profile</Link>
//             </nav>
//             <ul>
//               {
//                 onlineUsers.map( user => {
//                   return (
//                     <li key={ user.id }>
//                       { user.username }
//                     </li>
//                   );
//                 })
//               }
//             </ul>
//             <Routes>
//               <Route path='/cart' element={ <Cart /> } />
//               <Route path='/profile' element={ <Profile /> } />
//             </Routes>
//           </div>
//         )
//       }
//     </div>
//   );
// };

// export default connect(
//   state => state
// )(App);

import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart, fetchOnlineUsers } from "../store";
import { Link, Routes, Route } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Photo from "./Photo";
import { logout } from "../store";
import FavoritePhotos from "./FavoritePhotos";

// import { CircularProgress } from "@mui/material";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
// console.log(process.env.REACT_APP_ACCESS_KEY);

// const clientID = `?client_id=UzwcBb4YoCuV0lvLoU__6v1-cbVYXiK9ILJzKeJhSFU`;
// const mainUrl = `https://api.unsplash.com/photos/`;
// const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);
  // const [loading, setLoading] = useState(false);
  // const [photos, setPhotos] = useState([]);
  // const [page, setPage] = useState(0);
  // const [query, setQuery] = useState("");

  // const fetchImages = async () => {
  //   setLoading(true);
  //   let url;
  //   const urlPage = `&page=${page}`;
  //   const urlQuery = `&query=${query}`;

  //   if (query) {
  //     url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
  //   } else {
  //     url = `${mainUrl}${clientID}${urlPage}`;
  //   }

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setPhotos((oldPhotos) => {
  //       if (query && page === 1) {
  //         return data.results;
  //       } else if (query) {
  //         return [...oldPhotos, ...data.results];
  //       } else {
  //         return [...oldPhotos, ...data];
  //       }
  //     });
  //     setLoading(false);
  //   } catch (ex) {
  //     setLoading(false);
  //     console.log(ex);
  //   }
  // };

  // useEffect(() => {
  //   fetchImages();
  // }, [page]);

  // // second useEffect for infinite scroll
  // useEffect(() => {
  //   const event = window.addEventListener("scroll", () => {
  //     if (
  //       !loading &&
  //       window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
  //     ) {
  //       setPage((oldPage) => {
  //         if (oldPage === 0 && !query) {
  //           return oldPage + 2;
  //         } else {
  //           return oldPage + 1;
  //         }
  //       });
  //     }
  //   });
  //   return () => window.removeEventListener("scroll", event);
  // }, []);

  // const handleSubmit = (ev) => {
  //   ev.preventDefault();
  //   setPage(1);
  // };

  return (
    <main>
      {!auth.id ? (
        <nav>
          <div>
            <Link to="/">
              <h3>aperture</h3>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/login">login</Link>
            <p>|</p>
            <Link to="/register">register</Link>
          </div>
        </nav>
      ) : (
        <nav>
          <div>
            <Link to="/">
              <h3>aperture</h3>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/favorite">favorite photos</Link>
            <p>|</p>
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
      {/* 
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
      </section> */}
    </main>
  );
}

export default App;
