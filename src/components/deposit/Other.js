import React, { useState } from "react";
import "./index.css";
import ArrowNav from "../arrowNav/ArrowNav";
import { API } from "../api-service/api-service";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Arrow from "../../assets/images/document-management-system-return-icon-48 - Copy copy.png";
import SwipeCard from "./swipeCard";

const Other = ({
  setIsOther,
  account_name,
  account_number,
  bank_name,
  style,
  telegram,
  activities_g,
  isLocalAcc,
  setActivities_g,
  setFileUrl,
  fileUrl,
  awaiting,
  setAwaiting
}) => {
  // console.log("Local", activities_g);
  // console.log(isLocalAcc);
  // console.log("Awaiting is:",awaiting);
  
  

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(false);
  const [transactionId, setTransactionId] = useState("");
 const [isReceipt, setIsReceipt] = useState(false);


 const handleShowReceipt = () => {
  setIsReceipt(!isReceipt);
 }


 function formatTimestamp(timestamp) {
  const [date, time] = timestamp.split("T");
  const formattedTime = time.split(".")[0]; // Remove milliseconds and 'Z'
  return `${date} ${formattedTime}`;
}




 
  const handleFileChange = (e) => {
    setFile(false);
    const selectedFile = e.target.files[0];

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (selectedFile && allowedTypes.includes(selectedFile.type)) {

      setFile(true);
      //console.log(selectedFile.type);
      //console.log("Selected",file);
      
    } else {
      alert("Only PDF, JPEG, JPG, and PNG files are allowed.");
      setFile(false);
     // console.log("Not selected",file);
    }
  };

  const handleUpload = async () => {

      var form = document.getElementById('sendersName');
      
      form.onsubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget;
        let url = `https://rrtfb-27538490c8d8.herokuapp.com/api/upload/`;
        console.log({url});
        
       if (!file) {
        setIsLoading(false);
       alert("Please select a valid file.");

       return;
      }

        try {
            const formData = new FormData(form);
            //console.log({formData});
            
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response=>response.json())
            .then(data=>{ 
              setIsLoading(false);
              console.log(data); 
              if(data.success&&data.deposit_dir.awaiting_deposit[0].fields.generator === "awaiting_deposit_confirmation") {
                setActivities_g((prev)=>({...prev, deposit_dir: data.deposit_dir}));

                setAwaiting(true);

                setFileUrl(data.deposit_dir.awaiting_deposit[0].fields.file_url);
              } else {
                setAwaiting(false);
              }
            
            })
            // console.log(response);
        } catch (error) {
            console.error(error);
        }

      

    // const formData = new FormData(document.getElementById('sendersName'));
    // // formData.append("file", file);
    
    // console.log("FormData", formData);
    
    // API.uploadForm({transaction_id: transactionId, data_id: activities_g.deposit_dir.awaiting_deposit[0].pk, myfile: file}, token )
    // .then((result)=> {
    //   console.log(result);
      
    // })
    // .catch((err)=>console.log(err)
    // )

  }

    // try {
    //   const response = await axios.post("http://localhost:5000/upload", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });

    //   alert("File uploaded successfully: " + response.data.fileName);
    // } catch (error) {
    //   console.error("Error uploading file", error);
    //   alert("Upload failed!");
    // }
  };

  const goBack = () => {
    window.history.back();
  };

  const [values, setValues] = useState({
    sender: "",
    amount: "",
    file_upload: "",
  });

  // console.log(values);

  const token = Cookies.get("auth-token");

  const close = () => {
    // window.history.back();
    setIsOther(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    API.local_payment(values, token).then((result) => {
     // console.log(result);
    });
  };

  return (
    <>
      <div className="container">
       
      {awaiting ?
        <div className="card-slide">
          <p className="opacity-50 p-3 text-center">Note: Local deposit confirmation takes up to 0-3 hours based on your bank network status. For help please contact  support.</p>
          <div className="w-100 bg-warning rounded-4 shadow-sm p-2 pt-4 pb-4 text-center ">
          <div class="spinner-border text-primary" role="status"></div>
            <h4 className="text-center fw-bold shadow-sm">Pending Transaction</h4>
            <small className="fw-bold">Amount</small>
            <p className="fw-bold text-primary fs-3 shadow-sm"> {!Array.isArray(activities_g) && activities_g.deposit_dir && activities_g.deposit_dir.awaiting_deposit !== null ? activities_g.deposit_dir.awaiting_deposit[0].fields.method + " " + Math.floor(activities_g.deposit_dir.awaiting_deposit[0].fields.amount) : ""}</p>

            <small className="fw-bold">Time</small>
            <p className="fw-bold text-primary fs-3 shadow-sm"> {!Array.isArray(activities_g) && activities_g.deposit_dir && activities_g.deposit_dir.awaiting_deposit !== null ? formatTimestamp(activities_g.deposit_dir.awaiting_deposit[0].fields.timestamp): ""}</p>
            <small className="fw-bold">Status</small>
            <p className="fw-bold text-warning fs-3 shadow-sm bg-dark p-2 rounded text-center  "> PENDING </p>
            
            <button onClick={handleShowReceipt} className="btn btn-primary w-100 p-2 fs-3 fw-bold">{isReceipt?"Hide Receipt":"View Receipt"}</button>
            {isReceipt && <div>
            <img src={fileUrl} className="rounded-3 mt-3 image-size"/>
            </div>}
            
           
          </div>
        </div> 
       
      :  
      <div className="mt-4 mb-5">
      <div className="">
        <div className="d-flex">
       
        </div>

        <div className="mt-4">
          <p className="fw-bold">Payment Guide</p>
          <ol className="text-justify opacity-50">
            <li>
              Copy any of the Bank details below to complete your
              transaction.
            </li>
            <br></br>
            <li>
              Submit your success payment proof and the transaction ID or
              sender's name for quick confirmation.{" "}
            </li>
          </ol>

          <h3 className="text-center">
            Copy account address here
          </h3>
        </div>
        {isLocalAcc && 
        <div >
          <SwipeCard activities_g={activities_g} isLocalAcc={isLocalAcc} />

          <div></div>

          <div className="moving-text-container mt-2"></div>

        

          <br />

          <div>
          <form id="sendersName"
            method="POST"
            enctype="multipart/form-data"
          >

            <input
              type="hidden"
              name="data_id"
              className="form-control form-username main-color p-3 opacity-75"
              value={activities_g.deposit_dir.awaiting_deposit[0].pk}
            />
            <input
              type="hidden"
              name="token"
              className="form-control form-username main-color p-3 opacity-75"
              value={token}
            />

            <textarea
              className="form-control form-username main-color p-3 opacity-75"
              placeholder="Enter sender's name /transaction ID"
              name="transaction_id"
              required
              onChange={(e)=>setTransactionId(e.target.value)}
            />
            <br />
            <small className="text-warning">
              Upload Receipt: pdf, jpg, jpeg, png
            </small>
            <input
              type="file"
              name="file"
              className="form-control form-username main-color p-3 opacity-75"
              placeholder="Upload Receipt"
              onChange={handleFileChange}
              required
            />
            <br />

            <div className="">
              {isLoading ? (
                <button className="btn btn-primary w-100 p-3 fw-bold disabled opacity-50 text-warning">
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  id="withdraw_id"
                  className={
                    10 > 2
                      ? "btn btn-primary w-100 p-3 fw-bold "
                      : "btn btn-primary w-100 p-3 fw-bold disabled opacity-50 "
                  }
                  onClick={handleUpload}
                >
                  Submit Transaction
                </button>
              )}
            </div>{" "}
            
            </form>

          </div>
          
        </div> }
        {!isLocalAcc && <div className="fs-3 text-center mt-5 pt-5"><p className="text-center mt-5 opacity-25 pt-2">No available account</p>
          <p className="text-center opacity-25 text-success fw-bold">Contact Support</p></div>}

        
      </div>
    </div>}
      </div>
      {/* <ArrowNav name="Others"/> */}
    </>
  );
};

export default Other;