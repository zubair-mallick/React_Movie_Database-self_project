import React, { useEffect, useState } from "react";
import SideNav from "./template/SideNav";
import Topnav from "./template/Topnav";
import axios from "../utils/axios";
import Header from "./template/Header";
import HorizontalCards from "./template/HorizontalCards";
import Dropdown from "./template/Dropdown";
import Loader from "./Loader";

function Home(props) {
  document.title = "ZMDBS || Home";
  const [wallpaper, setWallpaper] = useState(null);

  const [comedyCategory, setComedyCategory] = useState("tv");
  const [comedy, setComedy] = useState([]);

  const [Trending, setTrending] = useState(null);
  const [trendingCategory, setTrendingCategory] = useState("all");

  const [lc, setlc] = useState("notSet");
  
 
  const [dramaCategory, setDramaCategory] = useState("movie");
const [drama, setDrama] = useState([]);
const [horrorCategory, setHorrorCategory] = useState("movie");
const [horror, setHorror] = useState([]);

const getHorror = async () => {
  try {
    const response = await axios.get(`/discover/${horrorCategory}`, {
      params: {
        api_key: '6b4357837079090f55db962379c437f2',
        with_genres: '27' // Assuming horror genre id
      }
    });
    setHorror(response.data.results);
  } catch (error) {
    console.error('Error fetching horror movies:', error);
  }
};

const [sciFiCategory, setSciFiCategory] = useState("movie");
const [sciFi, setSciFi] = useState([]);

const getSciFi = async () => {
  try {
    const response = await axios.get(`/discover/${sciFiCategory}`, {
      params: {
        api_key: '6b4357837079090f55db962379c437f2',
        with_genres: '878' // Assuming sci-fi genre id
      }
    });
    setSciFi(response.data.results);
  } catch (error) {
    console.error('Error fetching sci-fi movies:', error);
  }
};
const getDrama = async () => {
  try {
    const response = await axios.get(`/discover/${dramaCategory}`, {
      params: {
        api_key: '6b4357837079090f55db962379c437f2',
        with_genres: '18' // Assuming drama genre id
      }
    });
    setDrama(response.data.results);
  } catch (error) {
    console.error('Error fetching drama movies:', error);
  }
};


 
  const getComedy = async () => {
    try {
      const response = await axios.get(`/discover/${comedyCategory}`, {
        params: {
          api_key: '6b4357837079090f55db962379c437f2',
          with_genres: '35' 
        }
      });
      setComedy(response.data.results);
    } catch (error) {
      console.error('Error fetching comedy movies:', error);
    }
  };


  
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
      setlc(trendingCategory)
      setTrending(data.results);
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    getComedy();
    getDrama();
    getHorror(); // Fetch horror data
    getSciFi(); // Fetch sci-fi data
    !wallpaper && getHeaderWallpaper();
    lc !== trendingCategory && getTrending();
  }, [Trending, trendingCategory, comedyCategory, dramaCategory, horrorCategory, sciFiCategory, lc, wallpaper]);
  

  return wallpaper && Trending && comedy ? (
    <>
      <SideNav />

      <div className="ml-[17vw] overflow-x-hidden  overflow-auto">
        <div className="ml-[26%]">
        <Topnav />
        </div>

        <Header data={wallpaper} />

        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Trending
          </h1>

          <Dropdown
            title={trendingCategory}
            options={["tv", "movie","all"]}
            func={(e) => setTrendingCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={Trending} />
{/* //////////////////////////////////////////////////////////////// */}
                <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Comedy
          </h1>

          <Dropdown
            title={comedyCategory}
            options={["tv", "movie"]}
            func={(e) => setComedyCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={comedy} />


        <div className="my-5 px-5 flex justify-between w-full">
  <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
    Drama
  </h1>

  <Dropdown
    title={dramaCategory}
    options={["tv", "movie"]}
    func={(e) => setDramaCategory(e.target.value)}
  />
</div>
<HorizontalCards data={drama} />



<div className="my-5 px-5 flex justify-between w-full">
  <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
    Horror
  </h1>

  <Dropdown
    title={horrorCategory}
    options={["movie"]}
    func={(e) => setHorrorCategory(e.target.value)}
  />
</div>
<HorizontalCards data={horror} />

<div className="my-5 px-5 flex justify-between w-full">
  <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
    Sci-Fi
  </h1>

  <Dropdown
    title={sciFiCategory}
    options={[ "movie"]}
    func={(e) => setSciFiCategory(e.target.value)}
  />
</div>
<HorizontalCards data={sciFi} />

      </div>
    </>
  ) : (
    <Loader />
  );
}

export default Home;