import React from "react";
import "./index.css"
import { Link, useNavigate } from "react-router-dom";


const SuccessCard = ({ success, isOpen1, handleCloseModule2, pin }) => {
  //console.log(pin, isOpen1, success);
  const navigate = useNavigate();
  const goBack = () => {
    // window.history.back();
    navigate("/");
  };
  const goNext = () => {
    // window.history.back();
    navigate("/transaction");
  };

  
  return (
    <div className="error-div-1 pt-5 container">
      <div className="bg-transparent text-center text-success fw-bold">
        {success}
      </div>
      <div className="bg-transparent d-flex  mt-4">
        <button
          onClick={goNext}
          className="btn btn-success error-button bg-transparent me-auto "
        >
          Transaction
        </button>
        <button
        onClick={goBack}
          
          className="btn btn-success error-button bg-transparent"
        >
          Cancel
        </button>
        {/* <Link to="/history" className="btn btn-success error-button bet-color">
          History
        </Link> */}
      </div>
    </div>
  );
};

export default SuccessCard;
