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
import Cookies  from "js-cookie";
import Pin from "../withdrawal pin/pin";
import { API } from "../api-service/api-service";
import WithdrawSuccess from "./withdrawSuccess";
import Loader from "../loader/loader";
import LocalWithdrawal from "./LocalWithdrawal";
import ArrowNav from "../arrowNav/ArrowNav";


const Withdrawal = () => {
  const navigate = useNavigate();
  const { setActiveToken, activities_g, setActivities_g, getUserData, hasRunRetrieve } =
    useContext(DataContext);
  const token = Cookies.get("auth-token");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [values, setValues] = useState({
    amount: "",
    address: "",
    bank: "",
    account_holder: "",
    withdrawal_code: ""

  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPin, setIsLoadingPin] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(null);
  const [pin, setPin] = useState();
  const [errorWithdraw, setErrorWithdraw] = useState();
  const [amountWithdrawn, setAmountWithdraw] = useState();
  const [withdrawnSuccessMsg, setWithdrawSuccessMsg] = useState();
  const [loadings, setLoadings] = useState(false);
  const [isUsd, setIsUsd] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  // const [amount, setAmount] = useState('');
  const checkToken = () => {

    if (token) {
      //console.log("token", token1);
      setActiveToken(token);
    } else {
      setActiveToken("");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);

  
  useEffect(()=> {
    if(!hasRunRetrieve){
      //getUserData()
    }
  }, [])

  useEffect(()=> {setLoadings(true) 
    if(!Array.isArray(activities_g)){
    setLoadings(false)
  }},[activities_g])


  const handleAllClick = () => {
    setValues((prev) => ({
      ...prev,
      amount : !Array.isArray(activities_g) ? activities_g.wallet.bal_info.bal.toFixed(2):""
    }))
    // setValues(!Array.isArray(activities_g) ? activities_g.wallet.bal_info.bal.toFixed(2):""); // Set the amount to total available amount
  };

  const [isOpen1, setIsOpen1] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

//  console.log(values);

  // const checkWithdrawalAmount = () => {
  //   const withdraw_id = document.getElementById("withdraw_id");
  //   if(values.amount !>= 10) {}
  // }

  const handleSubmitWitdrawal = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorWithdraw('');
    setAmountWithdraw("");

    API.sendRequest({ action: "create_withdraw", ...values }, token)
    .then((result) => {
    console.log(result);
    setIsLoading(false);
    if(result.success) {
      setIsOpen3(true);
      setAmountWithdraw(result.amount)
      setWithdrawSuccessMsg(result.message)
      setActivities_g((prev) => ({
        ...prev,
        wallet: result.activities.wallet

      }))
    } else if (result.detail || result.detail === "Invalid token.") {
     Cookies.remove("auth-token")
      setActiveToken('')
      navigate("/login")

    } else if(result.success === false) {
     // console.log(result);
      alert(result.message || result.message.error)
      setErrorWithdraw(result.message || result.message.error)
    }
  }) 
  .catch((err) => {console.log(err);  setIsLoading(false);
  })
  
  };


  const retrieveWitdrawalInfo = () => {
    // setUploadHash(false);
    // setLoading(true);
    if (!token) {
      Cookies.remove("auth-token");
      navigate("/login");
    } else {
      if (!Array.isArray(activities_g) && activities_g.wallet) {
        // setLoading(false);
        // console.log({activities_g});
        // console.log("Running at this point");
        
        if(activities_g.init_currency.code === "USD") {
          setIsUsd(true);
          setIsLocal(false);
        } else {
          setIsLocal(true);
          setIsUsd(false);
        }
        
        //   console.log("Loading check....");
        //   const deposit = activities_g.deposit_dir.awaiting_deposit;
        //   const local = activities_g.deposit_dir

        //   if(local.local_address) {
        //     console.log("Local found, true");
        //     setIsLocalAcc(true);
        //   } else {
        //     console.log("Local not found, false");
        //     setIsLocalAcc(false)
        //   };
        //   if(Array.isArray(deposit)) {
                
        //     if(deposit[0].fields.generator === "awaiting_deposit_confirmation") {
        //       console.log("Awaiting is found");
              
        //       setAwaiting(true);
        //       setFileUrl(deposit[0].fields.file_url);
        //     } else {
        //       console.log("Awaiting is found");
        //       setAwaiting(false);
        //     }
        //   }



        //   if (deposit === null) {
        //     setIsOpen(true);
        //     setUsdCard(false);
        //     setLocalCard(false);
        //   } else if (deposit[0].fields.method == "USD") {
        //     // console.log("Method is USD");

        //     //TO BE MODIFIED......
        //     setUsdCard(true);
        //     setIsOpen(false);
        //     setLocalCard(false);

        //     const extraField = JSON.parse(deposit[0].fields.extraField);

        //     if (extraField.upload_hash_id) {
        //       setUploadHash(true);
        //     }
        //   } else {
        //     setLocalCard(true);
        //     setIsOpen(false);
        //     setUsdCard(false);
        //   }

          
        // } else {
        //   console.log("Awaiting_deposit not found");
        // }
        // console.log("We have a deposit dir");
      } else {
        // console.log("No Deposit_dir");
        // setIsOpen(false);
        // setUploadHash(false);
        API.retrieveWitdrawal(token)
          .then((result) => {
            ///setLoading(false);
            console.log(result);
            console.log("Server Response");

            setActivities_g((prev) => ({
              ...prev, init_currency: result.activities.init_currency,
              wallet: result.activities.wallet
            }));

            if(result.activities.init_currency.code === "USD"){
              setIsUsd(true);
              setIsLocal(false);
            } else {
              setIsLocal(true);
              setIsUsd(false);
            }
          
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(()=>{
    retrieveWitdrawalInfo()
  },[])



  //console.log("A.P",activities_g.profile,"A:", activities_g);
  //Handing set pin
  // const handleActivities = () => {
  //   setTimeout(() => {
  //     if (!activities_g.profile ) {
  //       setIsOpen(true);
  //     } else if(Object.keys(activities_g.profile).includes("transaction_pin")) {
  //       setIsOpen(true);
  //     }
      
  //   }, 7000);
    
 

  // };

  // useEffect(() => {
  //   handleActivities();
  // }, []);

  // const handleCloseModal = (value) => {
  //   setSuccess("");
  //   setError("");

  //   setIsLoadingPin(true);
  //   //console.log(value);
  //   API.setPin(value, token)
  //     .then((result) => {
  //       //console.log(result);
  //       setIsLoadingPin(false);

  //       if (result.success) {
          
  //         setPin(result.activities.profile.transaction_pin);
  //         setSuccess("Transaction pin set. Your transaction pin: ");
  //         setIsOpen1(true);
  //         setTimeout(() => {
  //           setActivities_g((prev)=>{
  //             return (
  //               {...prev,
  //                 profile: result.activities.profile  
  //               }
                
  //             )
  //           })
            
  //         }, 10000);
  //        // console.log(activities_g);
  //         //setIsOpen(false);
  //       } else {
  //         setError(result.detail);
  //         setError(result.message);
  //         setIsOpen1(true);
  //         // setIsLoadingPin(false);
  //         setIsOpen(true);
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   // setTimeout(() => {

  //   // }, 5000);

  //   //  if (e.target.classList.contains("modal-overlay-error")) {
  //   //    setIsOpen(false);
  //   //  }
  //   // const newBetBtn = document.getElementById(betBtn);
  //   // if (Number(values.amount) >= 10) {
  //   //   newBetBtn.classList.remove("disabled");
  //   // }
  // };



  setTimeout(() => {
    if (errorWithdraw) {
      setErrorWithdraw("");
    }
  }, 3000);

  const goBack = () => {
    window.history.back();
  }

  const handleNavigate = (url) => {
    navigate(url);
  }

  const handleGetCode = () => {
    // e.preventDefault();
    setCodeLoading(true);
    API.sendRequest({ action: "get_withdrawal_otp"} , token)
      .then((result) => {
      console.log("loading...");
      setCodeLoading(false);
      // return console.log(result);
      if(result.success) {
        alert(result.message)
      } else {
        alert(result.message)
      }
    
    })
    .catch((err) => console.log(err)
    )
  }
  return (
    <> 
    {isUsd &&
    <div className="container">
      <div className="pt-3">
      <div className="fixed-top ">
              <ArrowNav name="Withdraw" bg="main-color" />

              <div className="blur d-flex justify-content-center align-items-center " >
            <p translate="no" className="text-center pt-3 text-success fw-bold ">Total Withdraw:  {!Array.isArray(activities_g) && activities_g.wallet.history
          ? activities_g.init_currency.symbol +
          activities_g.wallet.history.withdraw
          : ""}
      </p>

            </div>
            
        </div>
      </div>

      <br/>

      

      <div className="mt-4">
        {/* <div className="d-flex">
          <div
            className="d-flex w-50 main-color rounded-3 shadow-lg me-2"
            style={{ height: "55px" }}
          >
            <div className="main-color pt-3 ps-3">
              <img src={usdt} alt="usdt logo" style={{ width: "27px" }} />
            </div>
            <p className="main-color ps-3 pt-3 fw-bold">USDT</p>
          </div>

       
          <div
            className="d-flex main-color w-50 ms-2 rounded-3 shadow-lg"
            style={{ height: "55px" }} onClick={()=>handleNavigate("/other")}
          >
            <p className="ps-3 pt-3 fw-bold main-color">OTHER</p>
            <i
              id="envelope2"
              className="fa fa-circle fa-fw opacity-50 text-warning ms-auto me-3 main-color"
            ></i>
          </div>
        
        </div> */}
           <div className="d-flex">
            <i className="fa fa-exclamation-triangle fa-fw fa-lg opacity-50 text-warning pt-3"></i>
            <p className="text-warning ms-2 pt-1">
              The minimum withdrawal amount is <span className="text-warning " translate="no">{!Array.isArray(activities_g) && activities_g.init_currency && activities_g.wallet ? activities_g.init_currency.code + " " + activities_g.wallet.settings.minimum_withdraw.toFixed(2) : ""}
              </span>
            </p>
          </div>

        <div className="">
          <p className="fw-bold opacity-75">Your wallet address</p>
          <input
            className="form-control pb-5 form-username main-color p-3 opacity-75"
            type="text"
            placeholder="Enter your wallet address"
            name="address"
            onChange={(e) =>
              setValues({ ...values, address: e.target.value })
            }
          />
        </div>

        <div className="mt-4">
          <p className="fw-bold opacity-75">Amount</p>
          <div className="d-flex">
            <input
              className="form-control form-username main-color p-3 opacity-75"
              type="number"
              placeholder="Enter Amount"
              value={values.amount}
              name="amount"
              onChange={(e) => setValues({ ...values, amount: e.target.value })}
            />
            <button onClick={handleAllClick} className="position-absolute bg-primary p-2 rounded-3 fw-bold all-btn s-screen">
              ALL
            </button>
          </div>
          <div className="mt-3 d-flex">
            <p className="opacity-50 fw-bold pe-2">Balance</p>
            <div className="d-flex">
              {/* <div>
                <img src={usdt} style={{ width: "20px" }} />
              </div> */}

              {!Array.isArray(activities_g) && activities_g.init_currency && activities_g.wallet ? (
                <p className="ps-1 opacity-50 fw-bold amount1">
                  {activities_g.init_currency.code} {activities_g.wallet.bal_info.bal.toFixed(2)}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className=" mt-2 mb-2 d-flex">
            <div>
            <i
              id="key"
              className="fa fa-key fa-fw fa-lg opacity-50 position-absolute"
            ></i>
            <input
              className="form-control w-100  form-password g-sub-color position-relatives"
              type={"text"}
              //type="password"
              placeholder="Enter OTP Code"
              name="withdrawal_code"
              required
              onChange={(e) => setValues({ ...values, withdrawal_code: e.target.value })}
            />
           

            </div>

            {codeLoading ? (
           <button  className="ms-3 btn btn-primary w-50 fw-bold disabled opacity-50 text-warning">Loading...</button>
          ) : (
            <button onClick={handleGetCode} className="ms-3 btn btn-primary w-50 ">Get Code</button>
          )}
      

            
          </div> 
         


          
          {errorWithdraw ? (
              <p className="alert alert-danger">
                {errorWithdraw}
              </p>
            ) : (
              ""
            )}
          {isLoading ? (
            <button className="btn btn-primary w-100 p-3 fw-bold disabled opacity-50 text-warning">
              Loading...
            </button>
          ) : (
            <button
              id="withdraw_id"
              onClick={handleSubmitWitdrawal}
              className={!Array.isArray(activities_g) &&
                Number(Math.floor(values.amount)) >= Number(Math.floor(activities_g.wallet.settings.minimum_withdraw))  && values.address.length > 10 && Number(Math.floor(activities_g.wallet.bal_info.bal)) >= Number(Math.floor(activities_g.wallet.settings.minimum_withdraw)) && values.withdrawal_code
                  ? "btn btn-primary w-100 p-3 fw-bold "
                  : "btn btn-primary w-100 p-3 fw-bold disabled opacity-50 "
              }
            >
              Withdraw
            </button>
          )}
          {/* <button className="btn btn-primary w-100 p-3 fw-bold ">{isLoading?"Loading..."Withdraw}</button> */}
          
          {!Array.isArray(activities_g) && activities_g.init_currency && activities_g.wallet ? (
           
          <p className="opacity-50">Transaction fee: %{activities_g.wallet.settings.withdrawal_fee} </p>
              ) : (
                ""
              )}
      

        </div>
      </div>

      {/* {!activities_g.profile ? (
        <div>
          {isOpen ? (
            <div>
              <div className="modal-overlay">
                <Pin
                  handleCloseModal={handleCloseModal}
                  isLoadingPin={isLoadingPin}
                  error={error}
                  success={success}
                  isOpen1={isOpen1}
                  pin={pin}
                  setIsOpen1={setIsOpen1}
                  setIsOpen={setIsOpen}
                  // betBtn={betBtn}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )} */}

      
      {/* {isOpen ? (
            <div>
               
                <div className="modal-overlay">
                <Pin
                  handleCloseModal={handleCloseModal}
                  // error={error}
                  // isOpen={isOpen}
                  // setIsOpen={setIsOpen}
                  // betBtn={betBtn}
                />
              </div>
    
            </div>
          ) : (
            ""
          )} */}

      {/* {isOpen ? (
            <div>
              {error ? (
                <div className="modal-overlay-error">
                  <ErrorCard
                    handleCloseModal={handleCloseModal}
                    error={error}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    betBtn={betBtn}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )} */}
    </div>
}
{isLocal && <LocalWithdrawal setWithdrawSuccessMsg={setWithdrawSuccessMsg} setAmountWithdraw={setAmountWithdraw} setIsOpen3={setIsOpen3} setActivities_g={setActivities_g} activities_g={activities_g}/> }

{isOpen3 ? (<div className="modal-overlay">
        <WithdrawSuccess
        amountWithdrawn={amountWithdrawn}
        setIsOpen3={setIsOpen3}
        withdrawnSuccessMsg={withdrawnSuccessMsg}
        activities_g={activities_g}
        />
      </div>) : ""}

      {loadings && <Loader/>}

    </>
  );
};

export default Withdrawal;
