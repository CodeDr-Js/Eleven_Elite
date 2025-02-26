import React, { useContext, useEffect, useState } from 'react';
import "./index.css";
import "../color/color.css";
import { API } from '../api-service/api-service';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { addHours, formatDate, handleCopy, numberWithCommas, timeAgo } from '../qickfun/qickfun';
import { dir } from '../search_dir/search_dir';
import { DataContext } from '../APIs/Api';
import ArrowNav from '../arrowNav/ArrowNav';
import Loader from '../loader/loader';
import NoData from '../noData/noData';




const Banking = () => {
  const { banking, setBanking } = useContext(DataContext);
  const navigate = useNavigate();
  const token = Cookies.get("auth-token");
  const [isLoading, setIsLoading] = useState({
    loading: false,
    index: ""
  });

  const [loading, setLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);


  const [receipt, setReceipt] = useState({
    loading: false,
    index: ""
  });

 // const [isPDF, setIsPDF] = useState(false);


  useEffect(() => {

    if (!token) {
      navigate("/login");

    } else {

    }
  }, [token]);



  //Using the dir and gettin user invited code
  const bankingParams = dir("data");
  //console.log({ banking });


  useEffect(() => {
    if (!token) {
      Cookies.remove("auth-token");
      navigate("/login");
    } else {
      if (banking !== null) {

      } else {

        API.bankingAgent(`?data=${bankingParams}`, token)
          .then((result) => {
           console.log(result);
            if (result.success) {
              setBanking(result)
            } else if(result.detail === "Invalid token.") {
              Cookies.remove("auth-token");
              navigate("/login");
            }

            //console.log(result);
          })
          .catch(err => console.log("Error", err))
      }
    }


  }, [banking])

  const handleBanking = (i) => {

    setIsLoading({
      loading: !isLoading.loading,
      index: i
    })
  }
  const handleShowReceipt = (i) => {

    setReceipt({
      loading: !receipt.loading,
      index: i
    })
  }

  const handleAccept = (cardDiv, id) => {

    setLoading(true);
    
    const card = document.getElementById(cardDiv);
    const confirmation = window.confirm("Are you sure you want to CONFIRM payment?");

    
    if(confirmation) {
      API.submitBanking({ action: "success", id }, token)
      .then((result) => {
        setLoading(false);
      // console.log(result);
        if(result.success) {
          alert("Payment Confirmed Successfully!!!");

        setTimeout(() => {
          card.classList.add("d-none");
        }, 2000);

        card.classList.add("slide-up");

        }
        
        

      })
      .catch((err) => console.log(err)
      )
    }

    
  }

  const handleReject = (cardDiv, id) => {
    setLoadingReject(true);
    
    const card = document.getElementById(cardDiv);
    const confirmation = window.confirm("Are you sure you want to DECLINE payment?");

    if(confirmation) {
      API.submitBanking({ action: "declined", id }, token)
      .then((result) => {
        setLoadingReject(false);
       //console.log(result);
        if(result.success) {
          alert("Payment DECLINED Successfully!!!");

        setTimeout(() => {
          card.classList.add("d-none");
        }, 2000);

        card.classList.add("slide-up");

        }
        
        

      })
      .catch((err) => console.log(err)
      )
    }

  }

  // const handleCancel = async (startDate, ticket_id, matchCard) => {

  //   const matchCardDiv = document.getElementById(matchCard)
  //   const button = matchCardDiv.querySelector("button");
  //   const spinner = matchCardDiv.querySelector(".sweet-loading");

  //   //console.log(button, spinner);

  //   const confirmation = window.confirm("Are you sure you want to Cancel?");
  //   //setShowLoader(true);
  //   if (confirmation) {
  //     spinner.classList.remove("d-none");
  //     button.classList.add("d-none");

  //     API.cancelTicket({ startDate, ticket_id }, token)
  //       .then((result) => {
  //         spinner.cl
  //         spinner.classList.add("d-none");
  //         button.classList.remove("d-none");
  //         //console.log(result);
  //         if (result.success) {
  //           //console.log("Cancelled");
  //           //console.log(result);
  //           setActivities(result.activities);
  //           setActivities_g(result.activities);
  //           setSettled(result.activities.betdir.settled);
  //           setOpenBet(result.activities.betdir.openbet);

  //           // const mainCardDiv = document.getElementById(ticket_id);
  //           // mainCardDiv.classList.add("d-none");
  //         } else {
  //           setErrorCancel(result.message)
  //         }
  //       }).catch((err) => setErrorCancel(err));
  //   }



  // }

  function isPDF(filename) {
    return filename.toLowerCase().endsWith('.pdf');
}

  const transactionCard = banking !== null ? banking.type === "deposit" ? banking.transaction.map((item, index) => {
    //console.log({ item });
    let cardDiv = "card-div"+index;



    return (
      <div id={cardDiv}>

        <div className='container'>
          <div onClick={() => handleBanking(index)} className='transparent-color mt-4 p-3 rounded container'>

            <div>
              <p className='text-center fw-bold opacity-50' style={{ fontSize: "10px" }}>Transaction ID</p>

              <p className='text-center fw-bold line-h' >{item.fields.transactionID}</p>
            </div>

            <div>
              <p className='text-center fw-bold opacity-50' style={{ fontSize: "10px" }}>Username</p>

              <p className='text-center fw-bold line-h' >{item.fields.transactionID}</p>
            </div>


            <div>
              <p className='text-center fw-bold opacity-50 ' style={{ fontSize: "10px" }}>Amount</p>

              <h1 translate='no' className='text-center text-warning' style={{ lineHeight: "0" }}>{item.fields.currency} {numberWithCommas(Number(item.fields.amount).toFixed(2))}</h1>
            </div>

            <div className='d-flex w-100 mt-4'>
              <button className='btn secondary-color text-center ' style={{ paddingTop: "1px" }}>{isLoading.loading && isLoading.index === index ? "Hide" : "View"}</button>

              <div className=' ms-auto '>
                <p className='' style={{ fontStyle: "italic", fontFamily: "monospace", fontSize: "12px" }}>{timeAgo(new Date(item.fields.timestamp))}</p>
              </div>

            </div>

          </div>
          {isLoading.loading && isLoading.index === index ? <div className=' mt-3 p-3 rounded container w-100' style={{ backgroundColor: "#4A90A2" }}>
            <p className='text-center opacity-75' style={{ fontSize: "10px" }}>Transaction ID</p>
            <div className='line-h'>
              <p className='text-center text-wrap'>{item.fields.transactionID}</p>
            </div>


            <p className='text-center mt-4 opacity-75 ' style={{ fontSize: "10px" }}>Amount</p>
            <h3 translate='no' className='text-center line-h'>{item.fields.currency} {numberWithCommas(Number(item.fields.amount).toFixed(2))}</h3>




            <p className='text-center mt-4 opacity-75' style={{ fontSize: "10px" }}>Transaction Date</p>
            <p className='text-center line-h'>{formatDate(item.fields.timestamp)}</p>




            <div className='d-flex justify-content-center align-items-center mt-4'>
              <button onClick={() => handleShowReceipt(index)} className='btn secondary-color mb-4'>{receipt.loading && receipt.index === index ? "Hide Receipt" : "View Receipt"}</button>
            </div>
            {isPDF(item.fields.file_url) === true ?
              receipt.loading && receipt.index === index ? <div className='d-flex justify-content-center align-items-center mb-4'>
              <iframe
 src={item.fields.file_url} style={{ width: "300px" }} />
            </div> : ""
            : 
            receipt.loading && receipt.index === index ? <div className='d-flex justify-content-center align-items-center mb-4'>
              <img src={item.fields.file_url} style={{ width: "300px" }} />
            </div> : "" }



            <div className='d-flex justify-content-center align-items-center'>
              {loading ?    <button className='btn disabled btn-success text-warning me-3' style={{ width: "40%" }}>Loading...</button> :   <button onClick={()=> handleAccept(cardDiv, item.pk)} className='btn btn-success  me-3' style={{ width: "30%" }}>Accept</button> }
           
              {loadingReject ? <button  className='btn btn-danger text-warning disabled ' style={{ width: "40%" }}>Loading...</button> : <button onClick={()=> handleReject(cardDiv, item.pk)} className='btn btn-danger ' style={{ width: "30%" }}>Reject</button>}
              
            </div>

          </div>
            : ""}




        </div>

      </div>
    )
  }) : banking.type === "withdraw" ? banking.transaction.map((item, index) => {
    let cardDiv = "card-div"+index;
    const extraField = JSON.parse(item.fields.extraField);
    const amount = item.fields.amount;
    const currency= item.fields.currency;
    return (
      <div id={cardDiv}>

        <div className='container'>
          <div onClick={() => handleBanking(index)} className='transparent-color mt-4 p-3 rounded'>
            <p className='text-center fw-bold opacity-50 ' style={{ fontSize: "10px" }}>Amount</p>
            <h1 translate='no' className='text-center text-primary fw-bold line-h'>{currency} {numberWithCommas(Number(amount).toFixed(2))} </h1>
            <div className='d-flex w-100 mt-4'>
              <button className='btn btn-primary text-center ' style={{ paddingTop: "1px" }}>{isLoading.loading && isLoading.index === index ? "Hide" : "View"}</button>

              <div className=' ms-auto '>
                <p className='' style={{ fontStyle: "italic", fontFamily: "monospace", fontSize: "12px" }}>{timeAgo(new Date(item.fields.timestamp))}</p>
              </div>

            </div>
          </div>
          {isLoading.loading && isLoading.index === index ?
            <div className=' mt-3 p-3 rounded container w-100 gradient'>
              <p className='text-center fw-bold opacity-50 ' style={{ fontSize: "10px" }}>Account Name</p>
              <div className=''>
                <p className='text-center text-wrap line-h fw-bold'>{extraField.account_holder}</p>
              </div>



              <p className='text-center fw-bold opacity-50  mt-4' style={{ fontSize: "10px" }}>Account Number</p>

              <div className='d-flex justify-content-center align-items-center'>
                <p onClick={() => handleCopy(extraField.account_number, "Account number copied successfully!!!")} className='text-center line-h fw-bold'>{extraField.account_number}</p>

                <div className='ms-2'>
                  <i
                    onClick={() => handleCopy(extraField.account_number, "Account number copied successfully!!!")}
                    id=""
                    className="fa fa-copy fa-fw fa-lg opacity-50 position-absolute" style={{ marginTop: "-10px" }}

                  ></i>
                </div>
              </div>

              <p className='text-center fw-bold opacity-50 mt-2' style={{ fontSize: "10px" }}>Bank Name</p>
              <p className='text-center line-h fw-bold'>{extraField.bank.text}</p>

              <p className='text-center fw-bold opacity-50 mt-4' style={{ fontSize: "10px" }}>Amount</p>

              <div className='d-flex justify-content-center align-items-center'>
                <p onClick={() => handleCopy(Number(amount).toFixed(), "Amount copied successfully!!!")} className='text-center fw-bold line-h'>{currency} {numberWithCommas(Number(amount).toFixed(2))}</p>
                <div className='ms-2'>
                  <i
                    onClick={() => handleCopy(Number(amount).toFixed(), "Amount copied successfully!!!")}
                    id=""
                    className="fa fa-copy fa-fw fa-lg opacity-50 position-absolute" style={{ marginTop: "-10px" }}

                  ></i>
                </div>
              </div>


              <div className='d-flex justify-content-center align-items-center'>
              {loading ?    <button className='btn disabled btn-success text-warning me-3' style={{ width: "40%" }}>Loading...</button> :   <button onClick={()=> handleAccept(cardDiv, item.pk)} className='btn btn-success  me-3' style={{ width: "30%" }}>Accept</button> }
           
              {loadingReject ? <button  className='btn btn-danger text-warning disabled ' style={{ width: "40%" }}>Loading...</button> : <button onClick={()=> handleReject(cardDiv, item.pk)} className='btn btn-danger ' style={{ width: "30%" }}>Reject</button>}
              
            </div>

            </div>
            : ""}

        </div>
      </div>
    )
  }) : "" : ""


  // const transactionCard3 = () => {
  //   if(banking !== null) {
  //     if(banking.type === "deposit") {
  //       banking.transaction.map((item, index) => {
  //         console.log({item});

  //         return (
  //           <div>
  //                <div className='main-color p-3 text-center fw-bold'>Deposit</div>
  //                 <div className='container'>


  //       <div className='main-color mt-3 p-3 rounded container w-100'>
  //           <p className='text-center'>Transaction ID/Name</p>
  //           <div className=''>
  //           <p className='text-center text-wrap'>Transaction ID/NamejjDHHDJSHFHDJDJJDJDJFNKDFNKDFN</p>
  //           </div>


  //           <p className='text-center'>Amount</p>
  //           <h3 className='text-center'>$25,000</h3>

  //           <p className='text-center'>Transaction Status</p>
  //           <p className='text-center'>Pending</p>


  //           <p className='text-center'>Transaction Date</p>
  //           <p className='text-center'>24th Saturday Feb. 2025</p>





  //           <button className='btn secondary-color mb-4'>View Receipt</button>

  //           <div>
  //           <button className='btn btn-success  me-3'>Accept</button>
  //           <button className='btn btn-danger '>Reject</button>
  //           </div>

  //       </div>




  //       </div>
  //           </div>
  //         )
  //       })
  //     } else if (banking.type === "withdraw") {
  //       banking.transaction.map((item, index) => {
  //         return (
  //           <div>
  //             <div className='main-color p-3 text-center fw-bold'>Withdrawal</div>

  // <div className='container'>
  // <div className='transparent-color mt-4 p-3 rounded container'>
  //     <p className='text-center fw-bold'>Pending Withdrawal</p>
  //     <h1 className='text-center text-warning'>$23,000.00</h1>
  //     <button className='btn secondary-color text-center'>view</button>
  // </div>

  // <div className='main-color mt-3 p-3 rounded container w-100'>
  //     <p className='text-center'>Account Name</p>
  //     <div className=''>
  //     <p className='text-center text-wrap'>Transaction ID/NamejjDHHDJSHFHDJDJJDJDJFNKDFNKDFN</p>
  //     </div>

  //     <p className='text-center'>Account Number</p>
  //     <p className='text-center'>2599999000</p>

  //     <p className='text-center'>Bank Name</p>
  //     <p className='text-center'>Wam Bank</p>

  //     <p className='text-center'>Amount</p>
  //     <p className='text-center'>$25,000</p>

  //     <div>
  //     <button className='btn btn-success  me-3'>Accept</button>
  //     <button className='btn btn-danger '>Reject</button>
  //     </div>

  // </div>

  // </div>
  //           </div>
  //         )
  //       })
  //     }
  //   }

  // }


  return (
    <>
      <div className='fixed-top'>
        <div className='main-color pt-3 pb-2'>
        <h4 className='text-center'>
          {banking !== null ? banking.type === "deposit" ? "Pending Deposit" : "Pending Withdraw" : ""}
        </h4>

        </div>

        <div className="blur d-flex justify-content-center align-items-center " >
            <p translate="no" className="text-center text-success pt-3  fw-bold ">  
            {banking !== null ? banking.type === "deposit" ? `Total Amount Deposit: ${banking.method} ${numberWithCommas(Number(banking.total_amount).toFixed(2))}`  : `Total Amount Withdraw: ${banking.method} ${numberWithCommas(Number(banking.total_amount).toFixed(2))}` : ""}
            </p>

          </div>
      </div>

      <div className='' style={{ marginTop: "120px" }}>
        {/* <div  className='main-color mt-4'>jdffff</div> */}
        {transactionCard}


      </div>

      {banking === null ? <Loader/> : ""}
      {banking !== null && banking.transaction.length < 1 ? <NoData/> : ""}

    </>

  )
}

export default Banking
