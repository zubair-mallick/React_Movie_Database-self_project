import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Card from "./Card";
import Loader from "../Loader";

// var lc="notSet"
function Trending(props) {
    
         const navigate = useNavigate();
        const [category, setCategory] = useState("all");
        const [duration, setDuration] = useState("day");
        const [trending, setTrending] = useState(null);

        const getTrending = async () => {
            try {
              const { data } = await axios.get(`/trending/${category}/${duration}`);
           
              setTrending(data.results);
            } catch (err) {
              console.log("error:", err);
            }
          };
    
          useEffect(()=>{
            getTrending()
          },[category,duration])

          console.log(trending)

  return trending ? (
    <div className="px-[3%] w-[full] pt-4  min-h-screen">
      <div className="w-full flex items-center justify-between">
        <div className="flex justify-between w-[80%] ">
                <h1 className="text-3xl w-fit font-semibold text-zinc-400 ">
                 <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6446cd]  ri-arrow-left-line"
                 >
             
                     </i>
                 Trending
                    </h1>
                    <Topnav />
        </div>
        <div className="flex  gap-10  w-[30vw]">
            <div className="w-[10vw]">
            <Dropdown title="category" options={["movie", "tv", "all"]} func={(e)=>setCategory(e.target.value)} />
            </div>
            <div className=" w-[10vw]">
              <Dropdown title="duration" options={["today", "week"]} func={(e)=>setDuration(e.target.value)} />
            </div>
        </div>
      </div>
      <Card data ={trending} title={category}/>
    </div>
  ): <Loader/>;
}

export default Trending;
