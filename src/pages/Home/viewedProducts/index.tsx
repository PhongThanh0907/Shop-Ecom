import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

import { Product } from "../../../types/product.type";

import TitleComponent from "../../../components/title";
import ItemProductLeftSide from "../../../components/itemProductLeftSide";

interface ViewedProductsProps {
  list: Product[];
}

const ViewedProducts: React.FC<ViewedProductsProps> = ({ list }) => {
  const slideRef = useRef<Slider>(null);

  const PrevArrow = () => {
    return (
      <div
        onClick={() => {
          slideRef.current?.slickPrev();
        }}
        className="absolute -top-[14%] right-5  z-10 cursor-pointer"
      >
        <HiChevronLeft className="h-5 w-5 text-gray-400" />
      </div>
    );
  };

  const NextArrow = () => {
    return (
      <div
        className="absolute -top-[14%] right-0  z-10 cursor-pointer"
        onClick={() => {
          slideRef.current?.slickNext();
        }}
      >
        <HiChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    );
  };

  const settings = {
    speed: 600,
    infinite: true,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <TitleComponent title="Sản phẩm đã xem" />
      <div className="gap-y-6 py-8">
        <Slider {...settings} ref={slideRef}>
          {list.map((item: Product) => (
            <ItemProductLeftSide
              key={item._id}
              id={item._id}
              brand={item.brand}
              viewed={true}
              productName={item.productName}
              imageProduct={item.imageProduct}
              price={item.price}
              oldPrice={item.oldPrice}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ViewedProducts;
