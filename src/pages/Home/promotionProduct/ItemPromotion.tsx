import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Product } from "../../../types/product.type";
import CountDown from "../../../components/countDown";

interface ItemPromotionProps {
  item: Product;
}

const ItemPromotion: React.FC<ItemPromotionProps> = ({ item }) => {
  const [selectedImage, setSelectedImage] = useState(item.imageProduct[0]);
  return (
    <div className=" lg:grid grid-cols-12 gap-12 h-[400px]">
      <div className="col-span-5 m-auto">
        <img
          className="object-cover h-[80%]"
          src={selectedImage}
          alt="img-product"
        />
      </div>
      <div className="col-span-2 m-auto">
        <div className="flex flex-col gap-4 justify-center">
          {item.imageProduct.map((item, index) => (
            <img
              onClick={() => setSelectedImage(item)}
              className="cursor-pointer border-2 border-gray-200 p-2 rounded-md box-shadow"
              key={index}
              src={item}
              alt="image"
            />
          ))}
        </div>
      </div>
      <div className="pt-10 border-t border-gray-400 mt-10 text-center col-span-5">
        <Link to={`/`}>
          <h1 className="text-lg text-blue font-semibold h-[84px] overflow-hidden hover-70">
            {item.productName}
          </h1>
        </Link>

        <div className="flex my-2 justify-center gap-4">
          <p className="text-red-500 text-xl font-semibold">
            {item.price.toLocaleString("vi-VN")}đ
          </p>
          <p className="mt-[5px] text-sm line-through text-gray-400">
            {item.oldPrice === 0
              ? "19.899.000đ"
              : item.oldPrice.toLocaleString("vi-VN")}
          </p>
        </div>

        <p className="text-lg uppercase text-gray-500">Mua ngay</p>
        <CountDown hours={8} minutes={59} seconds={10} />

        <button className="text-lg font-semibold text-white bg-blue px-12 rounded-xl py-2 hover:bg-[#0099b1] active:bg-[#3498db] duration-300">
          <Link className="uppercase" to={`/products/${item._id}`}>
            Mua ngay
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ItemPromotion;
