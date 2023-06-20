import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineChevronRight } from "react-icons/hi";

interface StepsProps {
  activeStep: number;
  state?: string;
  nameProduct?: string;
}

const Steps: React.FC<StepsProps> = ({ activeStep, state, nameProduct }) => {
  const navigate = useNavigate();
  return (
    <div className="flex mb-4 lg:mb-5 flex-wrap lg:w-[80%] mx-auto px-6 text-gray-400">
      {state || nameProduct ? (
        <>
          {[
            "Trang chủ",
            `${state ? state : ""}`,
            `${nameProduct ? nameProduct : ""}`,
          ].map((step, index) => (
            <div
              onClick={() => {
                index === 0 && navigate("/");
              }}
              key={index}
              className={`flex items-center text-sm font-semibold lg:pt-8 capitalize 
        text-center ${index <= activeStep ? "" : "hidden"} ${
                index === activeStep ? "text-black" : ""
              } ${index === 0 && "cursor-pointer"}`}
            >
              {step}
              <div
                className={` ${
                  index === activeStep ? "hidden" : ""
                } mx-2 text-gray-400`}
              >
                <HiOutlineChevronRight className="h-3 w-3 mt-1" />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {["Trang chủ", "Giỏ hàng", "Thanh toán", "Xác Nhận Đơn Hàng"].map(
            (step, index) => (
              <div
                onClick={() => {
                  index === 0 && navigate("/");
                }}
                key={index}
                className={`flex items-center text-sm font-semibold lg:pt-8 capitalize 
      text-center ${index <= activeStep ? "" : "hidden"} ${
                  index === activeStep ? "text-gray-500" : ""
                } ${index === 0 && "cursor-pointer"}`}
              >
                {step}
                <div
                  className={` ${
                    index === activeStep ? "hidden" : ""
                  } mx-2 text-gray-400`}
                >
                  <HiOutlineChevronRight className="h-3 w-3 mt-1" />
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Steps;
