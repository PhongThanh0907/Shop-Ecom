import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HiOutlineChevronDown } from "react-icons/hi";
import { AiOutlineBars } from "react-icons/ai";
import { HiViewGrid } from "react-icons/hi";

import Steps from "../../components/steps";
import productService from "../../services/product.service";
import { Product } from "../../types/product.type";
import News from "../Home/news";
import TitleComponent from "../../components/title";
import ListProductFilter from "./ListProductFilter";
import ItemProductRightSide from "../../components/itemProductRightSide";
import ItemProduct from "./rightside/ItemProduct";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const { state } = location;
  const [modalMenu, setModalMenu] = useState<boolean>(true);
  const [changeGrid, setChangeGrid] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("5000000");
  const [brand, setBrand] = useState<string>();
  const [typeSort, setTypeSort] = useState<number>();
  const newArr: [string | undefined] = [""];

  const getProductList = useCallback(async () => {
    try {
      const params = {
        typeProduct: state.value,
      };
      const res = await productService.getProductList(params);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [state]);

  const withoutDuplicate = products.filter((e) => {
    const isD = newArr.includes(e.brand);
    if (!isD) {
      newArr.push(e.brand);
      return true;
    }
    return false;
  });

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  return (
    <div>
      <Steps activeStep={1} state={state.name} />
      <div className="grid grid-cols-1 lg:grid-cols-4 max-w-7xl lg:px-10 px-5  py-2 lg:py-4 mx-auto lg:gap-10">
        <div className="col-span-1">
          <div
            className={`border border-gray-300 lg:py-3 px-6 rounded-md duration-200`}
            style={{
              height: `${
                modalMenu ? `${75 + withoutDuplicate.length * 42}px` : "75px"
              }`,
            }}
          >
            <div
              onClick={() => setModalMenu(!modalMenu)}
              className="flex items-center gap-1 py-2 lg:py-3 cursor-pointer"
            >
              <HiOutlineChevronDown
                className={`${modalMenu ? "" : "rotate-180"} duration-200`}
              />
              <h1 className="uppercase text-md font-semibold">{state.name}</h1>
            </div>
            {modalMenu ? (
              <div className="flex flex-col opacity-100 duration-300">
                {withoutDuplicate.map((item, index) => (
                  <span
                    key={index}
                    onClick={() => setBrand(item.brand)}
                    className={`text-md text-gray-600 uppercase hover:bg-gray-200 duration-200 active:bg-gray-300 rounded-md ${
                      index < withoutDuplicate.length - 1
                        ? "border-b border-gray-200 "
                        : ""
                    } pl-8 py-2 cursor-pointer`}
                  >
                    <span className="text-gray-500 text-sm"> {item.brand}</span>
                    (
                    <span className="text-xs text-gray-500">
                      {products.filter((i) => i.brand === item.brand).length}
                    </span>
                    )
                  </span>
                ))}
              </div>
            ) : (
              <div className="opacity-0 duration-500 h-0 w-full"></div>
            )}
          </div>
          <div className="py-4 lg:py-10">
            <TitleComponent title="Tìm kiếm" />
            <p className="mt-6">Lọc theo giá</p>
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
          <div className="hidden lg:inline">
            <News />
          </div>
        </div>
        <div className="col-span-3">
          <h1 className="uppercase text-xl mb-3 lg:mb-6 font-semibold">
            {/* {type.type ? type.type : "Product"} */} {state.name}
          </h1>
          {/* <div className="">
          
            </div> */}

          <div className="flex items-center justify-end lg:justify-between p-4 rounded-xl bg-gray-100">
            <div className="hidden lg:flex lg:ml-2 gap-2 lg:gap-4 items-center">
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

            <select
              id="filter"
              className="border border-blue rounded-xl py-1 px-2 focus:outline-none focus:shadow-outline text-gray-400 lg:mr-8 sm:mr-2"
              onChange={(e: any) => setTypeSort(e.target.value)}
            >
              <option className="w-[100px]" value="1">
                Sắp xếp theo
              </option>
              <option value="1">Mặc định</option>
              <option value="1">Giá: thấp đến cao</option>
              <option value="-1">Giá: Cao đến thấp</option>
            </select>
          </div>

          <div className="mt-4">
            <ListProductFilter
              typeProduct={state.value}
              brand={brand}
              changeGird={changeGrid}
              listProduct={products}
            />
            {/* {!changeGrid ? (
              <div className="grid grid-cols-4 gap-1">
                {products.map((item: Product) => (
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
              <div className="grid grid-cols-1 gap-2">
                {products.map((item: Product) => (
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
