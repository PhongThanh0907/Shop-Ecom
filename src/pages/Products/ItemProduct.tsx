import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";

interface ItemProductProps {
  id: string;
  brand: string;
  productName: string;
  image: string[];
  oldPrice: number;
  price: number;
  code: string;
}

const ItemProduct: React.FC<ItemProductProps> = ({
  brand,
  productName,
  image,
  price,
  code,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading h-[250px] w-full lg:w-full py-4"></div>
      ) : (
        <div className="grid grid-cols-12 gap-6 py-4 shadow-lg">
          <div className="col-span-3">
            <img src={image[0]} alt="" />
          </div>
          <div className="col-span-6 flex flex-col justify-center">
            <h1 className="text-sm text-gray-400 mb-1">{brand}</h1>

            <Link
              to={`/`}
              className="text-blue-600 font-semibold text-md h-20 flex overflow-hidden"
            >
              {productName}
            </Link>
            <div className="flex gap-1 my-1 mb-2">
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-gray-400 h-3 w-3" color="" />
            </div>
            <p className="text-gray-400 font-semibold text-sm">
              {" "}
              - Mã sản phẩm: {code}
            </p>
            <p className="text-sm text-gray-500"> - Bảo hành: 36 tháng</p>
          </div>
          <div className="col-span-3 flex flex-col justify-center px-4">
            <p className="border-b border-gray-200 pb-3 text-gray-600 text-center">
              Trạng thái: <span className="text-green-500">Còn hàng</span>
            </p>
            <h4 className="text-red-500 text-xl my-4 text-center">
              {price.toLocaleString("vi-VN")}đ
            </h4>
            <button
              //   onClick={() => handleOrder()}
              className="flex items-center gap-4 w-full justify-center bg-gray-200 py-2 rounded-3xl text-white font-bold hover:bg-blue duration-300 active:bg-[#01bedb]"
            >
              Mua ngay <MdAddShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemProduct;
