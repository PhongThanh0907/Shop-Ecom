import React, { useCallback, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Product } from "../../../types/product.type";
import TitleComponent from "../../../components/title";
import News from "../../Home/news";
import { Link } from "react-router-dom";

interface LeftSideProps {
  state: string;
  list: Product[];
  getList: (data: any) => void;
}

const LeftSide: React.FC<LeftSideProps> = ({ state, list, getList }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("0");
  const newArr: [string | undefined] = [""];

  const withoutDuplicate = list.filter((e) => {
    const isD = newArr.includes(e.brand);
    if (!isD) {
      newArr.push(e.brand);
      return true;
    }
    return false;
  });

  // const setFilterByBrand = useCallback(
  //   (params: any) => {
  //     getList({
  //       brand: params,
  //     });
  //   },
  //   [getList]
  // );

  return (
    <React.Fragment>
      <div
        className={`text-gray-600 border px-2 py-6 rounded-md duration-200 overflow-hidden shadow-md`}
      >
        <span
          onClick={() => setOpenMenu(!openMenu)}
          className="flex items-center gap-1 px-5 cursor-pointer hover-70"
        >
          <HiOutlineChevronDown
            className={`${openMenu ? "" : "rotate-180"} duration-200`}
          />
          <span className="uppercase">{state}</span>
        </span>
        {openMenu ? (
          <div className="h-0 duration-200"></div>
        ) : (
          <div
            className={`flex flex-col opacity-100 duration-200  mt-1 h-[${
              withoutDuplicate.length * 48
            }px] `}
          >
            {withoutDuplicate.map((item, index) => (
              <Link
              to={}
                key={index}
                className={`text-gray-600 uppercase text-sm hover-70 ${
                  index < withoutDuplicate.length - 1
                    ? "border-b border-gray-200"
                    : ""
                } pl-14 py-3 cursor-pointer`}
              >
                {item.brand} (
                <span className="text-xs text-gray-500">
                  {list.filter((i) => i.brand === item.brand).length}
                </span>
                )
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="mt-10">
        <TitleComponent title="Tìm kiếm" />
        <p className="font-semibold mt-4">Lọc theo giá</p>
        <input
          className="w-full mt-6"
          min={100000}
          max={10000000}
          step={100000}
          type="range"
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="flex justify-between">
          <p>100.000đ</p>
          <p>10.000.000đ</p>
        </div>
        <p className="text-sm font-bold text-gray-400 mt-2">
          Giá: {parseInt(price).toLocaleString("vi-VN")}đ
        </p>
      </div>
      <div className="mt-10">
        <News />
      </div>
    </React.Fragment>
  );
};

export default LeftSide;
