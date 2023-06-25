import React, { useEffect, useState } from "react";
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
  const [productList, setProdutList] = useState<Product[]>([]);

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

  useEffect(() => {
    setProdutList(list.filter((e) => e.typeProduct === selectedOption));
  }, [selectedOption, list]);

  return (
    <div className="mt-10 relative pb-20 lg:pb-0">
      <TitleComponent title="Mua nhiều" />
      <div className="mt-8">
        <Slider {...settings}>
          {productList.map((item) => (
            <ItemProduct key={item._id} item={item} />
          ))}
        </Slider>
      </div>
      <div className="flex absolute top-1 lg:top-0 right-0 lg:gap-4 gap-1">
        {dataOption.map((item, index) => (
          <button
            onClick={() => setSelectedOption(item.value)}
            key={index}
            className={`lg:px-4 px-2 py-0.5 pb-1 rounded-full text-sm lg:text-md  ${
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
