import React, { useContext, useEffect, useState, } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/Logo.png";
import "./index.css";
// import Dropdown from "react-bootstrap/Dropdown";
import HomeIcon from "../../../assets/images/bell.png";
import dollar from "../../../assets/icons/dollar.png"
// import tether from "../../../assets/icons/tether.png"
// import usdt from "../../../assets/icons/usdt.png"
// import usd from "../../../assets/icons/usd.png"
// import usd1 from "../../../assets/icons/usd1.png"
import { DataContext } from "../../APIs/Api";
import "../../largeScreen/largeHeader.css";
import { timer } from "../../Functions/timer";
import { numberWithCommas } from "../../qickfun/qickfun";






const NavBar = () => {
  const navigate = useNavigate();
  const {activities_g, user_g} = useContext(DataContext);
  

  const handleClick = () => {
    navigate("/notification")
  }

  return (
    <div translate="no" className="">


   
    <div translate="no" className="container pt-2 d-flex justify-content-between fixed-top default_color round-header">
      <div translate="no" className=" d-flex vip-text-3" >
            <div translate="no">
            {/* <img src={dollar} alt="Logo" className="" style={{ width: "33px" }} /> */}
            </div>

            {!Array.isArray(activities_g) ?(activities_g.wallet ? (<p translate="no" className='ps-2 pt-1 fw-bold  '>{activities_g.init_currency.symbol}  {numberWithCommas(activities_g.wallet.bal_info.bal.toFixed(2))}</p>):"")  : "" }
          {/* <p className='ps-2 pt-1 fw-bold '>$ 30000</p> */}
       
          </div>

          
          {/* <h2 className="company-name text-center ">Hi {user_g.username}</h2> */}
          {/* {!Array.isArray(activities_g) ? (<h2 className="company-name text-center ">Hi {}</h2>) : "" }
       */}
      <div className=" d-flex  ">
  
        <div id="timer" translate="no" className="ms-5 opacity-75 fs-5 timer" style={{"fontFamily": "Orbitron, sans-serif"}}>
         {timer()}
        </div>
        {/* <div className="d-flex ms-5">
          <p className="fw-bold lang">EN</p>
          <a href="" className="mt-1 text-decoration-none text-white drop">
            ^
          </a>
        </div> */}

        {/* <div className="select-div   me-auto main-color rounded-2 fw-bold ps-2 pe-2 pt-1">
         <h4 className="d-flex bg-transparent "> <span className="selete-text">EN</span> <i
                id=""
                className="fa fa-chevron-down  fa-fw ps-1 bg-transparent mt-1 opacity-50 "
              ></i></h4> 
          
           <option>Home</option>
          <option>Live</option>
          <option>Anti-Score</option>
          <option>Sports</option>
        </div> */}
    
        <div className="bg-transparent pe-2 " onClick={handleClick}>
              <i
                id=""
                className="far fa-bell  fa-fw fa-lg ps-3  pt-3  bg-transparent "
              ></i>
              {!Array.isArray(activities_g) ? (
                <p className="bg-danger rounded-circle bell-num1">
                  {activities_g.notification
                    ? activities_g.notification.unseen.length
                    : "0"}
                </p>
              ) : (
                <p className="bg-danger rounded-circle bell-num1">0</p>
              )}
          </div>
      </div>
    </div>
    </div>
  );
};

export default NavBar;
