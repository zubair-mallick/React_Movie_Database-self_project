import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function SideNav(props) {
  return (
    <div className=" w-[17vw]   h-screen  fixed   border-r-2 border-zinc-400 px-10 py-1  whitespace-nowrap">
      <h1 className=" text-2xl text-white font-bold">
        <i className=" text-[#6556cd] ri-folder-music-fill mr-2"></i>
        <span className="">ZMDBS</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-y-2">
        <h1 className="text-white font-semibold text-xl mt-6 mb-2">
          New Feeds
        </h1>

        <Link to="/trending" className="hover:bg-[#6556cd] hover:text-white rounded-lg  duration-300 p-2">
          <h1>
            Trending<i className="ri-fire-fill ml-1 "></i>
          </h1>
        </Link>
        <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg  duration-300 p-2">
          <h1>
            {" "}
            Popular<i className="ri-bar-chart-grouped-line ml-2"></i>
          </h1>
        </Link>
        <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg  duration-300 p-2">
          <h1>
            Movies
            <i className="ri-movie-2-fill ml-3"></i>
          </h1>
        </Link>
        <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg duration-300 p-2 flex items-center">
          Tv Shows <i className="ri-tv-line ml-2"></i>
        </Link>

        <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg  duration-300 p-2">
          <h1>
            People
            <i className="ri-user-smile-line ml-3"></i>
          </h1>
        </Link>
      </nav>

      <hr className="mt-6 border-none h-[1px] bg-zinc-400" />

      <nav className="flex flex-col text-zinc-400 text-xl gap-y-2">
        <h1 className="text-white font-semibold text-xl mt-6 ">
          WEBSITE INFO{" "}
        </h1>

        <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg  duration-300 p-2">
          About us<i className="ri-information-line text-xl ml-1"></i>
        </Link>
        <Link className="hover:bg-[#6556cd] hover:text-white rounded-lg  duration-300 p-2">
          Contact us<i className="ri-customer-service-line text-xl ml-1"></i>
        </Link>
      </nav>
    </div>
  );
}

export default SideNav;
