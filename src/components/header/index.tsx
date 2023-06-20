import React, { useState } from "react";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import MenuButtonMobile from "./MenuButtonMobile";
import { listProductType, menuHeader } from "../../constants";

const Header = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);
  const [openMenuMobileV, setOpenMenuMobileV] = useState<boolean>(false);
  let timer: number;

  const handleMouseEnter = () => {
    clearTimeout(timer);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setOpenMenu(false);
    }, 2000);
  };

  return (
    <div>
      <div className=" py-2 border-b">
        <div className="text-gray-600 flex-col lg:flex-between lg:flex-row width-80">
          <p className="text-sm text-center">
            Chào mừng bạn đến với gearshop.vn
          </p>
          <div className="flex gap-4 items-center justify-center py-2 lg:py-0">
            <span className="text-sm">Tuyển dụng</span>
            <Link
              target="_blank"
              to="https://www.facebook.com/profile.php?id=100033127445154"
            >
              <BsFacebook className="h-6 w-6" />
            </Link>
            <Link target="_blank" to="https://github.com/PhongThanh0907">
              <BsGithub className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:flex-between lg:flex-row  lg:w-[70%] mx-auto py-2 lg:py-4 relative">
        <div className="grid grid-cols-2 items-center py-4 lg:py-0 lg:grid-cols-1 relative">
          <Link className="ml-10 lg:ml-0" to="/">
            <h1 className="text-2xl font-bold italic">GEARXSHOP</h1>
          </Link>
          <div className="flex justify-end lg:hidden mr-10">
            <MenuButtonMobile
              onClick={() => setOpenMenuMobile(!openMenuMobile)}
              open={openMenuMobile}
            />
          </div>
          {openMenuMobile ? (
            <div
              className={`${
                openMenuMobileV ? "h-80" : "h-40"
              } w-56 mt-5 px-8 gap-4 opacity-100 duration-300 lg:hidden`}
            >
              {menuHeader.map((item, index) => (
                <React.Fragment key={index}>
                  {index === 1 ? (
                    <React.Fragment>
                      <div
                        onClick={(e) => {
                          setOpenMenuMobileV(!openMenuMobileV);
                          e.stopPropagation();
                        }}
                        className="duration-200 font-semibold flex cursor-pointer mb-2"
                      >
                        {item.title}
                        {index === 1 && (
                          <RiArrowDownSLine className="mt-1.5 ml-1 text-gray-400" />
                        )}
                      </div>
                      {openMenuMobileV ? (
                        <div className="flex flex-col gap-3 h-40 mb-4 border-t-2 border-t-sky-500  border opacity-100 duration-300 w-80 py-3">
                          {listProductType.map((item, index) => (
                            <Link
                              className="px-8"
                              key={index}
                              onClick={() => {
                                setOpenMenuMobileV(false)
                                setOpenMenuMobile(false)
                              } }
                              to={item.link}
                              state={{
                                name: item.stateName,
                                typeProduct: item.stateValue,
                                brand: undefined
                              }}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="h-0 w-80 opacity-0 duration-300"></div>
                      )}
                    </React.Fragment>
                  ) : (
                    <div className="mb-2">
                      <Link
                        className="hover:opacity-80 active:opacity-90 duration-200 font-semibold"
                        to={item.link}
                        key={index}
                      >
                        {item.title}
                      </Link>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="h-0 opacity-0 duration-300 w-56 mt-5 px-8 lg:hidden"></div>
          )}
        </div>
        <div className="gap-5 mt-1.5 hidden lg:flex">
          {menuHeader.map((item, index) => (
            <React.Fragment key={index}>
              {index === 1 ? (
                <div
                  onClick={() => setOpenMenu(!openMenu)}
                  className={`hover:opacity-80 active:opacity-90 duration-200 font-semibold flex cursor-pointer relative ${
                    openMenu ? "active-menu" : ""
                  } `}
                >
                  {item.title}
                  {index === 1 && (
                    <RiArrowDownSLine className="mt-1.5 ml-1 text-gray-400" />
                  )}
                </div>
              ) : (
                <Link
                  className="hover:opacity-80 active:opacity-90 duration-200 font-semibold"
                  to={item.link}
                  key={index}
                >
                  {item.title}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex gap-3 items-center justify-center">
          <img
            className="h-12 w-12"
            src="https://e-commerce-dinhtri123.vercel.app/tech-support.gif"
            alt="support"
          />
          <div className="text-sm text-gray-500">
            <p>0.999.999.999</p>
            <p>example@gmail.com</p>
          </div>
        </div>
        {openMenu ? (
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="box-shadow hidden absolute z-10 h-20 w-[700px] bg-white top-[70px] left-1/4 lg:flex justify-between px-10 border-t-2 border-t-sky-500 items-center border opacity-100 duration-300"
          >
            {listProductType.map((item, index) => (
              <Link
                onClick={() => setOpenMenu(false)}
                className="mb-2 w-32 hover:bg-gray-100 duration-200 py-2 px-4"
                key={index}
                to={item.link}
                state={{ name: item.stateName, typeProduct: item.stateValue, brand: undefined }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        ) : (
          <div className="absolute lg:flex h-0 w-[700px] top-[60px] left-1/4 hidden justify-between px-10 border-t-2 border-t-sky-500 items-center border opacity-0 duration-300"></div>
        )}
      </div>
    </div>
  );
};

export default Header;
