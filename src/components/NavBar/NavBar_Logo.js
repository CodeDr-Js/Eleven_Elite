import React, { useContext } from "react";
import Logo from "../../assets/images/Logo.png";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "./index.css";
import { Link } from "react-router-dom";
import dollar from "../../assets/icons/dollar.png";
import tether from "../../assets/icons/tether.png";
import usdt from "../../assets/icons/usdt.png";
import usd from "../../assets/icons/usd.png";
import usd1 from "../../assets/icons/usd1.png";
import { DataContext } from "../APIs/Api";
import { numberWithCommas } from "../qickfun/qickfun";


const NavBar_Logo = ({ search, setSearch }) => {
  //console.log("searchNav-Logo", search);
  const { activities_g } = useContext(DataContext);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div translate="no" className="container-sm ms-1 d-flex mt-2 w-100 round-header">
      <div onClick={goBack}>
        <img src={Arrow} alt="arrow-back" className="nav-arrow" />
      </div>
      {/* <a className="ms-auto" href="/">
        <img src={Logo} alt="Logo" className="" style={{ width: "40px" }} />
      </a> */}
      <div translate="no" className=" ms-2 wg-card d-flex w-50">
        {/* <div>
          <img src={dollar} alt="Logo" className="" style={{ width: "33px" }} />
        </div> */}

        {!Array.isArray(activities_g) ? (
          <p translate="no" className="ps-2 pt-1 fw-bold vip-text-3  ">
            {activities_g.init_currency.symbol} {numberWithCommas(activities_g.wallet.bal_info.bal.toFixed(2))}
          </p>
        ) : (
          ""
        )}
        {/* <p className='ps-2 pt-1 fw-bold '>$ 30000</p> */}
      </div>

      <div className="">
        {/* <i className="fa fa-search position-absolute mt-2 ms-2"></i> */}
        {/* <input
          type="text"
          className="search-div rounded-4 p-1"
          placeholder="search for league or team..."
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> */}
        <input
          className="form-control w-75 ms-auto form-username-1 rounded-4 bg-transparent mb-3 "
          type="text"
          placeholder="search for league or team..."
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default NavBar_Logo;
