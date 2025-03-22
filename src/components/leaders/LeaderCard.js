import React from "react";


const LeaderCard = ({registered, deposited, withdrawn, total, style, active, currency, code}) => {
 //console.log(code);
  return (
    <div>
      <p className="ps-3 fw-bold">Statistics</p>
      <div>
        <div className={`p-3 ${style}`}>
          <div className="bg-transparent w-100 d-flex justify-content-around">
            <div className="bg-transparent d-flex flex-column align-items-center">
              <small className="bg-transparent">Required</small>

              <p className="bg-transparent">{registered}</p>
            </div>

            {/* <div className="bg-transparent">
              <i
                id="envelop"
                className="fa fa-chevron-right bg-transparent fa-fw fa-lg icon-color mt-4"
              ></i>
              <i
                id="envelop1"
                className="fa fa-chevron-right icon-color  bg-transparent fa-fw  fa-lg mt-4"
              ></i>
            </div> */}

        

            <div className="bg-transparent">
              <i
                id="envelop"
                className="fa fa-chevron-right bg-transparent icon-color fa-fw fa-lg mt-4"
              ></i>
              <i
                id="envelop1"
                className="fa fa-chevron-right fa-fw bg-transparent  icon-color fa-lg mt-4"
              ></i>
            </div>

            <div className="bg-transparent d-flex flex-column align-items-center">
              <small className="bg-transparent ">Active</small>

              <p className="bg-transparent">{active}</p>
            </div>

           
          </div>
          
          <div>
          <div className="bg-transparent d-flex flex-column align-items-center">
              <small className="bg-transparent ">Frozen Amount</small>
              <p translate="no" className="bg-transparent">{currency} {deposited}</p>
            </div>

            {/* <div className="bg-transparent d-flex flex-column align-items-center">
              <small className="bg-transparent ">Withdrawn</small>
              <p translate="no" className="bg-transparent">{currency} {withdrawn}</p>
            </div> */}
          </div>
        
          <div className="bg-transparent amt-div-1">
            <p  className="bg-transparent">Total Withdraw</p>
            <p translate="no" className="bg-transparent fw-bold"> {total} {code}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;
