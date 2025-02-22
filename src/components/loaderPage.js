import React from "react";
import "./LogoLoader.css"; // Import CSS for styling (if needed)
import Logo from "../assets/images/newlogo.png";
import ball from "../assets/images/ball.png";
function LogoLoader() {
  return (
    <>
    <div className="loader-container">
      {/* Replace 'logo.svg' with the path to your company logo */}
      <img src={Logo} alt="Company Logo" className="logo" />
      <div className="logo-text">
        <h5>RRT.CC</h5>
        <span>
          <small>Football</small>

        </span>
       
       
        
      </div>
      <img className="loader" src={ball}/>

    </div>

    <div className="d-flex justify-content-center align-items-center" style={{marginTop:"-200px"}}>
          <small>Since 2023 - version  21.5</small>
      </div>
    </>
  );
}

export default LogoLoader;
