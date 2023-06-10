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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="loading h-[450px] w-full lg:w-[224px] "></div>
      ) : (
        <div className="group h-[450px] border border-white py-5 hover:border hover:border-gray-200 hover:rounded-md hover:shadow-lg duration-200 cursor-pointer">
          <h1 className="text-gray-400 text-sm uppercase px-4">{brand}</h1>
          <div className="border-l group-hover:border-transparent border-gray-100 px-4 relative h-[380px]">
            <Link
              to={`/products/${id}`}
              className="text-blue-600 font-semibold text-md h-24 overflow-hidden flex hover-70"
            >
              {productName}
            </Link>

            <img
              className="w-[100%] h-[200px] object-cover"
              src={image[0]}
              alt=""
            />
            <div className="absolute bottom-0 flex justify-between items-center py-2 pt-6 right-4 left-4">
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
