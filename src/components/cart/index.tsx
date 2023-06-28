import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";

import { Cart as CartType } from "../../types/cart.type";
import { RootState } from "../../app/store";
import LoadingButton from "../loading/LoadingButton";
import { OpenModalCart } from "../../app/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, openModal } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setLoading(true);
  }, [cart]);

  let timer: number;

  const handleMouseEnter = () => {
    clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      dispatch(OpenModalCart(false));
    }, 5000);
  };

  return (
    <React.Fragment>
      {openModal ? (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`fixed top-16 lg:absolute lg:top-[55px] lg:w-96 py-6 left-0 lg:left-[72%] right-0 lg:-right-28 bg-white border-2 border-blue opacity-100 overflow-hidden duration-300 z-20 shadow-lg`}
          style={{ height: `${cart.length * 100 + 135}px` }}
        >
          <HiXMark
            onClick={() => dispatch(OpenModalCart(false))}
            className="absolute right-4 top-4 text-red-500 border-2 border-red-500 rounded-full text-xl cursor-pointer hover-70"
          />
          {cart.length === 0 ? (
            <p className="text-black mt-8 px-8">
              Chưa có sản phẩm nào trong giỏ hàng
            </p>
          ) : (
            <div>
              {cart.map((item: CartType) => (
                <React.Fragment key={item._id}>
                  {loading ? (
                    <div className="flex justify-center py-5">
                      <LoadingButton />
                    </div>
                  ) : (
                    <div key={item._id} className="px-6">
                      <div className="grid grid-cols-12 items-center gap-8">
                        <div className="col-span-4">
                          <img src={item.imageProduct[0]} />
                        </div>
                        <div className="col-span-8">
                          <h1 className="text-blue h-[48px] overflow-hidden">
                            {item.productName}
                          </h1>
                          <p>1 x {item.price.toLocaleString("vn-VN")}đ</p>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
              <div className="border-t pt-5 px-4">
                Tổng tiền:{" "}
                <span className="text-red-500 font-bold ml-4">
                  {cart.length < 1
                    ? 0
                    : cart
                        .map((i: CartType) => i.totalCount)
                        .reduce((total: any, cv: any) => total + cv)
                        .toLocaleString("vn-Vn")}
                  đ
                </span>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    navigate("/payment");
                    dispatch(OpenModalCart(false));
                  }}
                  className="bg-blue px-6 py-2 hover-70 text-stone-100 rounded-md mt-4"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="fixed lg:h-0 top-16 lg:absolute lg:top-[55px] lg:w-96 py-6 opacity-0 left-0 lg:left-[72%] right-0 lg:-right-28 bg-white border-2 border-blue  duration-300 z-20 shadow-lg overflow-hidden"></div>
      )}
    </React.Fragment>
  );
};

export default Cart;
