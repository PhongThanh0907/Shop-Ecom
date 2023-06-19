import React, { useState, useCallback, useEffect } from "react";

import ItemProduct from "./rightside/ItemProduct";
import ItemProductRightSide from "../../components/itemProductRightSide";
import { Product } from "../../types/product.type";
import productService from "../../services/product.service";

interface ListProductFilterProps {
  type?: string | "";
  changeGird: boolean;
  listProduct: Product[];
  brand?: string;
  price?: string;
  text?: string;
  typeSort?: number | "";
  typeProduct: string;
}

const ListProductFilter: React.FC<ListProductFilterProps> = ({
  type,
  brand,
  changeGird,
  listProduct,
  price,
  text,
  typeSort,
  typeProduct,
}) => {
  const [products, setProducts] = useState<Product[]>();
  console.log(listProduct);
  console.log(typeProduct);
  console.log(products);

  const getProductList = useCallback(
    async (brand?: string) => {
      try {
        const params = {
          typeProduct: typeProduct,
          brand: brand,
        };
        const res = await productService.getProductList(params);
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    [typeProduct]
  );

  useEffect(() => {
    getProductList(brand);
  }, [getProductList, brand, typeProduct]);

  return (
    <div>
      {changeGird === false ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 gap-y-2 ">
          {(products ? products : listProduct).map((item: Product) => (
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
        <div className="hidden lg:grid grid-cols-1 gap-2 gap-y-2 ">
          {(products ? products : listProduct).map((item: Product) => (
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

export default ListProductFilter;
