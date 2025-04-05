import "./App.css";
import React, { useState } from "react";
import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [alert, setalert] = useState(null); 
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() =>{
      setalert(null)
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert}/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert = {showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
            <Route exact path="/signup" element={<SignUp showAlert = {showAlert}/>} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
