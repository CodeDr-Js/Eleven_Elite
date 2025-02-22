import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import AntiScore from "./components/Home/anti-scores/AntiScore";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import { useContext, useEffect, useState } from "react";
import LogoLoader from "./components/loaderPage";
import Odd from "./components/Home/anti-scores/odd";
import ApiCall from "./components/APIs/ApiCall";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import ComfirmPassword from "./components/forgetPassword/ConfirmPassword";
import History from "./components/history/history";
import Deposit from "./components/deposit/Deposit";
import Withdraw from "./components/witdrawal/Withdrawal";
import Transaction from "./components/transaction/Transaction";
import Profile from "./components/profile/Profile";
import Notice from "./components/notification/notification";
import Promotion from "./components/promotion/Promotion";
import Pending from "./components/pending/pending";
import Invite from "./components/invite-reward/invite";
import Loader from "./components/loader/loader";
import Reward from "./components/reward/reward";
import About from "./components/about/About";
import "./components/Home/main/googletranslator.css";
import DisableCopyComponent from "./disableCopy";
import Other from "./components/deposit/Other";
import LocalWithdrawal from "./components/witdrawal/LocalWithdrawal";
import { DataContext } from "./components/APIs/Api";
import Blocked from "./components/blocked/blocked";
import Cookies from "js-cookie";
import Task from "./components/task/task";

import NewLogin from "./components/new-login/login";
import NewRegister from "./components/new-login/regsister";
import Banking from "./components/banking-agent/banking";











// const googleTranslateElementInit = () => {
//   new window.google.translate.TranslateElement(
//     {
//       pageLanguage: "en",
//       layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
//       autoDisplay: true
//     },
//     "google_translate_element"
//   );
// };


export default function App() {
  const navigate = useNavigate();
  
//   const { activities_g } =
//   useContext(DataContext);
// const token = Cookies.get("auth-token");
const [blocked, setBlocked] = useState(true);
//const [blocked, setBlocked] = useState(false);


//console.log("App started");

  const [loading, setLoading] = useState(true);

  // useEffect(()=> {
  //   if(token){
  //     if(!Array.isArray(activities_g)){
  //       if(activities_g.blocked){
  //         setBlocked(true);
  //       }
  //     }
  //   } else {
  //     navigate("/login")
  //   }
  // },[activities_g])


  // Simulating data fetching/loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Once data is fetched, set loading to false
    }, 3000); // Simulating a 3-second delay

    // if(!window.googleTranslateElementInit) {

    //   var addScript = document.createElement("script");
    //   var languageSelector=document.createElement('div')
    //   languageSelector.id='google_translate_element'
    //   // <div id="google_translate_element"></div>
    //   addScript.setAttribute(
    //     "src",
    //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    //   );
     
    //   window.googleTranslateElementInit = googleTranslateElementInit;
    //   try {
    //     document.body.appendChild(addScript);
    //     // setTimeout(() => {
    //     //   //document.body.appendChild(languageSelector);
          
    //     // }, 5000);
        
    //   } catch (error) {console.log(error);
        
    //   }
    // }
  }, []);

  // setTimeout(() => {
  //   if(!window.googleTranslateElementInit) {

  //     var addScript = document.createElement("script");
  //     var languageSelector=document.createElement('div')
  //     languageSelector.id='google_translate_element'
  //     // <div id="google_translate_element"></div>
  //     addScript.setAttribute(
  //       "src",
  //       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //     );
     
  //     window.googleTranslateElementInit = googleTranslateElementInit;
  //     try {
  //       document.body.appendChild(addScript);
  //       // setTimeout(() => {
  //       //   //document.body.appendChild(languageSelector);
  //         // 
  //       // }, 5000);
        
  //     } catch (error) {console.log(error);
        
  //     }
  //   }
  // }, 10000);

  return (
    <>
    {/* <DisableCopyComponent/> */}
      {loading ? (
        <LogoLoader />
      ) : (
        <>
        {/* {blocked && <div className="modal-overlay-profile" style={{"zIndex": 9999}}><Blocked/></div> } */}
          <Routes>
            <Route path="login" element={<NewLogin/>}/>
            <Route path="register" element={<NewRegister/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/banking/agent" element={<Banking />} />
            <Route path="anti-score" element={<AntiScore />} />
            {/* <Route path="login" element={<Login />} /> */}
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="history" element={<History />} />
            <Route path="odd/:id" element={<Odd />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notification" element={<Notice />} />
            <Route path="promotion" element={<Promotion />} />
            <Route path="pending" element={<Pending />} />
            <Route path="invite" element={<Invite />} />
            <Route path="loader" element={<Loader />} />
            <Route path="reward" element={<Reward />} />
            <Route path="about" element={<About />} />
            <Route path="other" element={<LocalWithdrawal />} />
            {/* <Route path="deposit/other_payment" element={<Other />} /> */}
            {/* <Route path="api-call" element={<ApiCall />} /> */}

            {/* <Route path="admin/addtask/:id" element={<AddTask />} /> */}
          </Routes>
        </>
      )}
    </>
  );
}
