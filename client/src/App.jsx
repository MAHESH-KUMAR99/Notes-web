import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateNotes from "./pages/CreateNotes"
import Home from "./pages/Home"
import Navbar from "./Components/Navbar"
export default function App() {

  return (
   <>
  <Router>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element ={<CreateNotes/>}/>
    </Routes>
  </Router>
   </>
  )
}