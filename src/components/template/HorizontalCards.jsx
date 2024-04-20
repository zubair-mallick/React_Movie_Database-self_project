import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HorizontalCards({ data }) {
  const scrollRef = useRef(null);
  const containerRef = useRef(null); // Add ref for parent container
  const [currentIndex, setCurrentIndex] = useState(0);
  const [holdingKey, setHoldingKey] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track focus state

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
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
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
    const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;
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
      className="w-full min-h-[40vh] p-5 mb-5 outline-none relative "
      ref={containerRef}
      tabIndex={0}
      onFocus={handleContainerFocus}
      onBlur={handleContainerBlur}
    >
      <div className="mb-5">
        <h1 className="text-3xl min-h-[55%] font-semibold text-zinc-400">
          Trending
        </h1>
      </div>

      <div className="w-full min-h-[55%] flex overflow-x-auto overflow-y-hidden outline-none relative">
        <div
          className="w-full min-h-[55%] overflow-y-hidden flex overflow-x-auto outline-none relative"
          ref={scrollRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {data.map((d, i) => (
            <div key={i} className="min-w-[30%] bg-zinc-900 mr-5">
              <img
                className="w-full min-h-[30%] object-cover overflow-y-hidden"
                src={
                  ((d.backdrop_path || d.poster_path) &&
                    `https://image.tmdb.org/t/p/original${
                      d.backdrop_path || d.profile_path
                    }`) ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt=""
              />
              <h1 className="text-xl font-black text-white ">
                {(d.original_title || d.name || d.original_name || d.title)
                  .length > 20
                  ? `${(
                      d.original_title ||
                      d.name ||
                      d.original_name ||
                      d.title
                    ).slice(0, 20)}...`
                  : d.original_title || d.name || d.original_name || d.title}
              </h1>
              <p className="text-base font-semibold text-white mt-2 mb-2">
                <span className="text-gray-400 ml">Rating: </span>
                {d.vote_average.toFixed(1)} |
                <span className="text-gray-400 m"> Language: </span>
                {d.original_language}
              </p>
              <p className="text-base font-semibold text-white mt-2 mb-6 line-clamp-2">
                {d.overview}
              </p>
              <div className="flex justify-center">
                {" "}
                {/* Center the Link */}
                <Link className="shadow-lg horizontalcardmoreinfo font-[ 'Berkshire Swash','cusive']  Headlink text-blue-200 font-extrabold border-4 border-black rounded-md bg-purple-800 text-2xl px-2 mb-2">
                  moreinfo
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div id="buttons">
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

      {/* Navigation Buttons */}
    </div>
  );
}

export default HorizontalCards;
