import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Layout from './components/Layout'
import AllQuoters from './pages/AllQuoters'
import MyQuotes from './pages/MyQuotes'
import AddQuote from './pages/AddQuote'
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route index element={<AllQuoters />} />
        <Route path="/my-quotes" element={<MyQuotes />} />
        <Route path="/add-quote" element={<AddQuote />} />
      </Route>
    </Routes>
  )
}
