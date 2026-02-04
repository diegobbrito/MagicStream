import './App.css'
import Home from './components/home/Home.jsx'
import Header from './components/header/Header.jsx'
import { Route, Routes } from 'react-router-dom'
import Register from './components/register/Register.jsx'
import Login from './components/login/Login.jsx'
import Layout from './components/Layout.jsx'
import RequiredAuth from './components/RequiredAuth.jsx'

function App() {

  return (
    <>
      <Header />
      <Routes path="/" element = {Layout}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route element = {<RequiredAuth/>}>
          {/* <Route path='/recommended' element={<Recommended />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App
