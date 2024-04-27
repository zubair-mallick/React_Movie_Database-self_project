import React from "react";
import { Link } from "react-router-dom";

function PeopleCard({ data }) {
  return (
    <div className="flex flex-wrap gap-[1.37%] w-full">
      {data.map((person, index) => (
        <Link to={`/person/details/${person.id}`} className="w-[47%] h-[full] md:w-[30%] lg:w-[18.9%] mb-5 relative group overflow-hidden hover:scale-105 shadow-lg transition-transform duration-300 ease-in-out" key={index}>
          <img 
            src={`https://image.tmdb.org/t/p/original${person.profile_path}`} 
            onError={(e) => {e.target.onerror = null; e.target.src = 'https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg'}} 
            alt={person.name} 
            className="w-full hover:grayscale hover:mix-blend-color-dodge duration-300" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white px-4 py-3 transition-opacity duration-300 ease-in-out md:opacity-0 group-hover:opacity-100">
            <h1 className="text-base font-semibold mb-1">{person.name}</h1>
            <p className="text-gray-300 text-xs">Known For: {person.known_for.map(item => item.original_title || item.name).join(", ")}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PeopleCard;
