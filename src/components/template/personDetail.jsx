import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asynLoadPerson, removePeople } from "../../store/Actions/personActions";
import { Link,  useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";

import HorizontalCards from "./HorizontalCards";
import Dropdown from "./Dropdown";

function personDetails(props) {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const navigate = useNavigate();
      const [readMore, setReadMore] = useState(true);
 
          const [work, setWork] = useState("all");
  useEffect(() => {
    dispatch(asynLoadPerson(id));
    return () => {
      dispatch(removePeople());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (info) {
      document.title = `ZMDBS || ${info.details.original_title ||
        info.details.name ||
        info.details.original_name ||
        info.details.title}`;
    }
  }, [info]);

  return info ? (
    <div className="px-2 w-screen min-h-[100vh] flex flex-col overflow-y-hidden     bg-[#1f1e24]">
   <div className="flex flex-col md:flex-row  px-2 " >
   <div className="" >
    <Link
        onClick={()=>navigate(-1)}
        className="text-3xl font-semibold w-full text-zinc-400 hover:text-[#6446cd]"
      >
        <i className="ri-arrow-left-line"></i>
      </Link>
      <div className="part-2_left_poster_detail lg:max-w-[20vw] w-[100%]   md:min-w-[20vw] md:max-w-[30vw] ">
        <img
         src={(info.details.profile_path||info.details.backdrop_path|| info.details.poster_path  ) && `https://image.tmdb.org/t/p/original${info.details.profile_path||info.details.poster_path||info.details.backdrop_path  }` || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
          alt=""
          className="mt-2 shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] w-[100%] sm:min-h-[10vh] h-[50vh] md:max-h-[65vh] md:min-h-[50%] md:min-w-[20vw] md:max-w-[30vw] md:object-fit object-cover"
        />
        <hr className="mb-2 border-none h-[2px] bg-zinc-500" />
        <div className="flex justify-center gap-x-[8%] md:justify-between md:px-4">
          <a
            target="_blank"
            href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            className="text-xl md:text-2xl text-zinc-100 hover:text-[#6446cd]"
          >
            <i className="ri-instagram-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://twitter.com/${info.externalid.twitter_id}`}
            className="text-xl md:text-2xl text-zinc-100 hover:text-[#6446cd]"
          >
            <i className="ri-twitter-fill"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
            className="text-xl font-extrabold md:text-2xl text-zinc-100 hover:text-[#6446cd]"
          >
            IMDb
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            className="text-xl md:text-2xl text-zinc-100 hover:text-[#6446cd]"
          >
            <i className="ri-facebook-circle-fill"></i>
          </a>
        </div>
        <hr className="mt-2 mb-2 border-none h-[2px] bg-zinc-500" />
      </div>
      
    </div>


    <div className=" mt-4 md:mt-0  ml-4     text-white  ">
    <div
    
        className="select-none md:block hidden text-3xl  w-full text-[#201F24] "
      >
        <i className="ri-arrow-left-line   "></i>
      </div>
      {info.details.name && (
            <h1 className=" text-4xl text-center md:text-left md:text-5xl  lg:text-6xl  mt-2 font-bold">
             <span className="text-zinc-400 ml-2 uppercase">{info.details.name }</span>
            </h1>
          )}
         <h1 className=" mt-4 text-lg md:text-lg lg:text-lg text-zinc-500 font-bold">Biography</h1>
          <h1 className=" mt-1   text-sm   tracking-tighter md:text-base font-semibold text-zinc-200  md:w-[80%]"  id={readMore?"readmore":""}          >
            {info.details.biography}

          </h1>
          <span onClick={()=>setReadMore(prev=>!prev)} className="text-red-200 
           hover:text-red-300 cursor-pointer  mb-2" >{readMore? "readmore":"readless"} </span>
          <div>
  {(info.details.deathday || info.details.known_for_department || info.details.gender) && (
        <div className="md:ml-2 flex flex-col  md:items-start flex-wrap ">
          <h1 className="text-2xl mt-2 md:text-xl lg:text-2xl text-zinc-200 font-bold ">Personal Information</h1>

         
        <div className="flex  gap-x-[3%] w-[90%] flex-wrap  " >
        {info.details.gender && (
            <h1 className="  text-lg md:text-xl  text-zinc-400 md:mt-2 font-bold">
              Gender:<span className="text-zinc-300 ml-2">{info.details.gender === 2 ? "Male" : "Female" }</span>
            </h1>
          )}
         
          {info.details.birthday && (
            <h1 className="text-lg md:text-xl text-zinc-400 md:mt-2  font-bold">
              BirthDay:<span className="text-zinc-300 ml-2">{info.details.birthday}</span>
            </h1>

          )}
           {info.details.deathday && (
            <h1 className="text-lg md:text-xl text-zinc-400 mix-blend-plus-darker md:mt-2  font-bold">
              DeathDay:<span className="text-zinc-300 ml-2">{info.details.deathday}</span>
            </h1>
          )}
           {info.details.known_for_department && (
            <h1 className="text-lg md:text-xl text-zinc-400 md:mt-2  font-bold">
              Main Occupation:<span className="text-zinc-300 ml-2">{info.details.known_for_department}</span>
            </h1>
          )}
        </div>
         
          {(info.details.also_known_as && info.details.also_known_as.length>0)
 && (
            <h1 className=" line-clamp-4 text-lg  md:text-lg lg:text-lg text-zinc-400 mix-blend-plus-darker mt-2 font-bold w-[90%] mb-4 ">
              Also Known By:<span className="text-zinc-300 text-base ml-2">{info.details.also_known_as.join(",")}</span>
            </h1>
          )}
        </div>
      )}
  </div>
   
           
    </div>
   </div>
   
  
  <div>
  <div className="flex  justify-between md:mr-8  ">
  <h1 className="pl-4 ml-2 mb-2  mt-2 text-xl md:text-2xl  text-zinc-200 font-bold"> WORKS</h1>

      <div className="mt-2">
      <Dropdown title={work} options={["tv","all","movie"]} func={(e)=>setWork(e.target.value)}   />
      </div>
  </div>
  
  { (work==="all") && <HorizontalCards data={info.combinedCredits.cast} category="all" />}
  { (work==="tv") && <HorizontalCards data={info.tvCredits.cast} category="tv" />}
  { (work==="movie") && <HorizontalCards data={info.movieCredits.cast} category="movie" />}
   </div>
    </div>

    ) : (
    <Loader />
  );
}

export default personDetails;

