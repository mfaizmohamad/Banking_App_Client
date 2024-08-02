import React from "react";
import Account from "./Account"
import Banner from "./Banner"
import Aos from "aos";
import "aos/dist/aos.css";

import Img1 from "../assets/hero/logo.png"
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

const BannerData = {
  discount: "30",
  title: "MYBANK",
  date: "10 Jan to 28 Jan",
  image: Img1,
  title2: "GFI SME",
  title3: "Lorem Ipsum",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#FDB0C0",
};

const Home = () => {
  React.useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    });
    Aos.refresh();
  }, []);
  
  return (
    <>
      <Banner data={BannerData}/>
      <Account/>
      <div className="flex gap-10 justify-center">
        <Deposit/>
        <Withdraw/>
      </div>
    </>
  )
}

export default Home
