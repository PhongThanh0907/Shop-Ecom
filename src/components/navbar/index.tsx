import { FormEvent, useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsXCircle } from "react-icons/bs";
import {
  HiOutlineChevronDown,
  HiOutlineShoppingBag,
  HiOutlineChevronRight,
} from "react-icons/hi";
import {
  AiOutlineBars,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { listMenuNavbar } from "../../constants";
import { User } from "../../types/user.type";
import Cart from "../cart";
import { RootState } from "../../app/store";
import { OpenModalCart } from "../../app/features/cart/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [openMenuList, setOpenMenuList] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [userInfo, setUserInfo] = useState<User>();
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  let timer: number;
  const persitUser = localStorage.getItem("persist:user");

  const handleMouseEnter = () => {
    clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setOpenMenuList(false);
    }, 2000);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/products", { state: { searchText: text } });
  };

  const handleCart = useCallback(() => {
    if (!userInfo) {
      navigate("/user");
    } else {
      dispatch(OpenModalCart(true));
    }
  }, [navigate, userInfo, dispatch]);

  useEffect(() => {
    if (persitUser) {
      const persistedState = JSON.parse(persitUser);
      setUserInfo(JSON.parse(persistedState.userInfo));
    }
  }, [persitUser]);

  return (
    <div className="bg-blue">
      <div className="w-[80%] mx-auto flex-between lg:py-2 py-5 relative">
        <div className="gap-2 text-stone-100 font-bold text-lg relative hidden lg:inline">
          <div
            onClick={() => setOpenMenuList(!openMenuList)}
            className="cursor-pointer flex-center gap-2 px-6"
          >
            <AiOutlineBars className="h-6 w-6" />
            <span>Danh mục sản phẩm</span>
            <HiOutlineChevronDown />
          </div>
          {openMenuList ? (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute bg-white top-[41px] left-0 right-0 border-2 border-blue rounded-b-md h-[340px] py-2 opacity-100 duration-300 z-10"
            >
              {listMenuNavbar.map((item, index) => (
                <Link
                  to={item.link}
                  state={{
                    name: item.stateName,
                    typeProduct: item.stateValue,
                    brand: undefined,
                  }}
                  onClick={() => setOpenMenuList(false)}
                  className={`text-black text-[16px] flex-between mx-3 px-2 py-2  ${
                    index > 3 &&
                    "font-normal hover:cursor-pointer hover:bg-gray-100 duration-200 group"
                  } ${index === 0 || index === 6 ? "" : "border-t border-b"} ${
                    index === 0 &&
                    "hover:cursor-pointer hover:bg-gray-100 duration-200"
                  }`}
                  key={index}
                >
                  {item.title}
                  {index > 3 && (
                    <HiOutlineChevronRight className="text-gray-400" />
                  )}
                  <div className="opacity-0 w-0 overflow-hidden absolute left-[100%] group-hover:w-[700px] group-hover:opacity-100 -top-[1px] bottom-0 duration-300 bg-white border-2 border-blue rounded-b-md grid grid-cols-4 uppercase p-10">
                    {item.listBrand?.map((e, index) => (
                      <Link
                        to={item.link}
                        state={{
                          name: item.stateName,
                          typeProduct: item.stateValue,
                          brand: e,
                        }}
                        key={index}
                        className="hover-70 hover:bg-gray-200 px-4 py-2 h-fit"
                      >
                        {e}
                      </Link>
                    ))}
                  </div>
                </Link>
              ))}
              <BsXCircle
                onClick={() => setOpenMenuList(false)}
                className="h-5 w-5 text-gray-500 absolute top-2 right-2 hover-70"
              />
            </div>
          ) : (
            <div className="absolute bg-white top-[41px] left-0 right-0 border border-blue rounded-b-md h-0 overflow-hidden py-2 opacity-0 duration-300">
              {listMenuNavbar.map((item, index) => (
                <div
                  className={`text-black text-[16px] flex-between mx-3 px-2 py-2  ${
                    index > 3 &&
                    "font-normal hover:cursor-pointer hover:bg-gray-100 duration-200"
                  } ${index === 0 || index === 6 ? "" : "border-t border-b"}`}
                  key={index}
                >
                  {item.title}
                  {index > 3 && (
                    <HiOutlineChevronRight className="text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <form onSubmit={onSubmit} className="flex items-center">
          <input
            className="focus:outline-none px-8 rounded-l-full py-2 text-gray-500 w-[250px] lg:w-[500px]"
            placeholder="Nội dung tìm kiếm"
            type="text"
            onChange={(e) => setText(e.target.value)}
          />
          <Link
            to={`products`}
            state={{ searchText: text }}
            className="text-stone-100 bg-black/70 px-5 py-2 rounded-r-full cursor-pointer hover:bg-black duration-200 active:bg-black/70"
          >
            <AiOutlineSearch className="h-6 w-6" />
          </Link>
        </form>

        <div className="text-stone-100 font-bold gap-4 hidden lg:flex lg:items-center">
          <AiOutlineHeart className="h-7 w-7 hover-70" />
          {userInfo ? (
            <div className="max-w-[120px] truncate">
              Chào, {userInfo.userName}
            </div>
          ) : (
            <Link to="/user">
              {" "}
              <AiOutlineUser className="h-7 w-7 hover-70" />
            </Link>
          )}

          <div
            onClick={handleCart}
            className="flex items-center gap-1 hover-70"
          >
            <div className="relative">
              <HiOutlineShoppingBag className="h-7 w-7" />
              <div className="absolute -bottom-1 right-0 bg-black text-sm rounded-full px-1">
                {cart.length}
              </div>
            </div>
            <span>Giỏ hàng</span>
          </div>
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default Navbar;
