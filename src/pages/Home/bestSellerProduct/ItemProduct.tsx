import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

interface ItemProductProps {
  id: string;
  brand: string;
  productName: string;
  image: string[];
  oldPrice: number;
  price: number;
}

const ItemProduct: React.FC<ItemProductProps> = ({
  brand,
  productName,
  image,
  oldPrice,
  price,
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
        <div className="group h-[240px] px-4 relative border border-white py-5 hover:border hover:border-gray-200 hover:rounded-md hover:shadow-lg duration-200 cursor-pointer flex gap-4">
          <img src={image[0]} alt="image" />
          <div>
            <p className="text-sm text-gray-500 uppercase">{brand}</p>
            <h1 className="h-24 overflow-hidden text-blue hover-70">
              {productName}
            </h1>
            <div className="absolute bottom-8">
              <p className="text-gray-400 text-sm line-through">
                {oldPrice !== 0 && <>{oldPrice?.toLocaleString("vi-VN")}đ</>}
              </p>
              <p className="text-red-500 text-xl font-semibold">
                {price.toLocaleString("vi-Vn")}đ
              </p>
            </div>

            <div className="p-2 absolute right-4 bottom-8 opacity-40 bg-blue rounded-full cursor-pointer mr-2 group-hover:opacity-100 duration-300 group-hover:bg-backgroundColor text-white">
              <MdAddShoppingCart className="h-5 w-5" />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemProduct;
