import axios from '..//../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './Topnav';
import Dropdown from './Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';

function Movie(props) {
    document.title = "ZMDBS || movie"
    const navigate = useNavigate();
    const [category, setCategory] = useState("upcoming");
    
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)

    const getMovie = async () => {
        try {
          
          const { data } = await axios.get(`movie/${category}?page=${page}`);
      
    
          if(data.results.length > 0) {
          setMovie((prevstate)=>[...prevstate,...data.results]);
          setPage(prev=>prev+1)
          
        }else{
          setHasMore(hasMore=>!hasMore)
        }
    
      } catch (err) {
          console.log("error:", err);
        }
      };
      const refreshHandler =  ()=>{
        if(movie.length===0){
          getMovie();
        }
        else{
          setPage(1);
          setMovie([]);
          getMovie()
        }
      }
      useEffect(() => {
        refreshHandler();
      }, [category]);
    
    return movie? (
        <div className="px-[3%] pt-4 w-screen   min-h-screen">
          <div className=" mb-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[76%]">
              <h1 className="text-3xl font-semibold text-zinc-400">
                <i
                  onClick={() => navigate(-1)}
                  className="hover:text-[#6446cd] ri-arrow-left-line cursor-pointer"
                ></i>
                Movies
              </h1>
              <Topnav />
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <div className="w-full lg:w-auto">
                <Dropdown
                  title={`${category}`}
                  options={["popular", "top_rated","now_playing"]}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-auto">
                
              </div>
            </div>
          </div >
          <InfiniteScroll
          dataLength={movie.length}
          hasMore={hasMore}
          next={getMovie}
          loader={<h1 className=" text-white w-fit mx-auto pb-4 text-2xl  ">Loading...</h1>}
          >
          <Card data={movie} title="movie" />
          </InfiniteScroll>
          {page==50 &&<h1 className=" text-white font-semibold  w-full  bg-zinc-600  pl-[50%] text-3xl  ">End</h1>}
        </div>
      ) : (
        <Loader />
      );
}

export default Movie;