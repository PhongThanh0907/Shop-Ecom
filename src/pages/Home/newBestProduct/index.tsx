import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Product } from "../../../types/product.type";
import ItemProductRightSide from "../../../components/itemProductRightSide";

interface NewBestProductProps {
  list: Product[];
}

const NewBestProduct: React.FC<NewBestProductProps> = ({ list }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    autoplay: false,
    slidesToScroll: 2,
    initialSlide: 0,
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
  const [statusMenu, setStatusMenu] = useState<boolean>(false);
  return (
    <div className="h-[565px]">
      <div className="flex gap-10 text-xl font-semibold border-b border-gray-300 justify-center">
        <div
          onClick={() => setStatusMenu(false)}
          className={` ${
            !statusMenu && "border-b border-blue"
          } duration-200 pb-3`}
        >
          <p
            className={`${
              statusMenu ? "" : "active-menu relative"
            } duration-200 cursor-pointer`}
          >
            Sản phẩm mới
          </p>
        </div>
        <div
          onClick={() => setStatusMenu(true)}
          className={` ${
            statusMenu && "border-b border-blue"
          } duration-200 pb-3`}
        >
          <h4
            className={`${
              statusMenu ? "active-menu relative" : ""
            } duration cursor-pointer`}
          >
            Bán chạy
          </h4>
        </div>
      </div>
      <div className="pt-3">
        {statusMenu ? (
          <React.Fragment>
            <Slider {...settings}>
              {list.slice(15, 30).map((item: Product) => (
                <ItemProductRightSide item={item} key={item._id} />
              ))}
            </Slider>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Slider {...settings}>
              {list.slice(5, 20).map((item: Product) => (
                <ItemProductRightSide item={item} key={item._id} />
              ))}
            </Slider>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default NewBestProduct;
