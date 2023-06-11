import TitleComponent from "../../../components/title";

const News = () => {
  const data = [
    {
      title: "Gearshop Thay Áo - Bão Siêu Quà",
      img: "https://gearshop.vn/upload/images/Event/Grand-Re-Opening---Gearshop-thay-%C3%A1o-b%C3%A3o-si%C3%AAu-qu%C3%A0.png",
    },
    {
      title: "Mua Combo, Nhận Quà Nhân Đôi cùng Gearshop x AMD x NZXT",
      img: "https://gearshop.vn/upload/images/Event/Banner-AMD-x-Gearshop-x-NZXT.jpg",
    },
    {
      title: "Cửa hàng AMD Official Store chính hãng | AMD x Gearshop",
      img: "https://gearshop.vn/upload/images/Product/PC%20C%E1%BA%A5u%20h%C3%ACnh%20s%E1%BA%B5n/1000x500-(1).jpg",
    },
  ];
  return (
    <div>
      <TitleComponent title="Tin tức" />
      <div className="flex flex-col gap-6 mt-6">
        {data.map((item, index) => (
          <div key={index}>
            <div className="overflow-hidden">
              <img
                className="hover:scale-110 duration-200"
                src={item.img}
                alt={item.title}
              />
            </div>
            <p className="font-semibold mt-1">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
