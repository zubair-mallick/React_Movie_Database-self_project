import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asynLoadMovie, removemovie } from '../../store/Actions/movieActions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader';
import { nanoid } from '@reduxjs/toolkit';

function MovieDetails(props) {
  
    const { id } = useParams();
    const { info } = useSelector(state => state.movie);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(asynLoadMovie(id));
        return () => {
            dispatch(removemovie());
        };
    }, [dispatch, id]);
  
    console.log(info);

    const getStars = (rating) => {
        const fullStars = Math.floor(rating / 2);
        const halfStars = (rating % 2) === 0 ? 0 : 1;
        const starArray = [];
        for (let i = 0; i < fullStars; i++) {
            starArray.push(<i key={i} className="ri-star-fill "></i>);
        }
        if (halfStars === 1) {
            starArray.push(<i key={fullStars} className="ri-star-half-fill "></i>);
        }
        return starArray;
    };
    
    return info ? (
        <div
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${info.details.backdrop_path}")`,
                backgroundPosition: "45% ",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment:'fixed'
            }}
            className='  w-full min-h-screen px-[3vw] '
        >
            {/* Navigation */}
            <nav className='h-[10vh] w-full text-zinc-100 flex gap-6 items-center'>
                <Link to="/" className="text-3xl font-semibold text-zinc-400 hover:text-[#6446cd]">
                    <i className="ri-arrow-left-line"></i>
                </Link>
                <div className="flex gap-4">
                    <a target='_blank' href={info.details.homepage} className="text-xl text-zinc-100 hover:text-[#6446cd]">
                        <i className="ri-external-link-line"></i>
                    </a>
                    <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`} className="text-xl text-zinc-100 hover:text-[#6446cd]">
                        <i className="ri-earth-fill"></i>
                    </a>
                    <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className='text-xl text-zinc-100 hover:text-[#6446cd]'>
                        IMDB
                    </a>
                </div>
            </nav>
            {/*  details */}
            <div className='w-full flex'>
                <img src={`https://image.tmdb.org/t/p/original${info.details.poster_path || info.details.backdrop_path}`} alt="" className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[60vh] object-cover" />

                <div className='content ml-[5%]'>
                    <h1 className='title_heading text-5xl font-black text-white '>
                        {info.details.original_title || info.details.name || info.details.original_name || info.details.title}
                        <small className='text-lg font-bold text-gray-300'>{`(${info.details.release_date.split("-")[0]})`}</small>
                    </h1>
                    <div className='flex  items-center  text-xl  text-zinc-200  mix-blend-plus-darker    font-bold mr-2 '>
                         <div className="flex items-center mt-4  mr-10">
                        <p className="rating   "><span className='rating text-red-400 font-bold mr-2'>Rating:</span></p>
                        <div className=" star  text-[#ffd900fa] text-2xl">
                            {getStars(info.details.vote_average)}
                        </div>
                        

                        </div>
                         <p className='infodetailreleasedate text-end  mt-4 mr-10' >{info.details.release_date}</p>

                         <p className='mt-4'>
                            <span className='rating text-red-400 font-bold' >Genre:</span>
                           <span className='rating ml-2'> {info.details.genres.map((g)=>g.name).join(',')}</span>
                         </p>
                    </div>
                    <h1 className='rating flex  items-center  text-xl  text-zinc-200  mix-blend-plus-darker    font-bold mr-2'><span className='text-red-400 rating mr-2'>Movie duration:</span>{info.details.runtime}min</h1>
                    
                </div>
            </div>

            {/* Available platforms */}
            <div className=' flex-wrap flex'>
                <div>
                    {/* Flatrate providers */}
                    {info.watchProviders && info.watchProviders.flatrate && info.watchProviders.flatrate.length > 0 && (
    <div>


        <div className='mt-2 flex flex-wrap w-[22vw] items-center ' >
            <p className="text-xl text-zinc-300 font-semibold mr-2  ">Flatrate:</p>
            {info.watchProviders.flatrate.map(provider => (
                <img 
                    key={nanoid()}
                    className='object-cover rounded-md h-[3vw] m-2'
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.name}
                />
            ))}
        </div>
    </div>
)}

{info.watchProviders && info.watchProviders.rent && info.watchProviders.rent.length > 0 && (
    <div>
        <div className='mt-2 flex flex-wrap gap-y-2 w-[22vw] items-center' >
            <p className="text-xl text-zinc-300 font-semibold mr-2  ">Rent:</p>
            {info.watchProviders.rent.map(provider => (
                <img 
                    key={nanoid()}
                    className='object-cover rounded-md h-[3vw] m-2'
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.name}
                />
            ))}
        </div>
    </div>
)}

{info.watchProviders && info.watchProviders.buy && info.watchProviders.buy.length > 0 && (
    <div>
        <div className='mt-2 flex flex-wrap w-[22vw]' >
            <p className="text-xl text-zinc-300 font-semibold mr-2  ">Buy:</p>
            {info.watchProviders.buy.map(provider => (
                <img 
                    key={nanoid()}
                    className='object-cover rounded-md h-[3vw] m-2'
                    src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                    alt={provider.name}
                />
            ))}
        </div>
    </div>
)}
                  
                </div>
            </div>
        </div>
    ) : (<Loader />);
}

export default MovieDetails;
