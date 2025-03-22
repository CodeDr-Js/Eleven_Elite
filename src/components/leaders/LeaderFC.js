import React from "react";
import { convertToLocalTime } from "../qickfun/qickfun";

const LeaderFC = ({promotion, activeButton}) => {
 // console.log(promotion,activeButton);
  const splitData = (date) => {
    const splitDate = date.split(".")[0];
    return splitDate;

  }
  return (
    <div>
      <p className="ps-3 fw-bold ">Earning Chart</p>
      <div className="vip-gold d-flex justify-content-center text-center friend-div">
        <p className="bg-transparent user pt-3 fw-bold">User</p>
        <p className="bg-transparent amount pt-3 fw-bold">Amount</p>
        <p className="bg-transparent date pt-3 fw-bold">Date</p>
      </div>

     
      
  
      
        
            {promotion ? (promotion.activities.teams_dir.leaders_bonus_table[0] ? (Object.entries(promotion.activities.teams_dir.leaders_bonus_table).map(([k,e]) => (
                        <div key={k}>
                        <div className="d-flex justify-content-center text-center main-color opacity-50" > <p className="secondary-color ps-3 pe-3 round">{e.fields.module}</p></div>
                        <div  className="d-flex justify-content-center text-center main-color opacity-50 level-div">
                        
                        <p className="bg-transparent user">{e.fields.transactionID}</p>
                        <p translate="no" className="bg-transparent amount">{promotion.activities.init_currency.code === "USD" ? promotion.activities.init_currency.symbol + Number(e.fields.amount) : promotion.activities.init_currency.symbol + Number(e.fields.amount).toFixed(2)}</p>
                        <p className="bg-transparent date">{convertToLocalTime(splitData(e.fields.timestamp))}</p>
                      </div>
                        </div>
                      
                      ))) : "") : ""}
          
      
         
    </div>
  );
};

export default LeaderFC;
