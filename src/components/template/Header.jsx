import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Toggle from "./Toggle";

function Header({ data, isOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomImages, setRandomImages] = useState([]);
  const [imageno, setImageno] = useState(6);
  const [isAnimationOn, setIsAnimationOn] = useState(true); // State for animation

 
  const truncateOverview = (overview) => {
    if (overview && overview.length > 100) {
      return overview.slice(0, 100) + "...";
    }
    return overview;
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 8) {
      return words.slice(0, 8).join(" ") + "...";
    }
    return title;
  };

  useEffect(() => {
    const shuffledImages = shuffleArray(data.results);
    const Images = shuffledImages.slice(0, imageno);
    setRandomImages(Images);

    let interval; // Declare interval variable
    
    if (isAnimationOn) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === imageno - 1) {
            return 0;
          }
          return (prevIndex + 1) ;
        });

       
      }, 5000);
      
    }

    return () => clearInterval(interval); 
  }, [data.results, imageno, isAnimationOn]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageno);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageno - 1 : prevIndex - 1));
  };

  

  return (
    <div>
      <div className="overflow-hidden w-[100%] relative pointer-events-none">
   
     
      <div
        className="h-[34vh] lg:h-[88vh] overflow-hidden relative flex justify-center items-center mb-4 pointer-events-auto"
        style={{
          width: `${imageno * 100}%`,
          marginLeft: `-${currentIndex * 100}%`,
          transition: "margin-left 1s ease",
        }}
       
      >
        {randomImages.map((item, index) => (
          <div
            key={index}
            style={{
              width: `${100 / imageno}%`,
              backgroundImage: `url("https://image.tmdb.org/t/p/original${item.backdrop_path}")`,
              backgroundSize: "cover",
              position: "relative",
            }}
            className="h-full float-left"
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black opacity-[.3] pointer-events-none"
              style={{ zIndex: 0 }}
            ></div>
            <div
              className="absolute w-[90%] mx-auto inset-0 flex justify-center items-center"
              style={{ zIndex: 1 }}
            >
              <header
                id="headertext"
                className="text-center w-[100%] h-[100%] flex flex-col justify-center items-center pointer-events-auto"
              >
                <h1 className="w-[80%] text-xl md:text-2xl lg:text-4xl">
                  <span className="">
                    {truncateTitle(
                      item.title && item.original_title
                        ? `${item.original_title} `
                        : item.title || item.name || item.original_name || ""
                    )}
                  </span>
                </h1>
                <span className="block xl:w-[40%] p-5 md:text-xl lg:text-2xl text-white font-bold line-clamp-2 leading-[28px] mt-2">
                  {truncateOverview(item.overview)}
                  <Link to={`/${item.media_type}/details/${item.id}`} 
                   
                    className="Headlink text-blue-200 font-extrabold border-2 border-black rounded-md bg-purple-800 text-2xl px-2 pointer-events-auto"
                  >
                    moreinfo
                  </Link>
                </span>
                <div className="releasedata text-white text-xl">
                  <span className="text-purple-200 text-2xl">Release Date: </span>{" "}
                  <i className="ri-calendar-line"></i> {item.release_date}
                </div>
                <div className="mediatype text-white text-xl">
                  <span className="text-purple-200 text-xl">Media Type:</span>{" "}
                  <i className="ri-tape-line mr-2"></i>
                  {item.media_type.toUpperCase()}
                </div>
                <div className="watch-trailer-link mt-4">
                  <Link
                    to={item.trailer_link}
                    className="Watchlink py-2 mb-2  text-white font-extrabold border-2 border-black rounded-md bg-purple-800 text-2xl px-2 pointer-events-auto"
                  >
                    Watch Trailer
                  </Link>
                </div>
              </header>
            </div>
          </div>
        ))}
      </div>
      {/* Arrow buttons */}
      <button className="pointer-events-auto absolute top-1/2 w-10 h-10 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2" onClick={goToPrevSlide}>
        <i className="ri-arrow-left-fill"></i>
      </button>
      <button className="pointer-events-auto absolute w-10 h-10 top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2" onClick={goToNextSlide}>
        <i className="ri-arrow-right-fill"></i>
      </button>

      
    </div>
    <div className=" pr-4 flex w-screen justify-end text-lg text-white font-semibold capitalize     " >
 
    <Toggle  isAnimationOnOpen={isAnimationOn} setIsAnimationOn={setIsAnimationOn}  />
    sliding animation
  </div>
    </div>
  );
}

export default Header;
