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
import Brands from "../../components/brands";
import Contact from "../../components/contact";
import Footer from "../../components/footer";

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
      <div className="grid lg:grid-cols-12 grid-cols-2 lg:w-[80%] mx-auto lg:gap-8 pt-14 px-4 lg:px-0">
        <div className="col-span-3 flex flex-col gap-5">
          <FeaturedProducts list={productList.slice(36, 40)} />
          <ViewedProducts list={productList.slice(42, 47)} />
          <div className="hidden lg:inline">
            <News />
          </div>
        </div>
        <div className="col-span-9">
          <NewBestProduct list={productList.slice(0, 30)} />
          <PromotionProduct list={productList.slice(14, 20)} />
          <BestSellerProduct list={productList.slice(15, 50)} />
        </div>
      </div>
      <div className="lg:hidden">
        <News />
      </div>
      <Brands />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
