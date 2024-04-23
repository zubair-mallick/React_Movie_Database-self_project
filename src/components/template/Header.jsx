import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header({ data,isOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomImages, setRandomImages] = useState([]);
  const [imageno, setImageno] = useState(3);

  const truncateOverview = (overview) => {
    if (overview && overview.length > 100) {
      return overview.slice(0, 100) + "..."; // Truncate overview to 100 characters and add ellipsis
    }
    return overview; // Return the original overview if it's not longer than 100 characters
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 8) {
      return words.slice(0, 8).join(" ") + "..."; // Concatenate the first 8 words and add ellipsis
    }
    return title; // Return the original title if it's not greater than 8 words
  };

  useEffect(() => {
    // Shuffle the array of images
    const shuffledImages = shuffleArray(data.results);
    // Select the first 'imageno' images
    const Images = shuffledImages.slice(0, imageno);
    setRandomImages(Images);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === imageno - 1) {
          return 0;
        }
        return (prevIndex + 1) % imageno; // Since we're displaying only 'imageno' images
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [data.results, imageno]);

  // Function to shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div className="overflow-hidden w-[100%]">
      <div
        className="h-[34vh] lg:h-[64vh]  overflow-hidden relative flex justify-center items-center mb-4"
        style={{
          width: `${imageno * 100}%`, // Use viewport width (vw) instead of percentage
          marginLeft: `-${currentIndex * 100}%`, // Slide to the left using vw units
          transition: "margin-left 1s ease", // Smooth transition
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
              className="absolute inset-0 bg-black opacity-[.3]"
              style={{ zIndex: 0, pointerEvents: 'none' }} // Disable pointer events
            ></div>
            <div
              className="absolute w- inset-0 flex justify-center items-center"
              style={{ zIndex: 1, pointerEvents: 'auto' }} // Enable pointer events
            >
              <header id="headertext" className="text-center w-[100%] h-[100%] flex flex-col justify-center items-center">
                <h1 className=" w-[80%]  text-xl md:text-2xl lg:text-4xl">
                  <span className="">
                    {truncateTitle(
                      item.title && item.original_title
                        ? `${item.original_title} `
                        : (item.original_title && item.original_title) ||
                            item.name ||
                            item.original_name ||
                            item.title
                    )}
                  </span>
                </h1>
                <span className="block  xl:w-[40%]  p-5 md:text-xl lg:text-2xl  text-white font-bold line-clamp-2 leading-[28px] mt-2">
                  {truncateOverview(item.overview)}
                  <Link
                    to="/your-more-info-path"
                    className="Headlink text-blue-200 font-extrabold border-2 border-black rounded-md bg-purple-800 text-2xl px-2"
                  >
                    moreinfo
                  </Link>
                </span>
                <div className="releasedata text-white text-xl ">
                  <span className="text-purple-200 text-2xl">Release Date: </span>{" "}
                  <i className="ri-calendar-line"></i> {item.release_date}
                </div>
                <div className="mediatype text-white text-xl">
                  <span className="text-purple-200 text-xl">Media Type:</span>{" "}
                  <i className="ri-tape-line mr-2"></i>{item.media_type.toUpperCase()}
                </div>
                <div className="watch-trailer-link mt-4">
                  <Link
                    to={item.trailer_link} // Add the trailer link dynamically from the data
                    className="Watchlink py-2 text-white font-extrabold border-2 border-black rounded-md bg-purple-800 text-2xl px-2 "
                  >
                    Watch Trailer
                  </Link>
                </div>
              </header>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
