import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

import Trending from './components/template/Trending';
import Popular from './components/template/Popular';
import Movie from './components/template/Movie';
import TvShows from './components/template/TvShows';
import People from './components/template/People';
import About from './components/template/About';


function App(props) {
  return (
    <div className=' bg-[#1f1e24]    flex'>
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/tv_show' element={<TvShows />} />
        <Route path='/people' element={<People />} />
        <Route path='/about' element={<About/>} />




      </Routes>
    </div>
  );
}

export default App;