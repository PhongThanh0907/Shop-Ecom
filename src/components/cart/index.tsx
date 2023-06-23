import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";

import { AppDispatch } from "../../app/store";

interface CartProps {
  open: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ open, onClose }) => {
  const [cart, setCart] = useState<any>();
  const navigate = useNavigate();
  const persitCart = localStorage.getItem("persist:cart");

  useEffect(() => {
    if (persitCart) {
      const persistedState = JSON.parse(persitCart);
      setCart(persistedState);
    }
  }, [persitCart]);

  console.log(cart?.openModal);

  return (
    <React.Fragment>
      {open ? (
        <div className="absolute top-[55px] w-96 -right-28 bg-white border-2 border-blue h-96 opacity-100 duration-300 z-20 shadow-lg">
          <HiXMark
            onClick={() => onClose()}
            className="absolute right-4 top-4 text-red-500 border-2 border-red-500 rounded-full text-xl cursor-pointer hover-70"
          />
        </div>
      ) : (
        <div className="absolute top-[55px] w-96 -right-28 bg-white border-2 border-blue h-0  opacity-0 duration-300 z-20 shadow-lg"></div>
      )}
    </React.Fragment>
  );
};

export default Cart;
