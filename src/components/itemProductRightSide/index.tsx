import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";

interface ItemProductRightSideProps {
  id: string;
  productName: string;
  brand: string;
  oldPrice: number;
  price: number;
  image: string[];
}

const ItemProductRightSide: React.FC<ItemProductRightSideProps> = ({
  id,
  productName,
  brand,
  oldPrice,
  price,
  image,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="loading h-[450px] py-5  w-full lg:w-[224px] "></div>
      ) : (
        <div className="group h-[450px] border border-white py-5 hover:border hover:border-gray-200 hover:rounded-md hover:shadow-lg duration-200 cursor-pointer">
          <h1 className="text-gray-400 text-sm uppercase px-4 text-center lg:text-start">
            {brand}
          </h1>
          <div className="border-l group-hover:border-transparent border-gray-100 px-4 relative h-[380px] text-center lg:text-start">
            <Link
              to={`/product/${id}`}
              onClick={scrollToTop}
              className="text-blue-600 font-semibold text-md h-24 overflow-hidden flex hover-70"
            >
              {productName}
            </Link>

            <img
              className="w-[100%] lg:h-[200px] h-[250px] object-cover"
              src={image[0]}
              alt=""
            />
            <div className="absolute lg:bottom-0 -bottom-8 flex justify-between items-center py-2 pt-6 lg:right-4 lg:left-4 right-10 left-10">
              <div>
                <p className="text-gray-400 text-sm line-through">
                  {oldPrice !== 0 && <>{oldPrice?.toLocaleString("vi-VN")}</>}
                </p>
                <p className="text-red-500 text-xl font-semibold">
                  {price.toLocaleString("vi-Vn")}đ
                </p>
              </div>

              <div
                // onClick={() => {
                //   handleOrder();
                // }}
                className="p-2 opacity-40 bg-blue rounded-full cursor-pointer mr-2 group-hover:opacity-100 duration-300 group-hover:bg-backgroundColor text-white"
              >
                <MdAddShoppingCart className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemProductRightSide;
