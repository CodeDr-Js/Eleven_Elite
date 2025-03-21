import React from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import success2 from "../../../assets/icons/success-2.svg";

const SuccessCard = ({ success, setSuccess}) => {
 const navigate = useNavigate();
  const goBack = () => {
    setSuccess(null);
  };
  return (
    <div className="error-div-1  container">
      <div  className=" bg-transparent d-flex justify-content-center mb-1">
        <img className=" bg-transparent" src={success2} alt="success icon" style={{width: "35px"}}/>
      </div>
      <div className="bg-transparentr text-center text-success fw-bold">
        {success}
      </div>
      <div className="bg-transparent d-flex  mt-4">
        <button
          onClick={goBack}
          className="btn btn-success error-button bg-transparent me-auto "
        >
          Continue
        </button>
        <Link to="/history" className="btn btn-success error-button bg-transparent">
          History
        </Link>
      </div>
    </div>
  );
};

export default SuccessCard;
