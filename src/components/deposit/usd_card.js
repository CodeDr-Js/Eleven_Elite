import React, { useContext, useEffect, useState } from "react";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import "./index.css";
import "../color/color.css";
import { Link, useNavigate } from "react-router-dom";
import dollar from "../../assets/icons/dollar.png";
import tether from "../../assets/icons/tether.png";
import usdt from "../../assets/icons/usdt.png";
import usd from "../../assets/icons/usd.png";
import usd1 from "../../assets/icons/usd1.png";
import { DataContext } from "../APIs/Api";
//import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { API } from "../api-service/api-service";
import QRCodeGenerator from "../qr-code/qrCode";
import "../fontawesome/css/all.css";
import Other from "./Other";
import ErrorCard from "./errorCard";
import SuccessCard from "./successCard";

const UsdCard = ({uploadHash, localCard, activities_g}) => {
  console.log({uploadHash});
  
  const {
    setActiveToken,
    setActivities_g,
    result,
    setResult,
    getUserData,
    hasRunRetrieve,
    telegram
  } = useContext(DataContext);
  // console.log(activities_g);
  const navigate = useNavigate();
  const token = Cookies.get("auth-token");
  const [message, setMessage] = useState();
  const [reloadTriggered, setReloadTriggered] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selectedPage, setSelectedPage] = useState();
  const [isOther, setIsOther] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hashId, setHashId] = useState("");
  const [hashSuccess, setHashSuccess] = useState("");
  const [hashError, setHashError] = useState("");

  console.log(activities_g);
  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Wallet address successfully copied to clipboard");
      })
      .catch((err) => {
        setMessage("Failed to copy text");
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    if (!hasRunRetrieve) {
     // getUserData();
    }
  }, []);

  const navigatePage = () => (
    <div>
      <Other />
    </div>
  );

  // const checkPayaddress = () => {


  //   if(activities_g.deposit_dir.awaiting_deposit[0]) { 
  //       console.log("Awaiting deposit is found");
        
  //       setIsOpen(true);

  //   } {
  //    setIsOpen(false);
  //    API.retrieveDeposit(token)
  //       .then((result) => {
  //         console.log("running server again");
          
  //         //    console.log(result);
  //         setIsOpen(true);
  //         if (result.success || result.message === "success") {
  //           setResult(result);
  //           setActivities_g(result.activities);
  //         } else if (!result.success) {
  //           //    console.log("removing token");
  //           // removeToken("auth-token");
  //           Cookies.remove("auth-remove");
  //         }
  //       })
  //       .catch((err) => console.log(err));

  //   }

  // };

  useEffect(() => {
    //checkPayaddress();
  }, []);

  const checkToken = () => {
    if (token) {
      // console.log("token", token1);
      setActiveToken(token);
    } else {
      setActiveToken("");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);

  setTimeout(() => {
    if (message) {
      setMessage("");
    }
  }, 3000);
  const goBack = () => {
    window.history.back();
  };

  // const handleSelectChange = (event) => {
  //   const selectedValue = event.target.value;
  //   if (selectedValue) {
  //     window.history.push(selectedValue);
  //   }
  //   // navigate(url);
  // };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      setSelectedPage(selectedValue);
      setIsOther(true);
      // setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    // setIsModalOpen(false);
    // setSelectedPage(null);
  };

  const handleCloseModal1 = (e) => {
    setIsOpen1(false);
    setHashError("");
    setHashSuccess("");
    //  if (e.target.classList.contains("modal-overlay-error")) {
    //    setIsOpen(false);
    //  }
    // const newBetBtn = document.getElementById(betBtn);
    // if (Number(values.amount) >= 10) {
    //   newBetBtn.classList.remove("disabled");
    // }
  };

