import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ItemProductLeftSideProps {
  productName: string;
  brand?: string;
  viewed?: boolean;
  oldPrice: number;
  price: number;
  imageProduct: string[];
}

const ItemProductLeftSide: React.FC<ItemProductLeftSideProps> = ({
  brand,
  viewed,
  productName,
  oldPrice,
  price,
  imageProduct,
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
        <div className="loading h-[98px] w-full"></div>
      ) : (
        <div className={`flex ${viewed ? "flex-col" : "flex-row"} gap-4`}>
          <img
            className={`${viewed ? "h-[280px]" : "w-[30%]"} object-cover`}
            src={imageProduct[0]}
            alt="image-product"
          />
          <div>
            <Link to={"/"}>
              {viewed && (
                <h1 className="text-sm text-gray-400 uppercase text-center">
                  {brand}
                </h1>
              )}
              <h1
                className={`font-semibold h-[50px] overflow-hidden hover-70 ${
                  viewed && "text-center"
                }`}
              >
                {productName}
              </h1>
            </Link>
            <p
              className={`line-through text-gray-400 text-xs font-semibold mt-1 ${
                viewed && "text-center mt-1.5"
              }`}
            >
              {oldPrice.toLocaleString("vi-VN")}đ
            </p>
            <p
              className={`text-red-500 text-lg  ${
                viewed ? "text-center" : "font-bold"
              }`}
            >
              {price.toLocaleString("vi-VN")}đ
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemProductLeftSide;
