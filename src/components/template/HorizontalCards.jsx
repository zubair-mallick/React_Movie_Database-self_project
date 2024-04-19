import React, { useRef, useState, useEffect } from "react";

function HorizontalCards({ data }) {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [holdingKey, setHoldingKey] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!holdingKey) {
        if (event.key === "ArrowLeft") {
          handlePrevious();
          setHoldingKey(true);
        } else if (event.key === "ArrowRight") {
          handleNext();
          setHoldingKey(true);
        }
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
  }, [currentIndex, holdingKey]); // Adding currentIndex and holdingKey to dependencies

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
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <div className="w-full min-h-[40vh] p-5 mb-5 relative">
      <div className="mb-5">
        <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>
      </div>

      <div
        ref={scrollRef}
        className="w-full flex overflow-x-auto outline-none relative"
        style={{ scrollBehavior: "smooth" }}
      >
        {data.map((d, i) => (
          <div key={i} className="min-w-[30%] bg-zinc-900 mr-5">
            <img
              className="w-full min-h-[55%] object-cover overflow-y-hidden"
              src={
                (d.backdrop_path || d.poster_path) &&
                `https://image.tmdb.org/t/p/original${d.backdrop_path ||
                  d.profile_path}` ||
                "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
              }
              alt=""
            />

            <h1 className="text-xl font-black text-white">
              {d.original_title || d.name || d.original_name || d.title}
            </h1>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-0 bottom-0 left-0 z-10">
        <button
          className="bg-black bg-opacity-25 text-white py-2 px-4 h-full"
          onClick={handlePrevious}
        >
          <i className="pointer-events-none ri-arrow-left-line"></i>
        </button>
      </div>
      <div className="absolute top-0 bottom-0 right-0 z-10">
        <button
          className="bg-black bg-opacity-25 text-white py-2 px-4 h-full"
          onClick={handleNext}
        >
         <i className=" pointer-events-none ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
}

export default HorizontalCards;
