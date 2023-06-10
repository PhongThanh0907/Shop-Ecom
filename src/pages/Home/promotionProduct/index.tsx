import React, { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

import { Product } from "../../../types/product.type";

import ItemPromotion from "./ItemPromotion";

interface PromotionProductProps {
  list: Product[];
}

const PromotionProduct: React.FC<PromotionProductProps> = ({ list }) => {
  const slideRef = useRef<Slider>(null);

  const PrevArrow = () => {
    return (
      <div
        onClick={() => {
          slideRef.current?.slickPrev();
        }}
        className="absolute cursor-pointer -top-[80px] -left-10 lg:top-0 z-10 lg:left-[60%] flex items-center justify-center gap-1 text-gray-500 hover:text-black duration-200 active:text-gray-500"
      >
        <HiChevronLeft className="h-6 w-6 mt-1 text-gray-400" />
        Trước đó
      </div>
    );
  };

  const NextArrow = () => {
    return (
      <div
        className="absolute cursor-pointer -top-20 lg:top-0 z-10  flex -right-11 lg:right-0 items-center gap-1 text-gray-500 hover:text-black duration-200 active:text-gray-500"
        onClick={() => {
          slideRef.current?.slickNext();
        }}
      >
        Xem tiếp
        <HiChevronRight className="h-6 w-6 mt-1 text-gray-400" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div>
      <p className="text-2xl">Khuyến mãi trong tuần</p>
      <div className="relative p-10 mt-8 lg:mt-7 border-2 border-blue rounded-lg">
        <Slider {...settings} ref={slideRef}>
          {list.map((item) => (
            <ItemPromotion key={item._id} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PromotionProduct;
