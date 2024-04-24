import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Card from "./Card";
import Loader from "../Loader";
import InfiniteScroll from 'react-infinite-scroll-component';
function Trending(props) {
  document.title = "ZMDBS || Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)
  const getTrending = async () => {
    try {
      
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
     

      if(data.results.length > 0) {
      setTrending((prevstate)=>[...prevstate,...data.results]);
      setPage(prev=>prev+1)
      
    }else{
      setHasMore(hasMore=>!hasMore)
    }

  } catch (err) {
      console.log("error:", err);
    }
  };

  const refreshHandler =  ()=>{
    if(trending.length===0){
      getTrending();
    }
    else{
      setPage(1);
      setTrending([]);
      getTrending()
    }
  }
  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending ? (
    <div className="px-[3%] w-screen  pt-4 p min-h-screen">
      <div className=" mb-4 flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[80%]">
          <h1 className="text-3xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6446cd] ri-arrow-left-line cursor-pointer"
            ></i>
            Trending
          </h1>
          <Topnav />
        </div>
        <div className="flex gap-4 mt-4 lg:mt-0">
          <div className="w-full lg:w-auto">
            <Dropdown
              title="category"
              options={["movie", "tv", "all"]}
              func={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="w-full lg:w-auto">
            <Dropdown
              title="duration"
              options={["day", "week"]}
              func={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
      </div >
      <InfiniteScroll
      dataLength={trending.length}
      hasMore={hasMore}
      next={getTrending}
      loader={<h1 className=" text-white w-fit mx-auto pb-4 text-2xl  ">Loading...</h1>}
      >
      <Card data={trending} title={category} />
      </InfiniteScroll>
      {page==50 &&<h1 className=" text-white font-semibold  w-full  bg-zinc-600  pl-[50%] text-3xl  ">End</h1>}
    </div>
  ) : (
    <Loader />
  );
}

export default Trending;
