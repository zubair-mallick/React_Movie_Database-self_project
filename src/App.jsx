import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';

import Trending from './components/template/Trending';
import Popular from './components/template/Popular';
import Movie from './components/template/Movie';
import TvShows from './components/template/TvShows';
import People from './components/template/People';
import About from './components/template/About';
import MovieDetails from './components/template/movieDetails';
import TvDetails from './components/template/tvDetails';
import Trailer from './components/template/Trailer';
function App(props) {
  return (
    <div className=' bg-[#1f1e24]    flex'>
  
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<MovieDetails/>} >
        <Route path='/movie/details/:id/trailer' element={<Trailer/>} />
        </Route>

        <Route path='/tv_show' element={<TvShows />} />
        <Route path='/tv/details/:id' element={<TvDetails/>} >
        <Route path='/tv/details/:id/trailer' element={<Trailer/>} />
        </Route>
        <Route path='/people' element={<People />} />
        <Route path='/about' element={<About/>} />



        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;