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
      const [isOpen, setIsOpen] = useState(false);
      const [drama, setDrama] = useState([]);
      const [horror, setHorror] = useState([]);
      const [sciFi, setSciFi] = useState([]);
      const [action, setAction] = useState([]);
      const [adventure, setAdventure] = useState([]);
      const [animation, setAnimation] = useState([]);
      const [crime, setCrime] = useState([]);
      const [documentary, setDocumentary] = useState([]);
      const [family, setFamily] = useState([]);
      const [fantasy, setFantasy] = useState([]);
      const [history, setHistory] = useState([]);
      const [music, setMusic] = useState([]);
      const [mystery, setMystery] = useState([]);
      const [romance, setRomance] = useState([]);
      const [tvmovie, setTVMovie] = useState([]);
      const [thriller, setThriller] = useState([]);
      const [war, setWar] = useState([]);
      const [western, setWestern] = useState([]);
    
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
    fetchData("movie", "28", setAction); // Fetch action data
    fetchData("movie", "12", setAdventure); // Fetch adventure data
    fetchData("movie", "16", setAnimation); // Fetch animation data
    fetchData("movie", "80", setCrime); // Fetch crime data
    fetchData("movie", "99", setDocumentary); // Fetch documentary data
    fetchData("movie", "10751", setFamily); // Fetch family data
    fetchData("movie", "14", setFantasy); // Fetch fantasy data
    fetchData("movie", "36", setHistory); // Fetch history data
    fetchData("movie", "10402", setMusic); // Fetch music data
    fetchData("movie", "9648", setMystery); // Fetch mystery data
    fetchData("movie", "10749", setRomance); // Fetch romance data
    fetchData("movie", "10770", setTVMovie); // Fetch TV Movie data
    fetchData("movie", "53", setThriller); // Fetch thriller data
    fetchData("movie", "10752", setWar); // Fetch war data
    fetchData("movie", "37", setWestern); // Fetch western data
    
    !wallpaper && getHeaderWallpaper();
    lc !== trendingCategory && getTrending();
  }, [Trending, trendingCategory, comedyCategory, lc, wallpaper]);



 
 
    const toggleNav = () => {
      setIsOpen(!isOpen);
    };


  return wallpaper && Trending && comedy && drama && horror && sciFi && action && adventure && animation && crime && documentary && family && fantasy && history && music && mystery && romance && tvmovie && thriller && war && western ? (
    <>
    <button
  className="fixed top-2 md:left-1 z-50  text-3xl   bg-transparent   text-center  text-white rounded-sm shadow-md  hover:text-red-200 transition-colors duration-300 focus:outline-none   "
  onClick={toggleNav}
>
  {isOpen ? (
    <>
      <i className="ri-close-line "></i>
    </>
  ) : (
    <>
      <i className="ri-menu-line "></i> 
    </>
  )}
</button>
      {isOpen  && <SideNav  />}
      <div className=" overflow-x-hidden overflow-auto" >
        
        <div>
           <div className="w-[100%] ml-6  md:w-[100%] flex  justify-center my-2">
         <Topnav />
         </div>
        
        <Header data={wallpaper} isOpen={isOpen} />
        <div className=" md:px-4" >
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl font-semibold text-zinc-400">
            Trending
          </h1>
          <Dropdown
            title={trendingCategory}
            options={["all", "tv", "movie"]}
            func={(e) => setTrendingCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={Trending} category={trendingCategory} />

        <div className="my-2 px-5 flex justify-between w-full">
          <h1 className="text-3xl  font-semibold text-zinc-400">
            Comedy
          </h1>
          <Dropdown
            title={comedyCategory}
            options={["tv", "movie"]}
            func={(e) => setComedyCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={comedy} category={comedyCategory} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl  font-semibold text-zinc-400">
            Drama
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "18", setDrama)}
          />
        </div>
        <HorizontalCards data={drama} category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl font-semibold text-zinc-400">
            Horror
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "27", setHorror)}
          />
        </div>
        <HorizontalCards data={horror}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl  font-semibold text-zinc-400">
            Sci-Fi
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "878", setSciFi)}
          />
        </div>
        <HorizontalCards data={sciFi}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl  font-semibold text-zinc-400">
            Action
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "28", setAction)}
          />
        </div>
        <HorizontalCards data={action}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl font-semibold text-zinc-400">
            Adventure
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "12", setAdventure)}
          />
        </div>
        <HorizontalCards data={adventure}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl  font-semibold text-zinc-400">
            Animation
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "16", setAnimation)}
          />
        </div>
        <HorizontalCards data={animation}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl  font-semibold text-zinc-400">
            Crime
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "80", setCrime)}
          />
        </div>
        <HorizontalCards data={crime}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl  font-semibold text-zinc-400">
            Documentary
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "99", setDocumentary) }
          />
        </div>
        <HorizontalCards data={documentary}  category={"movie"}/>
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Family
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "10751", setFamily)}
          />
        </div>
        <HorizontalCards data={family}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Fantasy
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "14", setFantasy)}
          />
        </div>
        <HorizontalCards data={fantasy}   category={"movie"}/>
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            History
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "36", setHistory)}
          />
        </div>
        <HorizontalCards data={history}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Music
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "10402", setMusic)}
          />
        </div>
        <HorizontalCards data={music}   category={"movie"}/>
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Mystery
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "9648", setMystery)}
          />
        </div>
        <HorizontalCards data={mystery}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Romance
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "10749", setRomance)}
          />
        </div>
        <HorizontalCards data={romance}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            TV Movie
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "10770", setTVMovie)}
          />
        </div>
        <HorizontalCards data={tvmovie}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Thriller
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "53", setThriller)}
          />
        </div>
        <HorizontalCards data={thriller}  category={"movie"} />
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            War
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "10752", setWar)}
          />
        </div>
        <HorizontalCards data={war}  category={"movie"}/>
        <div className="my-5 px-5 flex justify-between w-full">
          <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
            Western
          </h1>
          <Dropdown
            title="movie"
            options={["movie"]}
            func={(e) => fetchData("movie", "37", setWestern)}
          />
        </div>
        <HorizontalCards data={western}  category={"movie"} />
        <div className="w-screen h-2 " ></div>
        <div ref={bottomOfPageRef}></div>
      </div>
        </div>
        </div>
    </>
  ) : (
    <Loader />
  );
}

export default Home;
