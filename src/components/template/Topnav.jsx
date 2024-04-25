import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../utils/axios";

function Topnav(props) {
  const truncateOverview = (overview) => {
    if (overview && overview.length > 80) {
      return overview.slice(0, 80) + '...'; // Truncate overview to 80 characters and add ellipsis
    }
    return overview; // Return the original overview if it's not longer than 80 characters
  };
  
  const [query, setQuery] = useState([]);
  const [searches, setSearches] = useState(null);
  
  const getSearches = async () => {
    try {
      const {data} = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className='relative z-10  md:w-[40vw]'>
      <i className="text-3xl relative text-zinc-400 ri-search-line"></i>
      <input onChange={(e)=>setQuery(e.target.value)} value={query} className="text-center  px-8 w-[80%] pt-2 text-xl outline-none border-none bg-transparent text-zinc-200" type="text" placeholder='Search Anything' />
      {query.length > 0 &&  
        <i onClick={()=>setQuery("")} className="absolute   text-4xl text-zinc-400 ri-close-fill"></i>
      }
      <div className='absolute w-[90%] max-h-[50vh] bg-zinc-200 top-full lg:top-[90%] overflow-auto rounded-lg'>
        {searches && searches.map((s,i) =>(
          <Link to={`/${s.media_type}/details/${s.id}`} key={i} className='hover:text-zinc-100 duration-300 hover:bg-zinc-600 text-zinc-600 font-semibold px-1  md:px-6 py-2 flex justify-start items-center border-b-2 border-zinc-100'>
            <img className='shadow-lg w-[20vw] lg:w-[8rem] h-[12vh] lg:h-[18vh] rounded mr-2 object-cover' src={(s.backdrop_path || s.profile_path || s.poster_path) && `https://image.tmdb.org/t/p/original${s.backdrop_path || s.profile_path || s.poster_path}` || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} alt="" />
            <span>
              {s.title && s.original_title ? s.original_title +`(${s.title})` : s.original_title && s.original_title || s.name || s.original_name || s.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Topnav;
