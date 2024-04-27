import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynLoadTv, removeTv } from "../../store/Actions/tvActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import { nanoid } from "@reduxjs/toolkit";
import HorizontalCards from "../template/HorizontalCards";

function TvDetails(props) {

  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynLoadTv(id));
    return () => {
      dispatch(removeTv());
    };
  }, [dispatch, id]);

   info ? document.title = `ZMDBS || ${info.details.original_title ||
    info.details.name ||
    info.details.original_name ||
    info.details.title}`:""

  const getStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStars = rating % 2 === 0 ? 0 : 1;
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
        backgroundImage: `url("https://image.tmdb.org/t/p/original${info.details.backdrop_path||info.details.poster_path}")`,
      }}
      className=' relative backroundmoviedetails backround w-full min-h-screen bg-cover bg-center bg-fixed md:bg-[url("https://image.tmdb.org/t/p/original${info.details.backdrop_path}")]   md:bg-[center] md:bg-[cover] overflow-y-hidden'
    >
      
      <nav className="h-[10vh] w-full text-zinc-100 flex gap-6 items-center">
        <Link
           to="/"
          className="text-3xl font-semibold text-zinc-400 hover:text-[#6446cd]"
        >
          <i className="ri-arrow-left-line"></i>
        </Link>
        <div className="flex gap-x-4">
          <a
            target="_blank"
            href={info.details.homepage}
            className="text-xl text-zinc-100 hover:text-[#6446cd]"
          >
            <i className="ri-external-link-line"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            className="text-xl text-zinc-100 hover:text-[#6446cd]"
          >
            <i className="ri-earth-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            className="text-xl text-zinc-100 hover:text-[#6446cd]"
          >
            IMDB
          </a>
        </div>
      </nav>
      {/*  details */}

      <div className="w-full flex flex-col md:flex-row">
        <div className="   md:mx-2 ">
          <img
              src={(info.details.backdrop_path|| info.details.poster_path  ) && `https://image.tmdb.org/t/p/original${info.details.poster_path||info.details.backdrop_path  }` || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
            alt=""
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]  w-[100%] xsm:h-[10vh] h-[50vh] md:max-h-[65vh] md:min-h-[70%]  md:min-w-[20vw] md:max-w-[30vw] md:object-fit  object-cover "
          />
          <div className="rating flex-wrap flex text-xl md:text-2xl   md:ml-[2%]">
          <div className="mt-2 flex gap-x-[2%]">
            {info.videos  &&(<Link
            
            to={`/tv/details/${info.details.id}/trailer`}
              className="   w-fit  bg-red-700 inline-block rounded bg-primary px-3 py-3 text-xs font-medium uppercase leading-normal text-white  dark:shadow-black/30 hover:font-bold  hover:bg-red-600 dark:focus:shadow-dark-strong dark:active:shadow-dark-strong text-center"
            >
              Play Trailer
            </Link>)}
          </div>
          </div>
        </div>

        <div className="content ml-[1%]">
          <h1 className="title_heading  text-3xl sm:text-4xl  md:text-7xl lg:text-6xl   font-black text-white ">
            {info.details.original_title ||
              info.details.name ||
              info.details.original_name ||
              info.details.title}
            <small className="text-lg font-bold text-gray-300">{`(${
              info.details.first_air_date.split("-")[0]
            })`}</small>
          </h1>
          <div className="flex flex-wrap  items-center gap-x-1 md:gap-x-3 lg:gap-x-10 text-lg md:text-xl  lg:text-2xl      text-zinc-200  mix-blend-plus-darker    font-bold mr-2 ">
            <div className="flex items-center md:mt-4  ">
              <p className="rating   ">
                <span className="rating text-red-400 font-bold ">Rating:</span>
              </p>
              <div className=" star  text-[#ffd900fa] ">
                {getStars(info.details.vote_average)}
              </div>
            </div>
            <p className="infodetailreleasedate text-end  md:mt-4">
              {info.details.release_date}
            </p>

            <p className="md:mt-4">
              <span className="rating text-red-400 font-bold">Genre:</span>
              <span className="rating ml-2">
                {" "}
                {info.details.genres.map((g) => g.name).join(",")}
              </span>
            </p>
            <p className="rating flex  items-center   text-zinc-200  mix-blend-plus-darker  md:mt-4   font-bold ">
              <span className="text-red-400 rating mr-2">Tv duration:</span>
              {info.details.runtime}min
            </p>
          </div>

          {info.details.tagline && (
            <h1 className=" infodetailTagline md:text-xl w-full md:w-[80%] mt-3  text-center font-semibold italic text-zinc-200 ">
              {info.details.tagline}
            </h1>
          )}

          <h1 className="infodetailsoverview text-lg md:text-xl  lg:text-3xl      text-zinc-100  mix-blend-plus-darker    font-bold mr-2 ">
            Overview
          </h1>
          <h1 className="infodetailsoverview text-base   tracking-tighter md:text-xl font-semibold text-zinc-200  md:w-[80%]">
            {info.details.overview}
          </h1>

          <div className="flex items-center flex-wrap">
            {/* Flatrate providers */}
            {info.watchProviders &&
              info.watchProviders.flatrate &&
              info.watchProviders.flatrate.length > 0 && (
                <>
                  <p className="rating text-red-200 font-semibold md:ml-4 ">Flatrate:</p>
                  {info.watchProviders.flatrate.slice(0, 4).map((provider) => (
                    <img
                      key={nanoid()}
                      className="object-cover rounded-md h-[6vw] md:h-[2.4vw] m-2"
                      src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                      alt={provider.name}
                    />
                  ))}
                </>
              )}

            {/* Rent providers */}
            {info.watchProviders &&
              info.watchProviders.rent &&
              info.watchProviders.rent.length > 0 && (
                <>
                  <p className="rating text-red-200 font-semibold md:ml-4 ">Rent:</p>
                  {info.watchProviders.rent.slice(0, 4).map((provider) => (
                    <img
                      key={nanoid()}
                      className="object-cover rounded-md h-[6vw] md:h-[2.4vw] m-2"
                      src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                      alt={provider.name}
                    />
                  ))}
                </>
              )}

            {/* Buy providers */}
            {info.watchProviders &&
              info.watchProviders.buy &&
              info.watchProviders.buy.length > 0 && (
                <>
                  <p className=" rating text-red-200 font-semibold md:ml-4 mr-2">Buy:</p>
                  {info.watchProviders.buy.slice(0, 4).map((provider) => (
                    <img
                      key={nanoid()}
                      className="object-cover rounded-md h-[6vw] md:h-[2.4vw] m-2"
                      src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                      alt={provider.name}
                    />
                  ))}
                </>
              )}
          </div>

          
        </div>
      </div>
      <h1 className=" mt-2 infotranslation text-base ml-[5%]  md:ml-4 tracking-tighter md:text-2xl font-semibold text-zinc-100  md:w-[80%]">
        Available Languages:
      </h1>
      <p className="infotranslation text-zinc-100 text-sm line-clamp-3 ml-[5%] md:ml-4">
        {info.translations.join(", ")}
      </p>
      {/* recommendations and similar */}
        
      {(info.details.seasons) &&  (<div>
        <h1 className="mt-2 infotranslation text-base ml-[5%]  md:ml-4 tracking-tighter md:text-2xl font-semibold text-zinc-100  md:w-[80%] mb-4">
          All Seasons
        </h1>
       
          <HorizontalCards data={info.details.seasons} category={"none"} />
     
      </div>)}
        <hr />
      {((info.recommendations ||info.recommendations.length>0 ) && (info.similar||info.similar.length>0)) &&  (<div>
        <h1 className="mt-2 infotranslation text-base ml-[5%]  md:ml-4 tracking-tighter md:text-2xl font-semibold text-zinc-100  md:w-[80%] mb-4">
          Recommendations & Similar stuff
        </h1>
        {info.recommendations && info.recommendations.length>0 ? (
          <HorizontalCards data={info.recommendations} />
        ) : (
          <HorizontalCards data={info.similar} />
        )}
      </div>)}
        <hr />
      <Outlet></Outlet>
    </div>
  ) : (
    <Loader />
  );
}

export default TvDetails;
