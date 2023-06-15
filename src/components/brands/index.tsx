import React, { useRef, HTMLProps } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

const listBrand = [
  "https://gearshop.vn/upload/images/Product/Havit/logo.jpg",
  "https://gearshop.vn/upload/images/Product/ajazz.jpg",
  "https://gearshop.vn/upload/files/catalog/FL-Esports-vi%E1%BB%87t-nam-.png",
  "https://gearshop.vn/upload/images/Product/lenovo.jpg",
  "https://gearshop.vn/upload/images/Product/acer.jpg",
  "https://gearshop.vn/upload/images/Product/intel.jpg",
  "https://gearshop.vn/upload/images/Th%C6%B0%C6%A1ng%20Hi%E1%BB%87u/filco-logo-vector.png",
];

const Brands = () => {
  const slideRef = useRef<Slider>(null);

  function PrevArrow() {
    return (
      <div
        onClick={() => {
          slideRef.current?.slickPrev();
        }}
        className="absolute -left-8 top-2 -lg:left-12 z-10 cursor-pointer lg:top-1/3  "
      >
        <HiChevronLeft className="h-7 w-7 text-gray-300 hover:text-gray-600 duration-200" />
      </div>
    );
  }

  function NextArrow() {
    return (
      <div
        className="absolute -right-8 top-2 -lg:right-12 z-10 cursor-pointer lg:top-1/3"
        onClick={() => {
          slideRef.current?.slickNext();
        }}
      >
        <HiChevronRight className="h-7 w-7 text-gray-300 hover:text-gray-600 duration-200" />
      </div>
    );
  }
  const settings = {
    speed: 600,
    infinite: true,
    slidesToShow: 4,
    autoplay: true,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-[80%] px-10 mx-auto relative py-6 border-t border-b border-gray-300 my-20">
      <Slider {...settings} ref={slideRef}>
        {listBrand.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center opacity-40 hover:opacity-100 duration-300"
          >
            <img className="w-[120px] h-[50px] m-auto" src={item} alt="logo" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Brands;
