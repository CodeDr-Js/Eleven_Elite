import React, { useState } from 'react';
import "./index.css";
import ArrowNav from '../arrowNav/ArrowNav';
import { API } from '../api-service/api-service';
import Cookies from "js-cookie";


const Other = ({setIsOther}) => {
    const [values, setValues] = useState({
        sender: "",
        amount: "",
        file_upload: ""

    });

   // console.log(values);

const token = Cookies.get("auth-token");

  const close = () => {
    // window.history.back();
    setIsOther(false);
  };

  const handleFileChange = (event) => {
    setValues((prev) => ({
      ...prev,
      file_upload: event.target.files[0],
    }));
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    API.local_payment(values, token ).then(result=> {
        console.log(result);
    })
 }
 
  return (
    <>
    {/* <ArrowNav name="Others"/> */}
    <div className=' error-div-help main-color container mt-3'>
    <div className="bg-transparent d-flex">
        <div className="bg-transparent"></div>
        <i onClick={close} className="fa fa-close ms-auto "></i>
      </div>
        <div className='m-color rounded-4 p-3 text-center'>
            <h2 className=''>Account Details</h2>
            <div className='opacity-75'>
            <p className='fw-bold'>Account Number</p>
            <p>***************</p>
            <p className='fw-bold'>Account Name</p>
            <p>-</p>
            <p className='fw-bold'>Bank Name</p>
            <p>-</p>
            </div>
        </div>

        <div className='mt-3 '>
            <h3>Submit details:</h3>
            <div className='m-color p-4 text-center'>
            {/* <input
              className="form-control w-100 form-username g-sub-color mb-3 "
              type="text"
              placeholder="Provide Senders name"
              name="sender"
              required
              onChange={(e) =>
                setValues({ ...values, sender: e.target.value })
              }
            />
            <input
              className="form-control w-100 form-username g-sub-color mb-3 "
              type="text"
              placeholder="Enter Amount Sent"
              name="amount"
              required
              onChange={(e) =>
                setValues({ ...values, amount: e.target.value })
              }
            /> */}
            {/* <input
              className="form-control w-100 form-username g-sub-color mb-3 "
              type="file"
              name="file_upload"
              required
              onChange={handleFileChange}
            /> */}
            <small className='text-warning text-center  opacity-50'>Kindly click on the upload button and upload your Successful Transaction Receipt along side with Amount Sent and the Sender's fullname on Telegram Customer Care Service for Automatic Confirmation and Approval</small>
            <button
              id="withdraw_id"
              onClick={handleSubmit}
              className={
                 "btn btn-primary w-100 p-3 fw-bold disabled opacity-50 "
              }
            >
              Upload Receipt 
            </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Other