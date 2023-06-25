import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Cart } from "../../types/cart.type";
import { AppDispatch } from "../../app/store";
import { UpdateNumberCount } from "../../app/features/cart/cartSlice";

const CustomInput = ({
  quantity,
  item,
}: {
  quantity: (count: number) => void;
  item: Cart;
}) => {
  const [numberCount, setNumberCount] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (numberCount) {
      quantity(numberCount);
    } else {
      quantity(1);
    }
  }, [numberCount, item.numberCount, quantity]);

  useEffect(() => {
    dispatch(UpdateNumberCount({ ...item, numberCount }));
  }, [numberCount, dispatch, item]);

  useEffect(() => {
    setNumberCount(item.numberCount);
  }, [item.numberCount]);

  return (
    <div className="flex justify-between border border-gray-200 rounded-3xl px-1 pl-2 lg:pl-4 h-[35px] py-1 w-[90%] lg:w-[60%]">
      <div>
        <p className="text-sm lg:text-md">{item.numberCount}</p>
      </div>
      <div className="flex gap-1">
        <div
          onClick={() => {
            setNumberCount(numberCount + 1);
          }}
          className="bg-gray-100 rounded-full p-1 lg:p-[4px] lg:px-[6px] flex justify-center items-center cursor-pointer"
        >
          <AiOutlinePlus className="h-3 w-3" />
        </div>
        <div
          onClick={() => {
            if (numberCount && numberCount > 1) {
              setNumberCount(numberCount - 1);
            }
          }}
          className={`${
            numberCount === 1 ? "bg-gray-300" : "bg-gray-100 cursor-pointer"
          }  rounded-full p-1 lg:p-[4px] lg:px-[7px] flex justify-center items-center duration-300`}
        >
          <AiOutlineMinus className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
};

export default CustomInput;
