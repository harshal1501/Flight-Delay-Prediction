import Navbar from "./Navbar"

import Home from "./pages/Home"

import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Regi"
import About from './pages/About'
import  Contact from './pages/Contact'
function App() {
  return (
    <>
      <Navbar />
      <div >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
