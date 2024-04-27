import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";


function HorizontalCards({ data,category}) {
  
  const scrollRef = useRef(null);
  const containerRef = useRef(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [holdingKey, setHoldingKey] = useState(false);
  const [isFocused, setIsFocused] = useState(false); 

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isFocused) {
        if (!holdingKey) {
          if (event.key === "ArrowLeft") {
            handlePrevious();
            setHoldingKey(true);
          } else if (event.key === "ArrowRight") {
            handleNext();
            setHoldingKey(true);
          }
        }
      } 
      else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        containerRef.current.focus();
      }
    };

    const handleKeyUp = () => {
      setHoldingKey(false);
    };

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentIndex, holdingKey, isFocused]);

  const handleNext = () => {
    const nextIndex = currentIndex === data.length - 3 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? data.length - 3 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const element = scrollRef.current.children[index];
      if (element) {
        scrollRef.current.scrollTo({
          left: element.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const handleContainerFocus = () => {
    setIsFocused(true);
  };

  const handleContainerBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className="w-full  px-5 mb-5 outline-none relative "
      ref={containerRef}
      tabIndex={0}
      onFocus={handleContainerFocus}
      onBlur={handleContainerBlur}
    >
      



   

      <div className="  w-full min-h-[55%] max-h-[85%]  md:max-h-[100%] flex   outline-none relative">
        <div
          className="  w-full min-h-[55%] overflow-y-hidden flex overflow-x-auto outline-none relative"
          ref={scrollRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {category==="none"?data.map((d, i) => (
            <div to={`/${d.media_type || category}/details/${d.id}`} key={i} className="  p-2 pl-4  duration-150     
            min-w-[40vw] md:min-w-[28vw] lg:min-w-[26vw] h-[100%] bg-zinc-900 mr-5">
              <img
                className=" max-h-[22vh] lg:max-h-[32vh] w-[100%] object-cover overflow-y-hidden"
                src={(d.backdrop_path|| d.poster_path  ) && `https://image.tmdb.org/t/p/original${d.backdrop_path  || d.poster_path}` || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                alt=""
              />
              <h1 className="md:text-xl font-black line-clamp-1 text-white text-xs ">
                {(d.original_title || d.name || d.original_name || d.title)
                  .length > 20
                  ? `${(
                      d.original_title ||
                      d.name ||
                      d.original_name ||
                      d.title
                    ).slice(0, 20)}...`
                  : d.original_title || d.name || d.original_name || d.title }
              </h1>
            
            </div>
          )):data.map((d, i) => (
            <Link to={`/${d.media_type || category}/details/${d.id}`} key={i} className=" hover:scale-110 p-2 pl-4  duration-150     
            min-w-[80vw] md:min-w-[28vw] lg:min-w-[26vw] h-[100%] bg-zinc-900 mr-5">
              <img
                className=" max-h-[22vh] lg:max-h-[32vh] w-[100%] object-cover overflow-y-hidden"
                src={(d.backdrop_path|| d.poster_path  ) && `https://image.tmdb.org/t/p/original${d.backdrop_path  || d.poster_path}` || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                alt=""
              />
              <h1 className="md:text-xl font-black line-clamp-1 text-white text-lg ">
                {(d.original_title || d.name || d.original_name || d.title)
                  .length > 20
                  ? `${(
                      d.original_title ||
                      d.name ||
                      d.original_name ||
                      d.title
                    ).slice(0, 20)}...`
                  : d.original_title || d.name || d.original_name || d.title }
              </h1>
              <p className="md:text-base font-semibold text-white mt-2 mb-2 text-base">
               { d.vote_average &&<span  className="text-gray-400  ">Rating: </span>}
                {(d.vote_average.toFixed(1))} 
                {d.original_language && <span className="text-gray-400  ">| Language: </span>}
                {d.original_language}
              </p>
              <p className=" hidden    md:line-clamp-2 font-semibold text-white mt-2 md:mb-3  text-xs ">
                {d.overview}
              </p>
              <div className="flex justify-center ">
                {" "}
               
                
              </div>
            </Link>
          ))} 
        </div>

        <div id="buttons  " className="md:block hidden">
          <div className="absolute top-[30%] bottom-0 left-0 z-10 outline-none ">
            <button
              className="bg-black bg-opacity-25 h-[6vw] w-[6vw] text-white px-2 outline-none text-center rounded-full"
              onClick={handlePrevious}
            >
              <i className="pointer-events-none text-3xl ri-arrow-left-line"></i>
            </button>
          </div>
          <div className="absolute top-[30%] bottom-0 right-0 z-10 outline-none">
            <button
              className="bg-black bg-opacity-40 text-white px-2 h-[6vw] w-[6vw] outline-none text-center rounded-full "
              onClick={handleNext}
            >
              <i className="pointer-events-none text-3xl ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default HorizontalCards;