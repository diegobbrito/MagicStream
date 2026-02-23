import './App.css'
import Home from './components/home/Home.jsx'
import Header from './components/header/Header.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './components/register/Register.jsx'
import Login from './components/login/Login.jsx'
import Layout from './components/Layout.jsx'
import RequiredAuth from './components/RequiredAuth.jsx'
import Recommended from './components/recommended/Recommended.jsx'
import Review from './components/review/Review.jsx'
import axiosClient from './api/axiosConfig';
import useAuth from './hook/useAuth';

function App() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();
  
  const updateMovieReview = (imdb_id) => {
    navigate(`/review/${imdb_id}`)
  }

  const handleLogout = async () => {
    try {
      await axiosClient.post("/logout", {user_id: auth.user_id});
      setAuth(null);
      localStorage.removeItem("user");

    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <>
      <Header handleLogout={handleLogout} />
      <Routes path="/" element = {Layout}>
        <Route path='/' element={<Home updateMovieReview={updateMovieReview}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element = {<RequiredAuth/>}>
          <Route path='/recommended' element={<Recommended />} />
          <Route path='/review/:imdb_id' element={<Review />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
