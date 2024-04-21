import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AnimatedCursor from "react-animated-cursor"
import Trending from './components/template/Trending';


function App(props) {
  return (
    <div className=' bg-[#1f1e24]    flex'>
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
      </Routes>
    </div>
  );
}

export default App;