import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";

interface IFormInputs {
  userName: string;
  confirmPassword: string;
  email: string;
  password: string;
  emailLogin: string;
  passwordLogin: string;
}

const UserPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = useCallback(async (data) => {
    if (data.password !== data.confirmPassword) {
        return toast.error("Nhập lại mật khẩu không đúng");
      }
  }, []);

  useEffect(() => {
    setShowPassword(false)
    reset()
  }, [status,reset])

  return (
    <div className="py-16">
      <div className="w-[40%] mx-auto">
        <form className="bg-blue rounded p-6" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-2xl text-stone-100 text-center mb-6">
            {status ? "Đăng ký" : "Đăng nhập"}
          </p>
          <div className="flex flex-col gap-6">
            {status && (
              <div className="relative">
                <input
                  className="py-1.5 px-5 border border-blue rounded w-full focus:outline-none"
                  placeholder="Họ tên (*)"
                  {...register("userName", { required: true })}
                  aria-invalid={errors.userName ? "true" : "false"}
                />
                {errors.userName?.type === "required" && (
                  <p className="text-red-500 pl-3 absolute text-xs">
                    (*) Vui lòng nhập họ tên của bạn
                  </p>
                )}
              </div>
            )}

            <div className="relative">
              <input
                className="py-1.5 px-5 border border-mainColor rounded w-full focus:outline-none"
                placeholder="Email (*)"
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 pl-3 absolute text-xs">
                  (*) Vui lòng nhập email
                </p>
              )}
             
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className=" py-1.5 px-5 border border-mainColor rounded w-full focus:outline-none"
                placeholder="Mật khẩu (*)"
                {...register("password", { required: true })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 pl-3 absolute text-xs">
                  (*) Vui lòng nhập mật khẩu
                </p>
              )}
               {!status && (
                <div onClick={() => setShowPassword(!showPassword)} className="absolute top-0 bottom-0 flex items-center right-4 cursor-pointer">
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </div>
              )}
            </div>

            {status && (
              <div className="relative">
                <input
                  type="password"
                  className=" py-1.5 px-5 border border-mainColor rounded w-full focus:outline-none"
                  placeholder="Nhập lại mật khẩu (*)"
                  {...register("confirmPassword", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500 pl-3 absolute text-xs">
                    (*) Vui lòng nhập lại mật khẩu
                  </p>
                )}
              </div>
            )}

            <button className="bg-gray-800 py-2 text-stone-100 rounded hover-70">
              {status ? "Đăng ký" : "Đăng nhâp"}
            </button>
            <p className="text-sm text-end text-gray-500">
              {`${!status ? "Bạn chưa có tài khoản" : "Bạn đã có tài khoản"}`}{" "}
              <span
                onClick={() => setStatus(!status)}
                className="underline cursor-pointer"
              >{`${!status ? "Đăng ký" : "Đăng nhập"}`}</span>{" "}
              ngay
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
