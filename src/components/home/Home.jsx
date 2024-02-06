import React from "react";
import "./home.css";
import Shop from "../shop/Shop";
import Featured from "../featured/Featured";

const Home = () => {
  return (
    <div className="home">
      <div className="container-home">
        <div className="text-home">
          <h1>LOMBOK</h1>
          <p>NATURAL HEALTH</p>
          <p className="line"></p>
        </div>
      </div>
      <Featured />
      <Shop />
    </div>
  );
};

export default Home;
