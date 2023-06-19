import React, { ChangeEvent, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { HiViewGrid } from "react-icons/hi";

import { Product } from "../../../types/product.type";
import ItemProductRightSide from "../../../components/itemProductRightSide";
import ItemProduct from "./ItemProduct";

interface RightSideProps {
  state: string;
  list: Product[];
}

const RightSide: React.FC<RightSideProps> = ({ state, list }) => {
  const [changeGrid, setChangeGrid] = useState<boolean>(false);
  const [typeSort, setTypeSort] = useState<string>();
  return (
    <div>
      <h1 className="uppercase text-xl mb-3 lg:mb-6">
        {state ? state : "Product"}
      </h1>
      <div className="flex items-center justify-end lg:justify-between p-4 rounded-xl bg-gray-100">
        <div className="hidden lg:flex lg:ml-2 gap-2 lg:gap-6">
          <HiViewGrid
            onClick={() => setChangeGrid(false)}
            className={`${
              changeGrid === false ? "opacity-100" : "opacity-40"
            } h-6 w-6 cursor-pointer duration-300 hover:opacity-100`}
          />
          <AiOutlineBars
            onClick={() => setChangeGrid(true)}
            className={`${
              changeGrid ? "opacity-100" : "opacity-40"
            } h-6 w-6 hover:opacity-100 duration-300 cursor-pointer`}
          />
        </div>

        <div className="">
          <select
            id="filter"
            className="border border-blue rounded-xl py-1 px-2 focus:outline-none focus:shadow-outline text-gray-400 lg:mr-8 sm:mr-2"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setTypeSort(e.target.value)
            }
          >
            <option className="w-[100px]" value="1">
              Sắp xếp theo
            </option>
            <option value="1">Mặc định</option>
            <option value="1">Giá: Thấp đến cao</option>
            <option value="-1">Giá: Cao đến thấp</option>
          </select>
        </div>
      </div>
      {!changeGrid ? (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {list.map((item) => (
            <ItemProductRightSide
              key={item._id}
              brand={item.brand}
              id={item._id}
              image={item.imageProduct}
              oldPrice={item.oldPrice}
              price={item.price}
              productName={item.productName}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 mt-4">
          {list.map((item) => (
            <ItemProduct
              key={item._id}
              brand={item.brand}
              id={item._id}
              image={item.imageProduct}
              oldPrice={item.oldPrice}
              price={item.price}
              productName={item.productName}
              code={item.code}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSide;
