import { useCallback, useEffect, useState } from "react";

import { Product } from "../../types/product.type";

import Banner from "./banner";
import productService from "../../services/product.service";
import FeaturedProducts from "./featureProduct";
import NewBestProduct from "./newBestProduct";
import ViewedProducts from "./viewedProducts";
import PromotionProduct from "./promotionProduct";
import News from "./news";
import BestSellerProduct from "./bestSellerProduct";

const HomePage = () => {
  const [productList, setListProduct] = useState<Product[]>([]);

  const getListProduct = useCallback(async () => {
    try {
      const res = await productService.getProductList();
      setListProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getListProduct();
  }, [getListProduct]);

  return (
    <>
      <Banner />
      <div className="grid grid-cols-12 w-[80%] mx-auto gap-8 pt-14">
        <div className="col-span-3 flex flex-col gap-5">
          <FeaturedProducts list={productList.slice(36, 40)} />
          <ViewedProducts list={productList.slice(42, 47)} />
          <News />
        </div>
        <div className="col-span-9">
          <NewBestProduct list={productList.slice(0, 30)} />
          <PromotionProduct list={productList.slice(12, 18)} />
          <BestSellerProduct list={productList.slice(15, 50)} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
