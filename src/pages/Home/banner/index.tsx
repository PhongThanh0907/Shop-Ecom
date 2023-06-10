import React, { useState, useEffect } from "react";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import { listBanner } from "../../../constants";

const BannerMemo = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? listBanner.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const bgImgStyle = {
    transition: "all 1s",
    backgroundImage: `url(${listBanner[currentIndex]})`,
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === listBanner.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex === 3) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="h-[400px] w-full lg:h-[880px] m-auto relative group">
      <div style={bgImgStyle} className="h-full"></div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <HiOutlineChevronLeft
          className="h-10 w-10 hover-70"
          onClick={prevSlide}
        />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <HiOutlineChevronRight
          className="h-10 w-10 hover-70"
          onClick={nextSlide}
        />
      </div>
      <div className="absolute bottom-10 left-0 right-0 lg:bottom-14  gap-4 flex  justify-center ">
        {listBanner.map((slide, slideIndex) => (
          <div
            key={slide}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer `}
          >
            <div
              className={`p-1 rounded-full  ${
                slideIndex === currentIndex
                  ? "px-4 bg-blue duration-300"
                  : "bg-gray-300 duration-300"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Banner = React.memo(BannerMemo);

export default Banner;
