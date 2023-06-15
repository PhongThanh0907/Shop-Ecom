import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Product } from "../../../types/product.type";

import TitleComponent from "../../../components/title";
import ItemProduct from "./ItemProduct";

interface BestSellerProductProps {
  list: Product[];
}

const dataOption = [
  { title: "Bàn phím", value: "keyboard" },
  { title: "Laptop", value: "laptop" },
  { title: "Màn hình", value: "view" },
];

const BestSellerProduct: React.FC<BestSellerProductProps> = ({ list }) => {
  const [selectedOption, setSelectedOption] = useState<string>("keyboard");
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    centerPadding: "60px",
    autoplay: false,
    slidesToScroll: 2,
    initialSlide: 0,
    rows: 2,
    appendDots: (dots: string) => (
      <div
        style={{
          backgroundColor: "transparent",
          borderRadius: "10px",
          position: "absolute",
          bottom: "-40px",
        }}
      >
        <ul className="stick-css flex justify-center items-center">{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="h-5" />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="mt-10 relative">
      <TitleComponent title="Mua nhiều" />
      <div className="mt-8">
        <Slider {...settings}>
          {list.map((item) => (
            <ItemProduct
              id={item._id}
              key={item._id}
              brand={item.brand}
              productName={item.productName}
              image={item.imageProduct}
              oldPrice={item.oldPrice}
              price={item.price}
            />
          ))}
        </Slider>
      </div>
      <div className="flex absolute top-0 right-0 gap-4">
        {dataOption.map((item, index) => (
          <button
            onClick={() => setSelectedOption(item.value)}
            key={index}
            className={`px-4 py-0.5 pb-1 rounded-full  ${
              item.value === selectedOption
                ? "outline outline-2 outline-blue"
                : "text-gray-400"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BestSellerProduct;