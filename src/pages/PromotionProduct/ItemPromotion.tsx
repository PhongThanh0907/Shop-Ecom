import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdAddShoppingCart } from "react-icons/md";

import { Product } from "../../types/product.type";
import { useDispatch } from "react-redux";
import { AddCart } from "../../app/features/cart/cartSlice";
import { User } from "../../types/user.type";

interface ItemPromotionProps {
  item: Product;
}

const ItemPromotion: React.FC<ItemPromotionProps> = ({ item }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const persitUser = localStorage.getItem("persist:user");
  const [userInfo, setUserInfo] = useState<User>();

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
    <>
      {loading ? (
        <div className="loading h-[459px] w-full lg:w-[224px] "></div>
      ) : (
        <div className="p-6 border-r border-gray-200 group hover:shadow-lg rounded-md">
          <h1 className="text-gray-400 text-sm">Lenovo</h1>
          <Link
            to={`/product/${item._id}`}
            className="text-blue-600 font-semibold text-md h-28 flex"
          >
            {item.productName}
          </Link>
          <img className="w-[100%]" src={item.imageProduct[0]} alt="" />
          <div className="flex justify-between items-center py-2 pt-6">
            <p className="text-red-500 text-xl font-semibold">
              {item.price.toLocaleString("vi-Vn")}đ
            </p>

            <p className="text-gray-400 text-sm mt-2 line-through mx-2">
              {item.oldPrice !== 0 && (
                <>{item.oldPrice?.toLocaleString("vi-VN")}</>
              )}
            </p>
            <div
              onClick={() => {
                handleOrder();
              }}
              className="p-2 opacity-40 bg-gray-300 rounded-full cursor-pointer mr-2 group-hover:opacity-100 duration-300 group-hover:bg-blue text-white"
            >
              <MdAddShoppingCart className="h-5 w-5" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemPromotion;
