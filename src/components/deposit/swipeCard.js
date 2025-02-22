import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const AccountCards = ({activities_g, isLocalAcc}) => {
 
  const [message, setMessage] = useState("");
  const handleCopy = (text) => {
    // const text = activities_g.deposit_dir.local_address[0].fields.account_number;
    //console.log(text);
    
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Account No. copied to clipboard");
       // console.log("Copied...");
      })
      .catch((err) => {
        setMessage("Failed to copy text");
        console.error("Failed to copy text: ", err);
      });
  };

  setTimeout(() => {
    if (message) {
      setMessage("");
    }
  }, 3000);
  return (
    <div className="container d-flex justify-content-center ">
      {activities_g.deposit_dir.local_address.length > 1 ? (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          keyboard={{ enabled: true }}
          className="rounded shadow-sm"
        >
          {activities_g.deposit_dir.local_address.map((account, index) => (
            <SwiperSlide key={index}>
              <div className="card p-4 text-center ">
                <small className="text-muted fw-bold opacity-50">Name</small>
                <h2 className="text-muted">{account.fields.account_holder}</h2>
                <div>
                    <div>

                  <i
                    onClick={() => handleCopy(account.fields.account_number)}
                    id="envelope"
                    className="fa fa-copy fa-fw fa-lg opacity-50 ms-5 ps-5 mt-4 pt-3 text-primary position-absolute"
                    
                  ></i>
                    </div>

                  <div className="position-relative">
                    {message ? (
                      <p className="alert alert-success text-uppercase f-italic">
                        {message}
                      </p>
                    ) : (
                      ""
                    )}

                    <small className="text-muted fw-bold opacity-50">
                      Number
                    </small>

                    <h2 onClick={() => handleCopy(account.fields.account_number)}className="text-muted">{account.fields.account_number}</h2>
                  </div>
                </div>
                <small className="text-muted fw-bold opacity-50">Bank</small>
                <h2 className="text-muted">
                {account.fields.bank}
                </h2>
                <p className="fw-bold text-warning">
                  Amount to deposit {account.fields.currency} {Math.floor(activities_g.deposit_dir.awaiting_deposit[0].fields.amount)}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : activities_g.deposit_dir.local_address.length === 1 ? (
        <div className="card p-4 text-center w-100">
        <small className="text-muted fw-bold opacity-50">Name</small>
        <h2 className="text-muted">{activities_g.deposit_dir.local_address[0].fields.account_holder}</h2>
        <div>
            <div>

          <i
            id="envelope"
            className="fa fa-copy fa-fw fa-lg opacity-50 ms-5 ps-5 mt-4 pt-3 text-primary position-absolute"

            onClick={()=>handleCopy(activities_g.deposit_dir.local_address[0].fields.account_number)}
          ></i>
            </div>

          <div className="position-relative">
            {message ? (
              <p className="alert alert-success text-uppercase f-italic">
                {message}
              </p>
            ) : (
              ""
            )}

            <small className="text-muted fw-bold opacity-50">
              Number
            </small>

            <h2  onClick={()=>handleCopy(activities_g.deposit_dir.local_address[0].fields.account_number)} className="text-muted">{activities_g.deposit_dir.local_address[0].fields.account_number}</h2>
          </div>
        </div>
        <small className="text-muted fw-bold opacity-50">Bank</small>
        <h2 className="text-muted">
        {activities_g.deposit_dir.local_address[0].fields.bank}
        </h2>
        <p className="fw-bold text-warning">
          Amount to deposit {activities_g.deposit_dir.local_address[0].fields.currency} {Math.floor(activities_g.deposit_dir.awaiting_deposit[0].fields.amount)}
        </p>
      </div>
      ) : (
        <p className="text-center text-muted">No account details available.</p>
      )}
    </div>
  );
};

export default AccountCards;