//   const renderSelectedPage = () => {
//     switch (selectedPage) {
//       case "idn":
//         return (
//           <Other
//             setIsOther={setIsOther}
//             account_number="2740409266"
//             account_name="MUDASIR"
//             bank_name="BCA"
//             telegram={ <div className=" moving-text-container" > <div className="moving-text">
//               <a
//                 href="https://t.me/EEF_OFFICIAL_INDONESIA"
//                 className="fw-bold fs-3 text-success text-decoration-none"
//               >
//                 Click Here{" "}
//               </a>{" "}
//               to join Indonesia Official Telegroup Group Page.
//             </div></div>   }
//           />
//         );
//       case "CIV":
//         return (
//           <Other
//             setIsOther={setIsOther}
//             account_number="*************"
//             account_name="************"
//             bank_name="**************"
//             style="disabled"
//           />
//         );
//       // case 'page3':
//       //   return <Page3 />;
//       default:
//         return null;
//     }
//   };

  const handleHashSubmit = () => {
      setIsLoading(true)

      if(!hashId) {
        alert("Hash Id is required");
        setIsLoading(false);
        return;
      } else {
        API.sendRequest({action: "submit_hash_id", hashID : hashId }, token)
        .then((result)=>{
          console.log(result);
          setIsLoading(false);
          if(result.success) {
            setActivities_g((prev)=>({...prev, deposit_dir: result.deposit_dir }))
            setIsOpen1(true);
            setHashSuccess(result.message);
          } else {
            setIsOpen1(true);
            setHashError(result.message.error || result.message);
          }
  
        })
        .catch((err)=>console.log(err)
        )
        console.log(
        );

      }
      
  }
  return (
    <div className="container">
      {/* <div className="d-flex pt-3">
        <div onClick={goBack}>
          <img src={Arrow} alt="arrow-back" className="nav-arrow" />
        </div>
        <h3 className="text-center w-100">Deposit</h3>
      </div> */}

      <div className="mt-4">
        <div className="">
          <div className="d-flex">
            {/* <div
              className="d-flex w-50 main-color rounded-3 shadow-lg me-2"
              style={{ height: "55px" }}
            >
              <div className="main-color pt-3 ps-3">
                <img src={usdt} alt="usdt logo" style={{ width: "27px" }} />
              </div>
              <p className="main-color ps-3 pt-3 fw-bold">USDT</p>
            </div> */}
             
          </div>

          <div className="moving-text-container mt-2">
         
          </div>

          {uploadHash? <div className="mt-4">
            <p className="fw-bold">Payment Guide</p>
            <ol className="text-justify opacity-50">
              <li>This address accepts only TRC20 network, transferring here any
              other coin will result to fund loss.</li>
              <br></br>
              <li>Submit the success transaction hash ID  with the form below to complete your deposit request. </li>

            </ol>
            
            <p className="text-justify opacity-50">
          
            Copy token address here:
            </p>
          </div> : 
          <div className="mt-4">
            <p className="fw-bold">Your USDT deposit address</p>
            <p className="text-justify opacity-50">
              This address accepts only TRC20 network, transferring here any
              other coin will result to fund loss. Copy token address here:
            </p>
          </div>
          }

          {message ? (
            <p className="alert alert-success text-uppercase f-italic">
              {message}
            </p>
          ) : (
            ""
          )}
          <div
            className="d-flex main-color rounded-3 shadow-lg"
            style={{ height: "55px" }}
          >
            {!Array.isArray(activities_g) && isOpen && activities_g.deposit_dir && activities_g.deposit_dir.awaiting_deposit !== null ? (
              <p className="ps-3 pt-3 main-color s-text-size">
                {JSON.parse(activities_g.deposit_dir.awaiting_deposit[0].fields.extraField).pay_address}
              </p>
            ) : (
              <p className="ps-3 pt-3 main-color text-warning">Loading...</p>
            )}

            <i
              onClick={() => handleCopy(JSON.parse(activities_g.deposit_dir.awaiting_deposit[0].fields.extraField).pay_address)}
              id="envelope"
              className="fa fa-copy fa-fw fa-lg opacity-50 ms-auto me-3 mt-4"
            ></i>
          </div>

          <div className="d-flex justify-content-center w-100 mt-3">
            <QRCodeGenerator
              text={
                !Array.isArray(activities_g) && activities_g.deposit_dir && activities_g.deposit_dir.awaiting_deposit !== null
                  ? JSON.parse(activities_g.deposit_dir.awaiting_deposit[0].fields.extraField).pay_address
                  : ""
              }
            />
          </div>

          <div
            className="d-flex main-color rounded-3 shadow-lg mt-3"
            style={{ height: "55px" }}
          >
            <div className="main-color">
              <img />
            </div>
            <i
              id="envelope1"
              className="fa fa-exclamation-triangle fa-fw fa-lg opacity-50 text-warning main-color"
            ></i>
            <p className="main-color pt-3 w-100 text-center text-warning">
              Amount to deposit is {!Array.isArray(activities_g) && activities_g.deposit_dir && activities_g.deposit_dir.awaiting_deposit !== null
                  ? Math.floor(activities_g.deposit_dir.awaiting_deposit[0].fields.amount) + " "  + activities_g.deposit_dir.awaiting_deposit[0].fields.currency
                  : ""} .
            </p>
          </div>


          <br/>
          {uploadHash ?  <div>
          <textarea
              className="form-control form-username main-color p-3 opacity-75"
              placeholder="Enter the Hash ID"
              name="amount"
              onChange={(e) => setHashId(e.target.value)}
              required
            
           
            />
             <br/>

          {isLoading ? (
            <button className="btn btn-primary w-100 p-3 fw-bold disabled opacity-50 text-warning">
              Loading...
            </button>
          ) : (
            <button
              id="withdraw_id"
              
              className={
               10  > 2 
                  ? "btn btn-primary w-100 p-3 fw-bold "
                  : "btn btn-primary w-100 p-3 fw-bold disabled opacity-50 "
              }
              onClick={handleHashSubmit}
            >
              Submit Hash ID
            </button>
          )}
          </div> 
          : ""}

         


          {uploadHash ? "" : 
          
          <div className="mt-4">
            <div className="opacity-50 pe-2 text-justify fst-italic bg-transparent">
              <span className="text-warning ">NOTE:</span>
              <ol>
                <li className="pb-2 pt-1">
                  {" "}
                  <small>
                    {" "}
                    Please do not deposit any assets other than TRC20-USDT to
                    the above address, as the assets will be irretrievable. The
                    minimum recharge amount is 10 USDT, and recharges below the
                    minimum amount will not be credited and cannot be refunded.
                  </small>
                </li>
                <li className="pb-2 ">
                  <small>
                    Your recharge address will change frequently after a success
                    transaction and cannot be reused for deposits. In case of
                    any changes, we will notify you through website
                    announcements or emails. Please ensure the security of your
                    computer and browser to prevent information tampering and
                    leakage.
                  </small>
                </li>
                <li>
                  {" "}
                  <small>
                    After you deposit to the above address, it requires
                    confirmation from the entire network nodes. The funds will
                    be credited after 1 network confirmation, and you can
                    withdraw them after 1 network confirmation tips
                  </small>
                </li>
              </ol>
            </div>
            {/* <p className="opacity-50">
              Maximum deposit amount is not limited. EEF doesn't have any fee
              for USDT deposits. USDT deposits may take some time related to the
              network hash rate.
            </p> */}
            {/* {isOther && (
              <div className="modal-overlay-profile">
                {" "}
                {renderSelectedPage()}
              </div>
            )} */}


          </div>
          }

        </div>
      </div>

      {isOpen1 ? (
          <div>
            {hashError ? (
              <div className="modal-overlay-error">
                <ErrorCard
                  handleCloseModal1={handleCloseModal1}
                  error={hashError}
                  isOpen1={isOpen1}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

      {
        isOpen1 ? (
          <div>
            {hashSuccess ? (
          <div className="modal-overlay-success">
            <SuccessCard
            
            success={hashSuccess}
            handleCloseModule1={handleCloseModal1 }
            is
            />
          </div>
        ) : (
          ""
        )}
          </div>
        ) : (
          ""
        )}
  
    </div>
  );
};

export default UsdCard;
