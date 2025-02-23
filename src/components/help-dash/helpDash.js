import React, { useState } from "react";
import "./help.css";
import { Link, useNavigate } from "react-router-dom";
import support1 from "../../assets/svg/support1.svg";
import support2 from "../../assets/svg/support2.svg";
import support3 from "../../assets/svg/support3.svg";
import telegram1 from "../../assets/svg/telegram (1).svg";
import telegram from "../../assets/svg/telegram.svg";
import whatsapp from "../../assets/svg/whatsapp.svg";
import whatsapp1 from "../../assets/svg/whatsapp (2).svg";
import phone from "../../assets/svg/phone.svg";
import email from "../../assets/svg/email.svg";
import address from "../../assets/svg/address.svg";

const HelpDash = ({ isHelp, setIsHelp, result }) => {
  const navigate = useNavigate();

  //const [token,setToken, removeToken] = useCookies(["auth-token"]);

  const close = () => {
    // window.history.back();
    setIsHelp(false);
  };

  

  const navigateUrl = (url) => {
    navigate(url);
  }

  // (()=>{
  //   console.log("running");
  //   if(result && result.online_support) {
  //     Object.entries(result.online_support).map(([key, item]) => {
  //       console.log("Key is",key);
  //       console.log("Item is",item);
  //       // return(
  //       //   <div className="support-div d-flex">
  //       //   <div className="bg-transparent">
  //       //       <img
  //       //         className="bg-transparent"
  //       //         src={support1}
  //       //         alt="support1"
  //       //         style={{ width: "30px" }}
  //       //       />
  //       //     </div>
    
  //       //     <div className="ms-3 vip-text-2">
  //       //       <p>Support 1</p>
    
  //       //       <p className="bg-primary lang-b position-absolute ms-4" style={{fontSize:"8px"}}>French</p>
  //       //     </div>
    
            
    
  //       //     <div>
  //       //     <p className=" ms-4 ps-2 pe-2 rounded-2 text-decoration-none bg-primary">Chat</p>
  //       //     </div>
  //       //   </div>
  //       // )
        
  //     })
  //   } else {
  //     console.log("Else runned");
      
  //   }
    
  // })();

  const supportCard = result && result.online_support ? Object.entries(result.online_support).map(([key, item], index) => {
    // console.log(key);
    // console.log(item, index);
    return(
      <Link to={item} className="text-decoration-none">
         <div className="support-div d-flex mb-4">
      <div className="bg-transparent">
          <img
            className="bg-transparent"
            src={support1}
            alt="support1"
            style={{ width: "30px" }}
          />
        </div>

        <div className="ms-3 vip-text-2">
          <p>Support {index + 1}</p>

          <p className="bg-primary lang-b position-absolute ms-4" style={{fontSize:"8px"}}>{key}</p>
        </div>

        

        <div>
        <p className=" ms-4 ps-2 pe-2 rounded-2 text-decoration-none bg-primary">Chat</p>
        </div>
      </div>
      </Link>
   
    )
    
  }) : ""

  //Toggle Modal

  return (
    <div className="error-div-help main-color container">
      <div className="bg-transparent d-flex">
        <div className="bg-transparent"></div>
        <i onClick={close} className="fa fa-close ms-auto bg-danger"></i>
      </div>
      <p className="bg-transparent fw-bold">Live Support</p>
      <div className=" rounded-2 main-color1 pt-3 ps-3">
      {/* <Link to="https://t.me/EEF_CustomercareOfficial">
      <div className="bg-transparent d-flex text-decoration-none" >
        
        <div className="bg-transparent">
          <img
            className="bg-transparent"
            src={support1}
            alt="support1"
            style={{ width: "30px" }}
          />
        </div>
        <div>

        <p className="bg-transparent ps-3 pad">Support 1</p>
        


        </div>
        


        <p className=" ms-4 ps-2 pe-2 rounded-2 text-decoration-none bg-primary">Chat</p>
      </div>
      </Link> */}

      <div>
        {supportCard}
      </div>
      
     
      </div>

      <div className="bg-transparent mt-3 ">
        <p className="bg-transparent fw-bold">Follow us</p>
        <div className="main-color1 p-3 d-flex rounded-2 ">
          <div className="bg-transparent pe-4">
            <Link to="https://t.me/rrtccinvestment">
              <p className="t-channel">Channel</p>
              <img
                className="bg-transparent"
                src={telegram1}
                alt="telegram"
                style={{ width: "50px" }}
              />
            </Link>
          </div>
          <div className="bg-transparent pe-4">
            <Link to="https://t.me/RRTOFFOCIALPPROJECT">
            <p className="t-channel-1">Chat</p>
              <img
                className="bg-transparent"
                src={telegram1}
                alt="telegram"
                style={{ width: "50px" }}
              />
            </Link>
          </div>
          {/* <div className="bg-transparent">
            <Link to="https://wa.link/527o7f">
              <img
                className="bg-transparent"
                src={whatsapp1}
                alt="telegram"
                style={{ width: "50px" }}
              />
            </Link>
          </div> */}
        </div>
      </div>

      <div className="bg-transparent">
        <p className="bg-transparent fw-bold mt-3">Contact us</p>
        <div className="main-color1 p-3 rounded-2">
          <div className="bg-transparent pe-4 d-flex">
           
            
          </div>
          <div className="bg-transparent pe-4 d-flex">
            <div className="bg-transparent">
              {/* <img
                className="bg-success"
                src={email}
                alt="telegram"
                style={{ width: "25px" }}
              /> */}
                <i className="fas fa-envelope bg-transparent"> </i>
                
            </div>
            <p className="bg-transparent ps-3">rrt.ccfb@gmail.com </p>
          </div>

          <div className="bg-transparent pe-4 d-flex">
            <div className="bg-transparent">
              {/* <img
                className="bg-success"
                src={address}
                alt="telegram"
                style={{ width: "25px" }}
              /> */}
              <i className="fas fa-map-marker-alt bg-transparent"> </i>
            </div>
            <p className="bg-transparent ps-3">CHASE BUSINESS CENTRE
39-41 CHASE SIDE
LONDON
UNITED KINGDOM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDash;
