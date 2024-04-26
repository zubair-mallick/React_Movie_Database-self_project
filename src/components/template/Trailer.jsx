import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function Trailer(props) {
    const { pathname } = useLocation();
   
    const { key } = pathname.includes("movie") ? useSelector(state => state.movie.info.videos) : useSelector(state => state.tv.info.videos);
    const id = (pathname.includes("movie")?useSelector(state => state.movie.info.details.id) :useSelector(state => state.tv.info.details.id))
    let linking
  
        if (pathname.includes("movie")) {
          linking=  `/movie/details/${id}`; 
        } else {
           
          linking=  `/tv/details/${id}`; 
        }
    

    return (
        <div className='h-screen w-[100%] absolute bg-[#0000005a] z-40 top-0 left-0 flex items-center justify-center'>
            

            <div className=' relative md:h-[60vh] lg:h-[80vh]  xl:h-[90vh] h-[40vh] w-[100vw] flex items-center justify-center'>
            <Link to={linking}
               
               className="ri-close-line absolute right-[5%] top-0 text-3xl font-semibold text-zinc-400 hover:text-[#6446cd]"
           >
           </Link>
                <ReactPlayer
                    width={80 + "%"}
                    height={80 + "%"}
                    url={`https://www.youtube.com/watch?v=${key}`} />
            </div>
        </div>
    );
}

export default Trailer;
