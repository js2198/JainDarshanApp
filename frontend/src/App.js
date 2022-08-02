import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Search from './components/pages/Search';
import Details from './components/pages/Details';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>

      <BrowserRouter>
      <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
