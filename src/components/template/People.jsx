import axios from '..//../utils/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './Topnav';

import InfiniteScroll from 'react-infinite-scroll-component';

import PeopleCard from './PeopleCard';

function People(props) {
    document.title = "ZMDBS || people"
    const navigate = useNavigate();
   
    
    const [people, setpeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)

    const getpeople = async () => {
        try {
          
          const { data } = await axios.get(`/person/popular`);
         
    
          if(data.results.length > 0) {
          setpeople((prevstate)=>[...prevstate,...data.results]);
          setPage(prev=>prev+1)
          
        }else{
          setHasMore(hasMore=>!hasMore)
        }
    
      } catch (err) {
          console.log("error:", err);
        }
      };
      const refreshHandler =  ()=>{
        if(people.length===0){
          getpeople();
        }
        else{
          setPage(1);
          setpeople([]);
          getpeople()
        }
      }
      useEffect(() => {
        refreshHandler();
      }, []);
    
    return people? (
        <div className="px-[3%] pt-4 w-screen   min-h-screen">
          <div className=" mb-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[76%]">
              <h1 className="text-3xl font-semibold text-zinc-400">
                <i
                  onClick={() => navigate(-1)}
                  className="hover:text-[#6446cd] ri-arrow-left-line cursor-pointer"
                ></i>
                 people
              </h1>
              <Topnav />
            </div>
            <div className="flex gap-4 mt-4 lg:mt-0">
              <div className="w-full lg:w-auto">
               
              </div>
              <div className="w-full lg:w-auto">
                
              </div>
            </div>
          </div >
          <InfiniteScroll
          dataLength={people.length}
          hasMore={hasMore}
          next={getpeople}
          loader={<h1 className=" text-white w-fit mx-auto pb-4 text-2xl  ">Loading...</h1>}
          >
          <PeopleCard data={people}  />
          </InfiniteScroll>
          {page==50 &&<h1 className=" text-white font-semibold  w-full  bg-zinc-600  pl-[50%] text-3xl  ">End</h1>}
        </div>
      ) : (
        <Loader />
      );
}

export default People;