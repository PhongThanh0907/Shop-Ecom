import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import userService from "../../services/user.service";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      return toast.error("Nhập lại mật khẩu không đúng");
    }
    try {
      const res = await userService.resetPassword({
        password: password,
        token: id,
      });
      toast.success(`${res.data.message}`);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
    }
    setIsLoading(false);
  }, [password, confirmPassword, id, navigate]);

  return (
    <div className="py-16">
      <div className="w-[40%] mx-auto">
        <div className="bg-blue rounded p-6">
          <form onSubmit={handleSubmit}>
            <p className="text-2xl text-stone-100 text-center mb-6">
              Tạo mật khẩu mới
            </p>
            <div className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="password"
                  className=" py-1.5 px-5 border border-mainColor rounded w-full focus:outline-none"
                  placeholder="Nhập mật khẩu mới (*)"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  className=" py-1.5 px-5 border border-mainColor rounded w-full focus:outline-none"
                  placeholder="Nhập lại mật khẩu (*)"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className="bg-gray-800 h-11 text-stone-100 rounded hover-70 relative"
                disabled={isLoading}
              >
                {" "}
                {isLoading ? (
                  <div className="lds-ring absolute top-2 left-0 right-0 flex justify-center">
                    <div className="w-7 h-7" />
                    <div className="w-7 h-7" />
                    <div className="w-7 h-7" />
                    <div className="w-7 h-7" />
                  </div>
                ) : (
                  "Xác nhận"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
