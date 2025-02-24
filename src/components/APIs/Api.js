// DataContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Worker from 'web-worker';

import {
  retriveData,
  IDBConfig,
  saveStoreObj, // Import the new function
} from "./index_db";

//import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import { API } from "../api-service/api-service";
import { useNavigate } from "react-router-dom";
import { getRealTimeDate, range } from "../qickfun/qickfun";
let client_timezone, client_date_str




const DataContext = createContext();
const DataProvider = ({ children }) => {
  const navigate = useNavigate();
  //const [token,setToken, removeToken] = useCookies(["auth-token"]);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [checkData, setCheckData] = useState();
  const [page, setPage] = useState(1);
  const [activities_g, setActivities_g] = useState([]);
  const [openBet_g, setOpenBet_g] = useState([]);
  const [settled_g, setSettled_g] = useState
  ([]);
  const [user_g, setUser_g] = useState([]);
  const [activeToken, setActiveToken] = useState("");
  const [result, setResult] = useState([]);
  const [notification, setNotification] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [invite , setInvite] = useState(null);
  const [pending, setPending] = useState(null);
  const [loadingNew, setLoadingNew] = useState();
  const [hasRunRetrieve, setHasRunRetrieve] = useState(false);
  const [hasRunDB,  setHasRunDB] = useState(false);
  const [settled, setSettled] = useState({});
  const [openBet, setOpenBet] = useState({});
  const [banking, setBanking] = useState(null);

  const [SiteActivitiesData, setSiteActivitiesData] = useState([]);
  const [matchData, setmatchData] = useState(null);
  const [depositDir, setdepositDir] = useState(null);

 //console.log("all results is:", result);
  
  const token1 = Cookies.get("auth-token");
  
  const checkToken = () => {
    // const token1 = token["auth-token"];
    if (token1 ) {
      //console.log("token", token1);
      setActiveToken(token1)
    } else {
      //setActiveToken("");
    }

  }


  useEffect(()=> {
    checkToken();
  }, [token1])
  

  function addHours(date,hours,action = "add") { if (action === 'remove') { date.setHours(date.getHours() - hours); } else { date.setHours(date.getHours() + hours); }; return date; }


  //Loading new uncommented
  useEffect(()=> {
    // console.log("LoadingNew:",loadingNew);
    if(loadingNew){
     
    }
    //dbFetch(true);
  }, [])

  const dbFetch = (req_date= new Date().toJSON()) => {
    API.fetchFixtures({req_date,hasRunRetrieve},Cookies.get("auth-token") )
        .then((result) => {
          if(result.success || result.message === "success") {

            if(!hasRunRetrieve){
              setResult(result);           
              setActivities_g(result.activities);
              setUser_g(result.user);
              // setSettled_g(result.activities.betdir.settled);
              // setOpenBet_g(result.activities.betdir.openbet);
              // setSiteActivitiesData(result.latest_transactions)
              // setHasRunRetrieve(true)         
            }
            setmatchData(result.matches)
          } else if(result.detail) {
            navigate("/login")
            setActiveToken("");
            Cookies.remove("auth-token");
          }
        })
  }

  

  async function getUserData() {
    const token = Cookies.get("auth-token") 
   
    //console.log("Token sending....", activeToken);
   
    if (activeToken||token) {
      //console.log("token", activeToken);
      API.retrieveData(activeToken || token).then((result) => {
        // console.log("Running API retrieve always",result);
        if(result.success || result.message === "success") {
          setResult(result);           
          setActivities_g(result.activities);
          setUser_g(result.user);
          setSettled_g(result.activities.betdir.settled);
          setOpenBet_g(result.activities.betdir.openbet);
          setSiteActivitiesData(result.latest_transactions)
          setHasRunRetrieve(true)
        } else if(result.detail) {
          //console.log("removing token");
          navigate("/login")
          setActiveToken("");
          Cookies.remove("auth-token");
          // removeToken("auth-token");
          //console.log("It has removed the token and the token is :",token["auth-token"]);;

        }
       
      }).catch((err)=> console.log(err))
    } else {
      //console.log("Token not found");
      //removeToken('auth-token');
      setActiveToken("");
      setActivities_g([]);
      setUser_g([]);
      setResult([]);
    }
  }

  return (
    <DataContext.Provider
      value={{ data, allData, activeToken, activities_g, setActivities_g, user_g, setUser_g, openBet_g, setOpenBet_g, settled_g, setSettled_g, setActiveToken, result, setResult, notification, setNotification, promotion, setPromotion , pending, setPending , invite, setInvite, checkData, setCheckData, loadingNew, setLoadingNew, getUserData, hasRunRetrieve, setHasRunRetrieve, hasRunDB,  setHasRunDB, dbFetch,settled, setSettled, openBet, setOpenBet, banking, setBanking, SiteActivitiesData, matchData,setmatchData,
          depositDir, setdepositDir,
       }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

