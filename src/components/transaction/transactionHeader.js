import React, { useEffect, useState } from "react";
import ArrowNav from "../arrowNav/ArrowNav";
import "./index.css";
import { serverTime } from "../qickfun/qickfun";
import { DateTime } from 'luxon';

const TransactionHeader = ({handleSearch, setValue, value, isLoading}) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function convertToServerTime(userDate) {
    // Convert the user-selected date to a DateTime object
    const userDateTime = DateTime.fromISO(userDate);
    
    // Convert to Africa/Lagos timezone
    const serverTime = userDateTime.setZone('Africa/Lagos');
    
    return serverTime.toISO(); // Return in ISO format for backend
  }
  const [values, setValues] = useState({
    start: getFormattedDate(),
    stop: getFormattedDate(),
    transaction_type: "all",
    time_zone: userTimeZone
  });

  //console.log(values);
  
  // useEffect(()=> {setValue({...values})}, [values])

  // console.log(value);

  function getFormattedDate() {
    // const currentDate = new Date();
    // const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to get the correct month index (January is 0)
    // const day = String(currentDate.getDate()).padStart(2, '0');
    // const year = currentDate.getFullYear();
    // return `${month}/${day}/${year}`;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 to get the correct month index (January is 0)
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }


  return (
    <div className="transparent-block">
    
      <div>
        <ArrowNav name="Transactions" />
      </div>

      <div className="d-flex  justify-content-around pt-4">
        <input
          type="date"
          className="pt-1 btn btn-primary text-white rounded-3 fw-bold opacity-75 border-0 shadow-lg t-date-size "
          name="start"
          value={values.start}
          onChange={(e) => setValues({ ...values, start: e.target.value  })}
        />
        <div className="">
        <p className="">TO</p>
        </div>
        <input
          type="date"
          className="btn btn-primary text-white rounded-3  fw-bold opacity-75 border-0 shadow-lg t-date-size "
          name="stop"
          value={values.stop}
          onChange={(e) => setValues({ ...values, stop: e.target.value })}
        />
  
        
      </div>
      <div className="d-flex   pt-2 justify-content-center align-items-center">
        
        <select
          name="transaction_type"
          onChange={(e) => setValues({ ...values, transaction_type: e.target.value })}
          className="rounded-3 border-0 bg-primary opacity-75 p-2  option-div "
        >
          <option value="all" className="main-color border-0 text-font">
            All
          </option>
          <option value="withdraw" className="main-color border-0 text-font">
            Withdraw
          </option>
          <option value="deposit" className="main-color text-font">
            Deposit
          </option>
          <option value="balance_charge" className="main-color text-font">
            Bal. Charge
          </option>
        </select>
        {isLoading? (<button className="btn btn-primary opacity-50 disabled text-warning ms-2">Loading...</button>) : (<button className="btn btn-primary opacity-75 ms-2" onClick={() => handleSearch(values)}>Search</button>)}
        
      </div>
    </div>
  );
};

export default TransactionHeader;
