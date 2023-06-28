import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Product } from "../../types/product.type";
import productService from "../../services/product.service";
import Steps from "../../components/steps";
import ItemPromotion from "./ItemPromotion";

const PromotionProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

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

  const getProductList = useCallback(async () => {
    try {
      const res = await productService.getProductList();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  return (
    <div className="mt-4">
      <Steps activeStep={1} state="Khuyến mãi" />

      <div className="max-w-7xl mx-auto px-5 lg:px-20 py-10 my-10 relative">
        <div className="border-2 border-blue px-10 py-10 rounded-3xl h-[580px]">
          <>
            <Slider {...settings}>
              {products?.slice(20, 35).map((item) => (
                <ItemPromotion key={item._id} item={item} />
              ))}
            </Slider>
          </>
        </div>
        <div className="absolute top-5 left-12 right-12 lg:left-96 lg:right-96 bg-blue px-5 py-2 text-center rounded-lg">
          <h4 className="text-sm lg:text-lg text-white font-semibold">
            Sản phẩm khuyến mãi giá tốt
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PromotionProduct;
