import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Dropdown from './Dropdown';
import Topnav from './Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from '..//../utils/axios';
function TvShows(props) {
    document.title = "ZMDBS || tvShow"
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    
    const [tvShow, settvShow] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)

    const gettvShow = async () => {
        try {
          
          const { data } = await axios.get(`tv/${category}?page=${page}`);
         console.log(data)
    
          if(data.results.length > 0) {
          settvShow((prevstate)=>[...prevstate,...data.results]);
          setPage(prev=>prev+1)
          
        }else{
          setHasMore(hasMore=>!hasMore)
        }
    
      } catch (err) {
          console.log("error:", err);
        }
      };
      const refreshHandler =  ()=>{
        if(tvShow.length===0){
          gettvShow();
        }
        else{
          setPage(1);
          settvShow([]);
          gettvShow()
        }
      }
      useEffect(() => {
        refreshHandler();
      }, [category]);
    
    return tvShow? (
        <div className="px-[3%] pt-4 w-screen   min-h-screen">
          <div className=" mb-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[76%]">
              <h1 className="text-3xl font-semibold text-zinc-400">
                <i
                  onClick={() => navigate(-1)}
                  className="hover:text-[#6446cd] ri-arrow-left-line cursor-pointer"
                ></i>
                Tv shows
              </h1>
              <Topnav />
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <div className="w-full lg:w-auto">
                <Dropdown
                  title={`${category}`}
                  options={["top_rated", "popular","on_the_air","airing_today"]}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-auto">
                
              </div>
            </div>
          </div >
          <InfiniteScroll
          dataLength={tvShow.length}
          hasMore={hasMore}
          next={gettvShow}
          loader={<h1 className=" text-white w-fit mx-auto pb-4 text-2xl  ">Loading...</h1>}
          >
          <Card data={tvShow} title={category} />
          </InfiniteScroll>
          {page==50 &&<h1 className=" text-white font-semibold  w-full  bg-zinc-600  pl-[50%] text-3xl  ">End</h1>}
        </div>
      ) : (
        <Loader />
      );
}


export default TvShows;