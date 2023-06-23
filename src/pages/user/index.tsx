import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import userService from "../../services/user.service";
import { loginUser } from "../../app/features/user/userSlice";

interface IFormInputs {
  userName: string;
  confirmPassword: string;
  email: string;
  mobile: string;
  password: string;
  emailLogin: string;
  passwordLogin: string;
  findPasswordEmail: string;
}

const UserPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [findPassword, setFindPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  const onSubmit: SubmitHandler<IFormInputs> = useCallback(
    async (data) => {
      setIsLoading(true);
      if (status) {
        if (data.password !== data.confirmPassword) {
          return toast.error("Nhập lại mật khẩu không đúng");
        }
      }
      try {
        if (!findPassword) {
          if (status) {
            await userService.registerUser(data);
            toast.success("Đăng ký thành công!");
            setStatus(false);
          } else {
            const dataLogin = {
              email: data.emailLogin,
              password: data.passwordLogin,
            };
            const res = await userService.loginUser(dataLogin);
            toast.success("Đăng nhập thành công!");
            dispatch(
              loginUser({
                isLoggedIn: true,
                token: res.data.accessToken,
                userInfo: res.data.userData,
              })
            );
            navigate("/");
          }
        } else {
          const res = await userService.forgotPassword({
            email: data.findPasswordEmail,
          });
          toast.success(`${res.data.message}`);
          setStatus(false);
          setFindPassword(false);
          reset();
        }
      } catch (error: any) {
        console.log(error);
        toast.error(
          `${
            error.response.data.message
              ? error.response.data.message
              : "Đăng ký thất bại. Xin vui lòng thử lại"
          }`
        );
      }
      reset();
      setIsLoading(false);
    },
    [status, navigate, findPassword, reset]
  );

  useEffect(() => {
    setShowPassword(false);
    reset();
  }, [status, reset]);

  return (
    <div className=" pt-10 lg:pt-16">
      <div className="lg:w-[40%] w-[95%] mx-auto">
        <div className="bg-blue rounded p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-2xl text-stone-100 text-center mb-6">
              {findPassword
                ? "Tìm lại mật khẩu"
                : status
                ? "Đăng ký"
                : "Đăng nhập"}
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
                  {...register(
                    `${
                      findPassword
                        ? "findPasswordEmail"
                        : status
                        ? "email"
                        : "emailLogin"
                    }`,
                    {
                      required: true,
                    }
                  )}
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {findPassword ? (
                  <>
                    {" "}
                    {errors.findPasswordEmail?.type === "required" && (
                      <p className="text-red-500 pl-3 absolute text-xs">
                        (*) Vui lòng nhập email
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {" "}
                    {status ? (
                      <>
                        {" "}
                        {errors.email?.type === "required" && (
                          <p className="text-red-500 pl-3 absolute text-xs">
                            (*) Vui lòng nhập email
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        {errors.emailLogin?.type === "required" && (
                          <p className="text-red-500 pl-3 absolute text-xs">
                            (*) Vui lòng nhập email
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              {!findPassword && (
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className=" py-1.5 px-5 border border-mainColor rounded w-full focus:outline-none"
                    placeholder="Mật khẩu (*)"
                    {...register(`${status ? "password" : "passwordLogin"}`, {
                      required: true,
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {status ? (
                    <>
                      {" "}
                      {errors.password?.type === "required" && (
                        <p className="text-red-500 pl-3 absolute text-xs">
                          (*) Vui lòng nhập mật khẩu
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      {errors.passwordLogin?.type === "required" && (
                        <p className="text-red-500 pl-3 absolute text-xs">
                          (*) Vui lòng nhập mật khẩu
                        </p>
                      )}
                    </>
                  )}

                  {!status && (
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-0 bottom-0 flex items-center right-4 cursor-pointer"
                    >
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </div>
                  )}
                </div>
              )}

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

              {status && (
                <div className="relative">
                  <input
                    className=" py-1.5 px-5 border border-mainColor rounded w-full focus:outline-none"
                    placeholder="Số điện thoại (*)"
                    {...register("mobile", { required: true })}
                    aria-invalid={errors.mobile ? "true" : "false"}
                  />
                  {errors.mobile?.type === "required" && (
                    <p className="text-red-500 pl-3 absolute text-xs">
                      (*) Vui lòng nhập số điện thoại
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="bg-gray-800 h-11 text-stone-100 rounded hover-70 relative"
              >
                {findPassword ? (
                  <>
                    {" "}
                    {isLoading ? (
                      <div className="lds-ring absolute top-2 left-0 right-0 flex justify-center">
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                      </div>
                    ) : (
                      "Gửi"
                    )}
                  </>
                ) : status ? (
                  <>
                    {isLoading ? (
                      <div className="lds-ring absolute top-2 left-0 right-0 flex justify-center">
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                      </div>
                    ) : (
                      "Đăng ký"
                    )}
                  </>
                ) : (
                  <>
                    {isLoading ? (
                      <div className="lds-ring absolute top-2 left-0 right-0 flex justify-center">
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                        <div className="w-7 h-7" />
                      </div>
                    ) : (
                      "Đăng nhập"
                    )}
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="flex flex-col lg:flex-row justify-between">
            {!findPassword ? (
              <>
                <p className="text-sm text-end text-gray-500 mt-3">
                  {`${
                    !status ? "Bạn chưa có tài khoản" : "Bạn đã có tài khoản"
                  }`}
                  <button
                    disabled={isLoading}
                    onClick={() => setStatus(!status)}
                    className="underline cursor-pointer"
                  >{`${!status ? "Đăng ký" : "Đăng nhập"}`}</button>{" "}
                  ngay
                </p>
                {!status && (
                  <p className="text-sm text-end text-gray-500 mt-3">
                    Bạn quên mật khẩu?{" "}
                    <button
                      onClick={() => setFindPassword(true)}
                      className="underline cursor-pointer"
                    >
                      Tìm lại ngay
                    </button>
                  </p>
                )}
              </>
            ) : (
              <>
                <button
                  disabled={isLoading}
                  onClick={() => setFindPassword(false)}
                  className="text-sm text-end text-gray-500 mt-3 underline flex items-center gap-1"
                >
                  <HiChevronDoubleLeft className="mt-1" />
                  Quay lại
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
