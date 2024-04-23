import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../../utils/axios";
import Card from "./Card";
import Loader from "../Loader";

function Trending(props) {
  document.title = "ZMDBS || Trending";
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

  useEffect(() => {
    getTrending();
  }, [category, duration]);

  return trending ? (
    <div className="px-[3%] pt-4 p min-h-screen">
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
              options={["today", "week"]}
              func={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
      </div >
      <Card data={trending} title={category} />
    </div>
  ) : (
    <Loader />
  );
}

export default Trending;
