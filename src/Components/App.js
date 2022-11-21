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
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
// console.log(process.env.REACT_APP_ACCESS_KEY);

const clientID = `?client_id=UzwcBb4YoCuV0lvLoU__6v1-cbVYXiK9ILJzKeJhSFU`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    url = `${mainUrl}${clientID}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log("hello");
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" placeholder="search" className="form-input" />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
