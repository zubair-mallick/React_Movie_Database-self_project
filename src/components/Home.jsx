import React, { useEffect, useState } from "react";
import SideNav from "./template/SideNav";
import Topnav from "./template/Topnav";
import axios from "../utils/axios";
import Header from "./template/Header";
import HorizontalCards from "./template/HorizontalCards";
import Dropdown from "./template/Dropdown";
import Loader from "./Loader";
var lc="notSet"
function Home(props) {
  document.title = "ZMDBS || Home";
  const [wallpaper, setWallpaper] = useState(null);
  const [Trending, setTrending] = useState(null);
  const [trendingCategory, setTrendingCategory] = useState("all");
  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      setWallpaper(data);
    } catch (err) {
      console.log("error:", err);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${trendingCategory}/day`);
      lc=trendingCategory
      setTrending(data.results);
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(
    () => {
      !wallpaper && getHeaderWallpaper();
      lc !== trendingCategory && getTrending();
    },
    [Trending,trendingCategory],[]
  );

  return wallpaper && Trending ? (
    <>
      <SideNav />

      <div className="ml-[17vw] overflow-x-hidden  overflow-auto">
        <Topnav />
        <Header data={wallpaper} />

        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Trending
          </h1>
          <Dropdown
            title={trendingCategory}
            options={["tv", "movie", "all"]}
            func={(e) => setTrendingCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={Trending} />
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default Home;
