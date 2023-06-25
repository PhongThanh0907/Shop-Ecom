import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { AppDispatch } from "../../app/store";
import { AddCart } from "../../app/features/cart/cartSlice";
import { Product } from "../../types/product.type";
import { User } from "../../types/user.type";

interface ItemProductRightSideProps {
  item: Product;
}

const ItemProductRightSide: React.FC<ItemProductRightSideProps> = ({
  item,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const persitUser = localStorage.getItem("persist:user");
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    if (persitUser) {
      const persistedState = JSON.parse(persitUser);
      setUserInfo(JSON.parse(persistedState.userInfo));
    }
  }, [persitUser]);

  const handleOrder = () => {
    if (userInfo === null) {
      navigate("/user");
    } else {
      dispatch(AddCart(item));
      toast.success("Thêm vào giỏ hàng thành công");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className="loading h-[450px] py-5  w-full lg:w-[224px] "></div>
      ) : (
        <div className="group h-[450px] border border-white py-5 hover:border hover:border-gray-200 hover:rounded-md hover:shadow-lg duration-200 cursor-pointer">
          <h1 className="text-gray-400 text-sm uppercase px-4 text-center lg:text-start">
            {item.brand}
          </h1>
          <div className="border-l group-hover:border-transparent border-gray-100 px-4 relative h-[380px] text-center lg:text-start">
            <Link
              to={`/product/${item._id}`}
              onClick={scrollToTop}
              className="text-blue-600 font-semibold text-md h-24 overflow-hidden flex hover-70"
            >
              {item.productName}
            </Link>

            <img
              className="w-[100%] lg:h-[200px] h-[250px] object-cover"
              src={item.imageProduct[0]}
              alt=""
            />
            <div className="absolute lg:bottom-0 -bottom-8 flex justify-between items-center py-2 pt-6 lg:right-4 lg:left-4 right-10 left-10">
              <div>
                <p className="text-gray-400 text-sm line-through">
                  {item.oldPrice !== 0 && (
                    <>{item.oldPrice?.toLocaleString("vi-VN")}</>
                  )}
                </p>
                <p className="text-red-500 text-xl font-semibold">
                  {item.price.toLocaleString("vi-Vn")}đ
                </p>
              </div>

              <div
                onClick={() => {
                  handleOrder();
                }}
                className="p-2 opacity-40 bg-blue rounded-full cursor-pointer mr-2 group-hover:opacity-100 duration-300 group-hover:bg-backgroundColor text-white"
              >
                <MdAddShoppingCart className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ItemProductRightSide;
