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
import UsdCard from "./usd_card";
import { FALSE } from "sass";
import { use } from "react";
import Loader from "../loader/loader";
import ArrowNav from "../arrowNav/ArrowNav";

const Deposit = () => {
  const {
    setActiveToken,
    activities_g,
    setActivities_g,
    result,
    setResult,
    getUserData,
    hasRunRetrieve,
    telegram,
  } = useContext(DataContext);
  // console.log(activities_g);
  const navigate = useNavigate();
  const token = Cookies.get("auth-token");
  const [message, setMessage] = useState();
  const [reloadTriggered, setReloadTriggered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState();
  const [isOther, setIsOther] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usdCard, setUsdCard] = useState(false);
  const [uploadHash, setUploadHash] = useState(false);
  const [localCard, setLocalCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLocalAcc, setIsLocalAcc] = useState(false);
  const [awaiting, setAwaiting] = useState(false);
  const [fileUrl, setFileUrl] = useState("");


  //console.log(activities_g);

  //console.log("My deposit is running...");

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
      //getUserData();
    }
  }, []);

  const navigatePage = () => (
    <div>
      <Other />
    </div>
  );

  // const checkPayaddress = () => {
  //   // const token1 = token["auth-token"];
  //   //console.log(typeof activities_g.wallet.pay_address);
  //   // setTimeout(() => {
  //   //  console.log(activities_g);
  //   if (!Array.isArray(activities_g) && !activities_g.wallet.pay_address) {
  //     setIsOpen(false);
  //     //  console.log("loading... Not object");
  //     //setReloadTriggered(true);
  //     API.retrieveData(token)
  //       .then((result) => {
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
  //   } else {
  //     // console.log("Pay address is found in useContext result");
  //   }
  //   // }, 1000);
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

  // const renderSelectedPage = () => {
  //   switch (selectedPage) {
  //     case "idn":
  //       return (
  //         <Other
  //           setIsOther={setIsOther}
  //           account_number="2740409266"
  //           account_name="MUDASIR"
  //           bank_name="BCA"
  //           telegram={ <div className=" moving-text-container" > <div className="moving-text">
  //             <a
  //               href="https://t.me/EEF_OFFICIAL_INDONESIA"
  //               className="fw-bold fs-3 text-success text-decoration-none"
  //             >
  //               Click Here{" "}
  //             </a>{" "}
  //             to join Indonesia Official Telegroup Group Page.
  //           </div></div>   }
  //         />
  //       );
  //     case "CIV":
  //       return (
  //         <Other
  //           setIsOther={setIsOther}
  //           account_number="*************"
  //           account_name="************"
  //           bank_name="**************"
  //           style="disabled"
  //         />
  //       );
  //     // case 'page3':
  //     //   return <Page3 />;
  //     default:
  //       return null;
  //   }
  // };

  const [depositAmount, setDepositAmount] = useState("");
  const handleSubmitDeposit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!token) {
      Cookies.remove("auth-token");
      navigate("/login");
    }

    API.sendRequest({ action: "create_deposit", amount: depositAmount }, token)
      .then((result) => {
        setIsOpen(false);
        setIsLoading(false);
        setActivities_g(result.activities);
        const fields = result.activities.deposit_dir.awaiting_deposit[0].fields;

        const local = result.activities.deposit_dir

        if (local.local_address) {
          //console.log("Local found, true");

          setIsLocalAcc(true);
        } else {
          //console.log("Local not found, false");
          setIsLocalAcc(false)
        }

        if (fields.method == "USD") {
          setUsdCard(true);
          setIsOpen(false);
          setUploadHash(false);
          const extraField = JSON.parse(fields.extraField);

          if (extraField.upload_hash_id) {
            setUploadHash(true);
          }
        } else {
          setLocalCard(true);
        }

        //console.log({ result });
      })
      .catch((err) => console.log(err));
  };

  const retrieveDepositInfo = () => {
    setUploadHash(false);
    setLoading(true);
    if (!token) {
      Cookies.remove("auth-token");
      navigate("/login");
    } else {
      if (Object.hasOwn(activities_g, "deposit_dir")) {
        setLoading(false);
       // console.log({ activities_g });
       // console.log("Running at this point");



        if (activities_g.deposit_dir) {
       //   console.log("Loading check....");
          const deposit = activities_g.deposit_dir.awaiting_deposit;
          const local = activities_g.deposit_dir

          if (local.local_address) {
        //    console.log("Local found, true");
            setIsLocalAcc(true);
          } else {
        //    console.log("Local not found, false");
            setIsLocalAcc(false)
          };
          if (Array.isArray(deposit)) {

            if (deposit[0].fields.generator === "awaiting_deposit_confirmation") {
           //   console.log("Awaiting is found");

              setAwaiting(true);
              setFileUrl(deposit[0].fields.file_url);
            } else {
           //   console.log("Awaiting is found");
              setAwaiting(false);
            }
          }



          if (deposit === null) {
            setIsOpen(true);
            setUsdCard(false);
            setLocalCard(false);
          } else if (deposit[0].fields.method == "USD") {
            // console.log("Method is USD");

            //TO BE MODIFIED......
            setUsdCard(true);
            setIsOpen(false);
            setLocalCard(false);

            const extraField = JSON.parse(deposit[0].fields.extraField);

            if (extraField.upload_hash_id) {
              setUploadHash(true);
            }
          } else {
            setLocalCard(true);
            setIsOpen(false);
            setUsdCard(false);
          }


        } else {
         // console.log("Awaiting_deposit not found");
        }
       // console.log("We have a deposit dir");
      } else {
      //  console.log("No Deposit_dir");
        setIsOpen(false);
        setUploadHash(false);
        API.retrieveDeposit(token)
          .then((result) => {
            setLoading(false);
            // console.log(result);
            // console.log("Server Response");
            if(result.detail === "Invalid token.") {
                Cookies.remove("auth-token");
               navigate("/login");
               return;
            } 

            
            //setActivities_g(result.activities);
            // {
            //   bal_info: {
            //     bal: result.activities.wallet.bal_info.bal
            //   }

            // }
            setActivities_g((prev) => ({
              ...prev,
              wallet: result.activities.wallet,
              deposit_dir: result.activities.deposit_dir,
              init_currency: result.activities.init_currency,
            }));

            if (result.activities.deposit_dir) {
              //console.log("Loading check....");

              const deposit = result.activities.deposit_dir.awaiting_deposit;
              const local = result.activities.deposit_dir


              if (local.local_address) {
               // console.log("Local found, true");

                setIsLocalAcc(true);
              } else {
                //console.log("Local not found, false");
                setIsLocalAcc(false)
              }

              if (Array.isArray(deposit)) {
                if (deposit[0].fields.generator === "awaiting_deposit_confirmation") {
                 // console.log("Awaiting is found", deposit[0].generator);
                  setAwaiting(true);
                  setFileUrl(deposit[0].fields.file_url);
                } else {
                  //console.log("Awaiting is not found", deposit[0].generator);
                  setAwaiting(false);
                }

              }


              if (deposit == null) {
                //console.log("It's running to this point");

                setIsOpen(true);
                setUsdCard(false);
                setLocalCard(false);
              } else if (deposit[0].fields.method == "USD") {
                //console.log("Method is USD");

                //TO BE MODIFIED......
                setUsdCard(true);
                setIsOpen(false);
                setLocalCard(false);

                const extraField = JSON.parse(deposit[0].fields.extraField);

                if (extraField.upload_hash_id) {
                  setUploadHash(true);
                }
              } else {
                setLocalCard(true);
                setIsOpen(false);
                setUsdCard(false);
              }


            } else {
             // console.log("Awaiting_deposit not found");
            }

            // setIsOpen(false);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    retrieveDepositInfo();
  }, []);
  return (
    <>
      <div>
      <div className="pt-4">
        <div className="fixed-top ">
          <ArrowNav name="Deposit" bg="main-color" />

          <div className="blur d-flex justify-content-center align-items-center " >
            <p translate="no" className="text-center text-success pt-3  fw-bold ">Total Deposit:  {!Array.isArray(activities_g) && activities_g.wallet.history
              ? activities_g.init_currency.symbol +
              activities_g.wallet.history.deposit
              : ""}
            </p>

          </div>

        </div>
              <br/>
      </div>
        {/* <div className="container d-flex pt-3">
          <div onClick={goBack}>
            <img src={Arrow} alt="arrow-back" className="nav-arrow" />
          </div>
          <h3 className="text-center w-100">Deposit</h3>


        </div> */}

        <p translate="no" className="text-center w-100 text-success fw-bold ">Total Deposit:  {!Array.isArray(activities_g) && activities_g.wallet.history
          ? activities_g.init_currency.symbol +
          activities_g.wallet.history.deposit
          : ""}</p>
      </div>


      {usdCard && (
        <UsdCard
          uploadHash={uploadHash}
          setUploadHash={setUploadHash}
          localCard={localCard}
          activities_g={activities_g}
        />
      )}

      {localCard && <div><Other activities_g={activities_g} isLocalAcc={isLocalAcc} setActivities_g={setActivities_g} awaiting={awaiting} setAwaiting={setAwaiting} fileUrl={fileUrl} setFileUrl={setFileUrl} /></div>}
      {isOpen && (
        <div className="container">


          <div className="mt-4">
            {isOpen && (
              <div className="">
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

            <select
              className="d-flex main-color w-50 ms-2 rounded-3 shadow-lg"
              style={{ height: "55px" }}
              // onChange={handleSelectChange}
            >
              <option value=""> Others</option>
              
            </select>
          </div> */}

                <div className="moving-text-container mt-2"></div>

                <div className="mt-4">
                  <p className="fw-bold">Create Deposit</p>
                  {/* <p className="text-justify opacity-50">
              This address accepts only TRC20 network, transferring here any
              other coin will result to fund loss. Copy token address here:
            </p> */}
                </div>

                {/* {message ? (
            <p className="alert alert-success text-uppercase f-italic">
              {message}
            </p>
          ) : (
            ""
          )} */}
                {/* <div
            className="d-flex main-color rounded-3 shadow-lg"
            style={{ height: "55px" }}
          >
            {!Array.isArray(activities_g) && isOpen ? (
              <p className="ps-3 pt-3 main-color">
                {activities_g.wallet.pay_address}
              </p>
            ) : (
              <p className="ps-3 pt-3 main-color text-warning">Loading...</p>
            )}

            <i
              onClick={() => handleCopy(activities_g.wallet.pay_address)}
              id="envelope"
              className="fa fa-copy fa-fw fa-lg opacity-50 ms-auto me-3 mt-4"
            ></i>
          </div> */}

                {/* <div className="d-flex justify-content-center w-100 mt-3">
            <QRCodeGenerator
              text={
                !Array.isArray(activities_g)
                  ? activities_g.wallet.pay_address
                  : ""
              }
            />
          </div> */}

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
                  <p className="main-color pt-3 w-100 text-center text-warning s-text-size">
                    The minimum deposit amount is{" "}
                    {!Array.isArray(activities_g)
                      ? <span translate="no" className="text-warning s-text-size "> {activities_g.init_currency.symbol} {activities_g.wallet.settings.minimum_deposit} </span>
                      : ""}
                    .
                  </p>
                </div>
                <br />
                <input
                  className="form-control form-username main-color p-3 opacity-75"
                  type="number"
                  placeholder="Enter the deposit amount"
                  name="amount"
                  onChange={(e) => {
                    setDepositAmount(e.target.value);
                  }}
                />
                <br />

                {isLoading ? (
                  <button className="btn btn-primary w-100 p-3 fw-bold disabled opacity-50 text-warning">
                    Loading...
                  </button>
                ) : (
                  <button
                    id="withdraw_id"
                    onClick={handleSubmitDeposit}
                    className={
                      Number(depositAmount) >=
                        Number(
                          !Array.isArray(activities_g)
                            ? activities_g.wallet.settings.minimum_deposit
                            : ""
                        )
                        ? "btn btn-primary w-100 p-3 fw-bold "
                        : "btn btn-primary w-100 p-3 fw-bold disabled opacity-50 "
                    }
                  >
                    Deposit
                  </button>
                )}

                <div className="mt-4 d-none">
                  <div className="opacity-50 pe-2 text-justify fst-italic bg-transparent">
                    <span className="text-warning ">NOTE:</span>
                    <ol>
                      <li className="pb-2 pt-1">
                        {" "}
                        <small>
                          {" "}
                          Please do not deposit any assets other than TRC20-USDT
                          to the above address, as the assets will be
                          irretrievable. The minimum recharge amount is 10 USDT,
                          and recharges below the minimum amount will not be
                          credited and cannot be refunded.
                        </small>
                      </li>
                      <li className="pb-2 ">
                        <small>
                          Your recharge address will change frequently after a
                          success transaction and cannot be reused for deposits.
                          In case of any changes, we will notify you through
                          website announcements or emails. Please ensure the
                          security of your computer and browser to prevent
                          information tampering and leakage.
                        </small>
                      </li>
                      <li>
                        {" "}
                        <small>
                          After you deposit to the above address, it requires
                          confirmation from the entire network nodes. The funds
                          will be credited after 1 network confirmation, and you
                          can withdraw them after 1 network confirmation tips
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
              </div>
            )}
          </div>
        </div>
      )}

      {loading && <Loader />}
    </>
  );
};

export default Deposit;


