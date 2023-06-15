import { BiPaperPlane } from "react-icons/bi";

const Contact = () => {
  return (
    <div className="text-white bg-blue font-semibold py-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 max-w-7xl px-4 lg:px-10 mx-auto items-center">
        <div className="flex mb-4 lg:mb-0 gap-3 text-lg col-span-3">
          <BiPaperPlane className="h-6 w-6" />
          <h1 className="text-sm lg:text-lg">
            GearXShop - Thế Giới Mua Bán Đồ Chơi Công Nghệ, Phụ Kiện Chơi Game
          </h1>
        </div>
        <div className="lg:col-span-2 flex items-center">
          <input
            placeholder="Nhập email của bạn"
            className="lg:w-[75%] border rounded-l-3xl py-[10px] px-8 text-gray-400 focus:outline-none"
            type="text"
            name=""
            id=""
          />
          <h4 className="w-[25%] flex-1 text-center bg-black py-[10px] rounded-r-3xl opacity-70 hover:opacity-80 active:opacity-100 duration-300">
            Đăng ký
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Contact;
