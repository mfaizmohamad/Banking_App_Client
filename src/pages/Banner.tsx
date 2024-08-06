import { useNavigate } from "react-router-dom";
import routingPath from "../routing/Router_Path";

interface BannerProps {
    data: {
      discount: string;
      title: string;
      date: string;
      image: string;
      title2: string;
      title3: string;
      title4: string;
      bgColor: string;
    };
  }


  
  const Banner: React.FC<BannerProps> = ({ data }) => {

    const navigate = useNavigate();

    function Redirect() {
      navigate(routingPath.onlineBanking);
    }

    return (
      <div className="flex justify-center items-center py-12">
        <div className="container">
          <div
            style={{ backgroundColor: data.bgColor }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl"
          >
            <div className="p-6 sm:p-8">
              <p data-aos="slide-right" className="text-sm">
                ${data.discount}
              </p>
              <h1
                data-aos="zoom-out"
                className="uppercase text-[3rem] font-bold"
              >
                {" "}
                {data.title}
              </h1>
              <p data-aos="fade-up" className="text-sm">
                {data.date}
              </p>
            </div>
            <div data-aos="zoom-in" className="h-full flex items-center">
              <img
                src={data.image}
                alt=""
                className="scale-125 w-[250px] md:w-[340px]  mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,.6)] object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
              <p data-aos="zoom-out" className="font-bold text-xl">
                {data.title2}
              </p>
              <p data-aos="fade-up" className=" text-3xl sm:text-5xl font-bold">
                {data.title3}
              </p>
              <p data-aos="fade-up" className="text-sm tracking-wide leading-5">
                {data.title4}
              </p>
              <div data-aos="fade-up" data-aos-offset="0">
                <button
                  style={{ color: data.bgColor }}
                  className="bg-white py-2 px-4 rounded-full"
                  onClick={Redirect}
                >
                  Online Banking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Banner;
  