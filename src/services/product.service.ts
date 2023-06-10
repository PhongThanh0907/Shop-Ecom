import { Product } from "../types/product.type";
import { axiosConfig } from "./axiosConfig";

const PRODUCT_API = {
  GET_LIST_PRODUCT: "/products/",
  GET_PRODUCT_DETAIL: (id: string) => `/products/${id}`,
};

const productService = {
  getProductDetail: (productID: string) => {
    return axiosConfig.get<Product>(PRODUCT_API.GET_PRODUCT_DETAIL(productID));
  },
  getProductList: () => {
    return axiosConfig.get(PRODUCT_API.GET_LIST_PRODUCT);
  },
};

export default productService;
