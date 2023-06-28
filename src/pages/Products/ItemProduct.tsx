import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { User } from "../../types/user.type";
import { useDispatch } from "react-redux";
import { AddCart } from "../../app/features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { Product } from "../../types/product.type";

interface ItemProductProps {
  item: Product;
}

const ItemProduct: React.FC<ItemProductProps> = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
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
        <div className="loading h-[250px] w-full lg:w-full py-4"></div>
      ) : (
        <div className="grid grid-cols-12 gap-6 py-4 shadow-lg">
          <div className="col-span-3">
            <img src={item.imageProduct[0]} alt="" />
          </div>
          <div className="col-span-6 flex flex-col justify-center">
            <h1 className="text-sm text-gray-400 mb-1">{item.brand}</h1>

            <Link
              to={`/product/${item._id}`}
              className="text-blue-600 font-semibold text-md h-20 flex overflow-hidden"
            >
              {item.productName}
            </Link>
            <div className="flex gap-1 my-1 mb-2">
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-gray-400 h-3 w-3" color="" />
            </div>
            <p className="text-gray-400 font-semibold text-sm">
              {" "}
              - Mã sản phẩm: {item.code}
            </p>
            <p className="text-sm text-gray-500"> - Bảo hành: 36 tháng</p>
          </div>
          <div className="col-span-3 flex flex-col justify-center px-4">
            <p className="border-b border-gray-200 pb-3 text-gray-600 text-center">
              Trạng thái: <span className="text-green-500">Còn hàng</span>
            </p>
            <h4 className="text-red-500 text-xl my-4 text-center">
              {item.price.toLocaleString("vi-VN")}đ
            </h4>
            <button
              onClick={handleOrder}
              className="flex items-center gap-4 w-full justify-center bg-gray-200 py-2 rounded-3xl text-white font-bold hover:bg-blue duration-300 active:bg-[#01bedb]"
            >
              Mua ngay <MdAddShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemProduct;
