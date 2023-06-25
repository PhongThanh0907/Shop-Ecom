import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Steps from "../../components/steps";
import LoadingButton from "../../components/loading/LoadingButton";
import { RootState } from "../../app/store";
import { Cart } from "../../types/cart.type";
import ItemPayment from "./ItemPayment";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <Steps activeStep={2} />
      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingButton />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto lg:px-10 py-4 lg:py-10">
          <div className="grid grid-cols-12 border-b border-gray-200 text-center text-gray-500 pb-4">
            <h4 className="col-span-6">Tên sản phẩm</h4>
            <h4 className="col-span-2 hidden lg:inline">Giá</h4>
            <h4 className="col-span-3 lg:col-span-2">Số lượng</h4>
            <h4 className="col-span-3 lg:col-span-2">Giá</h4>
          </div>
          <div className="w-full">
            {cart.map((item: Cart) => (
              <ItemPayment key={item._id} cartItem={item} />
            ))}
          </div>
          <div>
            <div className="flex justify-end mr-4 lg:mr-16 border-b border-gray-200 py-4 text-lg">
              <span>
                Tổng tiền:{" "}
                {cart.length < 1
                  ? 0
                  : cart
                      .map((i: Cart) => i.totalCount)
                      .reduce((total: any, cv: any) => total + cv)
                      .toLocaleString("vn-Vn")}
                đ
              </span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/products/payment")}
              className="px-8 py-2 bg-blue text-white font-bold rounded-3xl mt-6 lg:mt-10 mr-8 hover:bg-[#05bedb] active:bg-[#017e92] duration-300"
            >
              Thanh toán ngay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
