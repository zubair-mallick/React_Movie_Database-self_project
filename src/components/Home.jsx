import React, { useEffect, useState, useRef } from "react";
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

  // Ref to track the bottom of the page
  const bottomOfPageRef = useRef(null);

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

  // Functions to fetch data for other genres
  const fetchData = async (category, genreId, setData) => {
    try {
      const response = await axios.get(`/discover/${category}`, {
        params: {
          api_key: '6b4357837079090f55db962379c437f2',
          with_genres: genreId
        }
      });
      setData(response.data.results);
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
    }
  };

  useEffect(() => {
    getComedy();
    fetchData("movie", "18", setDrama); // Fetch drama data
    fetchData("movie", "27", setHorror); // Fetch horror data
    fetchData("movie", "878", setSciFi); // Fetch sci-fi data
    !wallpaper && getHeaderWallpaper();
    lc !== trendingCategory && getTrending();
  }, [Trending, trendingCategory, comedyCategory, lc, wallpaper]);

  // Function to handle lazy loading
  const handleLazyLoad = async () => {
    // Check if bottom of page is reached
    if (
      bottomOfPageRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      // Fetch more data
      // For example, fetch more comedy data
      try {
        const response = await axios.get(`/discover/${comedyCategory}`, {
          params: {
            api_key: '6b4357837079090f55db962379c437f2',
            with_genres: '35' 
          }
        });
        // Append newly fetched data to existing data
        setComedy((prevData) => [...prevData, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching comedy movies:', error);
      }
    }
  };

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleLazyLoad);
    return () => {
      // Remove scroll event listener when component unmounts
      window.removeEventListener("scroll", handleLazyLoad);
    };
  }, []);

  const [drama, setDrama] = useState([]);
  const [horror, setHorror] = useState([]);
  const [sciFi, setSciFi] = useState([]);

  return wallpaper && Trending && comedy && drama && horror && sciFi ? (
    <>
      <SideNav />
      <div className="ml-[17vw] overflow-x-hidden overflow-auto">
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
            options={["all", "tv", "movie"]}
            func={(e) => setTrendingCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={Trending} />
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
          {/* Assuming drama genre id is 18 */}
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "18", setDrama)}
          />
        </div>
        <HorizontalCards data={drama} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Horror
          </h1>
          {/* Assuming horror genre id is 27 */}
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "27", setHorror)}
          />
        </div>
        <HorizontalCards data={horror} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Sci-Fi
          </h1>
          {/* Assuming sci-fi genre id is 878 */}
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "878", setSciFi)}
          />
        </div>
        <HorizontalCards data={sciFi} />
        {/* Marker for the bottom of the page */}
        <div ref={bottomOfPageRef}></div>
      </div>
    </>
  ) : (
    <Loader />
  );
}

export default Home;
