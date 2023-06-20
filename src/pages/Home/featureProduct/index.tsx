import React from "react";

import TitleComponent from "../../../components/title";
import { Product } from "../../../types/product.type";
import ItemProductLeftSide from "../../../components/itemProductLeftSide";

interface FeaturedProductsProps {
  list: Product[];
}

const FeaturedProductMemo: React.FC<FeaturedProductsProps> = ({ list }) => {
  return (
    <div>
      <TitleComponent title="Sản phẩm nổi bật" />
      <div className="flex flex-col gap-y-6 py-8">
        {list.map((item: Product) => (
          <ItemProductLeftSide
            key={item._id}
            id={item._id}
            productName={item.productName}
            imageProduct={item.imageProduct}
            price={item.price}
            oldPrice={item.oldPrice}
          />
        ))}
      </div>
    </div>
  );
};

const FeaturedProducts = React.memo(FeaturedProductMemo);

export default FeaturedProducts;
