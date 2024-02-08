import Products from "../products/Products";
import "./shop.css";
const Shop = () => {
  return (
    <div>
      <div className="container-shop">
        <div className="text-shop">
          <h4>Spring</h4>
          <p className="line"></p>
          <h4>Collection</h4>
          <p className="line"></p>
          <h1>SHOP</h1>
        </div>
        <div className="scroll">
          <div className="main__action">
            <a className="main__scroll scroll-button" href="#">
              <div className="main__scroll-box">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M11.9997 13.1716L7.04996     8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z"
                    fill="rgba(28,28,30,1)"
                  ></path>
                </svg>
              </div>

              <span className="main__scroll-text">SCROLL</span>
            </a>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default Shop;
