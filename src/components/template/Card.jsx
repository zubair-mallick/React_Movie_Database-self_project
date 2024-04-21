import React from "react";
import { Link } from "react-router-dom";

function Card({ data }) {
  return (
    <div className="flex flex-wrap gap-x-4 w-full">
      {data.map((d, i) => (
        <Link className="w-1/5 mb-5 relative group overflow-hidden hover:scale-105  shadow-lg transition-transform duration-300 ease-in-out" key={i}>
          <img src={`https://image.tmdb.org/t/p/original${d.poster_path || d.backdrop_path}`} alt="" className="w-full hover:grayscale hover:mix-blend-color-dodge duration-300" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white px-4 py-3 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
            <h1 className="text-lg font-semibold mb-1">{d.original_title || d.name || d.original_name || d.title}</h1>
            <div className="flex justify-between">
              <p className="text-gray-300 text-sm">Rating: {d.vote_average.toFixed(1)}</p>
              <p className="text-gray-300 text-sm">Language: {d.original_language}</p>
            </div>
            <p className="text-gray-300 text-sm mt-1">Age Rating: {d.adult ? '18+' : 'All Ages'}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Card;
