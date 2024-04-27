import axios from '..//../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './Topnav';
import Dropdown from './Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';

function Popular(props) {
    document.title = "ZMDBS || Popular"
    const navigate = useNavigate();
    const [category, setCategory] = useState("movie");
    
    const [popular, setPopular] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)

    const getPopular = async () => {
        try {
          
          const { data } = await axios.get(`${category}/popular?page=${page}`);
         
    
          if(data.results.length > 0) {
          setPopular((prevstate)=>[...prevstate,...data.results]);
          setPage(prev=>prev+1)
          
        }else{
          setHasMore(hasMore=>!hasMore)
        }
    
      } catch (err) {
          console.log("error:", err);
        }
      };
      const refreshHandler =  ()=>{
        if(popular.length===0){
          getPopular();
        }
        else{
          setPage(1);
          setPopular([]);
          getPopular()
        }
      }
      useEffect(() => {
        refreshHandler();
      }, [category]);
    
    return popular? (
        <div className="px-[3%] pt-4 w-screen   min-h-screen">
          <div className=" mb-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col lg:flex-row items-center g justify-between w-full lg:w-[76%] ">
            
              <h1 className="text-3xl font-semibold text-zinc-400   ">
                <i
                  onClick={() => navigate(-1)}
                  className="hover:text-[#6446cd] ri-arrow-left-line cursor-pointer mr-2"
                ></i>
                Popular
              </h1>
        
              <Topnav />
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <div className="w-full lg:w-auto">
                <Dropdown
                  title={`${category}`}
                  options={["movie", "tv"]}
                  func={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-auto">
                
              </div>
            </div>
          </div >
          <InfiniteScroll
          dataLength={popular.length}
          hasMore={hasMore}
          next={getPopular}
          loader={<h1 className=" text-white w-fit mx-auto pb-4 text-2xl  ">Loading...</h1>}
          >
          <Card data={popular} title={category} />
          </InfiniteScroll>
          {page==50 &&<h1 className=" text-white font-semibold  w-full  bg-zinc-600  pl-[50%] text-3xl  ">End</h1>}
        </div>
      ) : (
        <Loader />
      );
}

export default Popular;