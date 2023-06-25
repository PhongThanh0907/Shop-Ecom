import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { Product } from "../../types/product.type";
import productService from "../../services/product.service";
import Steps from "../../components/steps";
import { AddCart, OpenModalCart } from "../../app/features/cart/cartSlice";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(false);
  const [changeImage, setChangeImage] = useState<string>("");
  const [indexImage, setIndexImage] = useState<number>(0);
  const dispatch = useDispatch();

  const getProduct = useCallback(async () => {
    try {
      if (params.id) {
        const res = await productService.getProductDetail(params.id);
        setProduct(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  const handleAddCart = useCallback(() => {
    setLoading(true);
    dispatch(OpenModalCart(true));
    dispatch(AddCart(product));
  }, [dispatch, product]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div className="mt-6 lg:mt-0">
      <Steps
        activeStep={2}
        state={product?.brand}
        nameProduct={product?.productName}
      />
      <div className="grid grid-cols-1 lg:grid-cols-8 lg:gap-8 max-w-7xl px-5 gap-y-4 lg:gap-y-0 lg:px-10 mx-auto my-10">
        <div className="col-span-3">
          {changeImage === "" ? (
            <>
              {product?.imageProduct?.slice(0, 1)?.map((item, index) => (
                <img key={index} src={item} alt="" />
              ))}
            </>
          ) : (
            <>
              <img src={changeImage} alt="" />
            </>
          )}
          <div className="flex gap-4 mt-10">
            {product?.imageProduct?.map((item, index) => (
              <div
                className={`border w-28 ${
                  index === indexImage
                    ? "border-b-2 border-b-blue shadow-lg"
                    : ""
                } py-3 cursor-pointer duration-300`}
                key={index}
              >
                <img
                  onClick={() => {
                    setIndexImage(index);
                    setChangeImage(item);
                  }}
                  src={item}
                  alt="img"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3">
          <h1 className="text-sm text-gray-400 uppercase">{product?.brand}</h1>
          <h1 className="text-2xl font-semibold py-4">
            {product?.productName}
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem beatae itaque voluptatum fuga debitis officiis
            dolores iste recusandae consequatur? Unde ea similique est eligendi
            recusandae consectetur saepe officia! Ipsum delectus perferendis
            neque quia, dicta cupiditate, officiis tenetur itaque libero porro
            minima suscipit amet, recusandae eos cumque. Voluptas quas quisquam
            cum.
          </p>
        </div>

        <div className="lg:col-span-2 relative">
          <div className="flex flex-col justify-center border-2 p-6 border-gray-300 rounded-2xl">
            <h1 className="text-md text-gray-400 border-b border-gray-200 pb-2">
              Trạng thái:{" "}
              <span className="text-green-600 font-semibold">Còn hàng</span>
            </h1>
            <h1 className="text-md text-gray-700 font-semibold my-1 pt-2">
              Mã sản phẩm: {product?.productCode}
            </h1>
            <p className="text-md text-gray-500">Bảo hành: 36 tháng</p>
            <div className="flex gap-1 my-1 mb-2">
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-yellow-400 h-3 w-3" color="" />
              <FaStar className="text-gray-300 h-3 w-3" color="" />
            </div>
            {product?.oldPrice !== 0 ? (
              <p className="text-sm line-through text-gray-400 pt-3">
                {product?.oldPrice?.toLocaleString("vi-VN")}đ
              </p>
            ) : (
              <></>
            )}
            <p className="text-2xl text-red-500 font-semibold pb-3">
              {product?.price?.toLocaleString("vi-VN")}đ
            </p>

            <button
              onClick={handleAddCart}
              disabled={loading}
              className="relative h-11 bg-gray-800 rounded-xl hover-70"
            >
              {loading ? (
                <div className="lds-ring absolute top-2 left-0 right-0 flex justify-center">
                  <div className="w-7 h-7" />
                  <div className="w-7 h-7" />
                  <div className="w-7 h-7" />
                  <div className="w-7 h-7" />
                </div>
              ) : (
                <div className="flex justify-center gap-2 text-white">
                  {" "}
                  <MdAddShoppingCart className="w-6 h-6" /> Mua ngay
                </div>
              )}
            </button>
          </div>
          <p className="font-semibold pt-4">
            Address:{" "}
            <span className="font-normal text-gray-500">
              123 đường ABC, Quận D, Hồ Chí Minh
            </span>
          </p>
          <p className="font-semibold py-4">
            Giờ mở cửa:{" "}
            <span className="font-normal text-gray-500">
              Cửa hàng mở cửa từ 9h30 đến 20h30
            </span>{" "}
          </p>
          <p className="font-semibold">
            Hotline:{" "}
            <span className="text-blue-500">0938458350 - 0979399509</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
