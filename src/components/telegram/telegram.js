import React, { useContext } from 'react';
import { DataContext } from "../APIs/Api"; 
// style={{marginTop:"-130px", marginLeft:"350px"}}
function Telegram({result, handleCancel}) {
  console.log({result});
  
  return (
    <>
    {/* <i onClick={handleCancel} className="fa fa-close fa-fw fa-lg fw-bold opacity-50 position-absolute  text-danger" style={{marginTop:"-170px", marginLeft:"180px"}} ></i> */}
    <div className="error-div-1 container">
      <div className='d-flex w-100'>
          <div></div>
          <div className='ms-auto'> <i onClick={handleCancel} className="fa fa-close fa-fw fa-lg fw-bold opacity-50 position-absolute  text-danger  "  ></i></div>
      </div>
     
      <div className="bg-transparent text-center  fw-bold"> Click below to join our telegram channel for latest updates.</div>
      
      <div className="bg-transparent d-flex  mt-4">
        {/* <button
         
          className="btn btn-success w-25 error-button bg-transparent me-auto "
        >
          Ok
        </button> */}

        <a
    
          className="btn btn-success error-button bg-transparent w-100 text-success"  href={result&&result.contact?result.contact.social.telegram:''}
        >
          Join now
        </a>
  
        {/* <button className="btn btn-danger error-button bg-transparent w-100 text-danger">Close</button> */}
      </div>
    </div>

    {/* <div>
        <p  className="text-center rounded-circle pt-2 fs-4" style={{height:"50px", width:"50px", margin:"7px auto"}} >X</p>
        </div> */}


    
    </>

    
  )
}

export default Telegram