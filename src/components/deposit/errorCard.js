import React, { useState } from 'react'
import "./index.css"
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';



const ErrorCard = ({error, handleCloseModal1}) => {
  const navigate = useNavigate();
 



  const [token,setToken, removeToken] = useCookies(["auth-token"]);
  

  
  const goBack = () => {
    // window.history.back();
    navigate("/");
  };

  //Toggle Modal

  return (
    <div className="error-div-1 container">
      <div className="bg-transparent text-center text-danger fw-bold">{error}</div>
      <div className="bg-transparent d-flex  mt-4">
        <button
          onClick={handleCloseModal1}
          className="btn btn-success w-25 error-button bg-transparent me-auto "
        >
          Ok
        </button>
        <button
          onClick={goBack}
          className="btn btn-success error-button bg-transparent"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ErrorCard