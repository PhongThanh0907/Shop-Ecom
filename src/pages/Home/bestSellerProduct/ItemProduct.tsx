import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { User } from "../../../types/user.type";
import { AddCart } from "../../../app/features/cart/cartSlice";
import { Product } from "../../../types/product.type";

interface ItemProductProps {
  item: Product;
}

const ItemProduct: React.FC<ItemProductProps> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const persitUser = localStorage.getItem("persist:user");
  const [userInfo, setUserInfo] = useState<User>();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrder = () => {
    if (userInfo === null) {
      navigate("/user");
    } else {
      dispatch(AddCart(item));
      toast.success("Thêm vào giỏ hàng thành công");
    }
  };

  useEffect(() => {
    if (persitUser) {
      const persistedState = JSON.parse(persitUser);
      setUserInfo(JSON.parse(persistedState.userInfo));
    }
  }, [persitUser]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="loading h-[240px] px-4"></div>
      ) : (
        <div className="group h-[540px] lg:h-[240px] px-4 relative border border-white py-5 hover:border hover:border-gray-200 hover:rounded-md hover:shadow-lg duration-200 cursor-pointer flex flex-col lg:flex-row gap-4">
          <img
            className="object-cover"
            src={item.imageProduct[0]}
            alt="image"
          />
          <Link onClick={scrollToTop} to={`product/${item._id}`}>
            <p className="text-sm text-gray-500 uppercase">{item.brand}</p>
            <h1 className="h-24 overflow-hidden text-blue hover-70">
              {item.productName}
            </h1>
            <div className="absolute bottom-8">
              <p className="text-gray-400 text-sm line-through">
                {item.oldPrice !== 0 && (
                  <>{item.oldPrice?.toLocaleString("vi-VN")}đ</>
                )}
              </p>
              <p className="text-red-500 text-xl font-semibold">
                {item.price.toLocaleString("vi-Vn")}đ
              </p>
            </div>
          </Link>
          <div
            onClick={() => {
              handleOrder();
            }}
            className="p-2 absolute right-4 bottom-8 opacity-40 bg-blue rounded-full cursor-pointer mr-2 group-hover:opacity-100 duration-300 group-hover:bg-backgroundColor text-white"
          >
            <MdAddShoppingCart className="h-5 w-5" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemProduct;
