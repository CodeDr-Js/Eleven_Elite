import React, { useState, useContext, useEffect } from "react";
import HistoryHeader from "./historyHeader";
import { API } from "../api-service/api-service";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SettledNav from "./settledNav";
import { DataContext } from "../APIs/Api";

const History = () => {
  const navigate = useNavigate();
  const { setActivities_g, activities_g, setActiveToken, settled, setSettled, openBet, setOpenBet } =
    useContext(DataContext);
  const token = Cookies.get("auth-token");
  const [activities, setActivities] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  console.log({ activities_g });
  function getUserData() {
    if (token) {
      //   console.log("token", token1);
      setActiveToken(token);
      if (Object.hasOwn(activities_g, "betdir")) {
        setLoading(false);

        setSettled(activities_g.betdir.settled);
        setOpenBet(activities_g.betdir.openbet);
        

      } else {
    
        API.retrieveHistory(token)
        .then((result) => {
          //console.log({ result }, "running...");
          setLoading(false);
          
          if (result.success) {
            setActivities(result.activities);
            setActivities_g(result.activities);
            setSettled(result.activities.betdir.settled);
            setOpenBet(result.activities.betdir.openbet);
            setUser(result.user);
          } else if (!result.success) {
            // removeToken("auth-token");
            Cookies.remove("auth-token");
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
      }

     
    } else {
      setActiveToken("");
      setActivities([]);
      setUser([]);
      navigate("/login");
    }
  }

  useEffect(() => {
    // if(!activities_g.betdir){
    //   console.log("No Betdir ....");

    //   getUserData();

    // } else {
    //   setLoading(false);
    // }
    getUserData();
  }, []);

  // console.log(activities.wallet.bal_info.bal);

  return (
    <div className="container">
      <HistoryHeader
        loading={loading}
        openBet={openBet}
        settled={settled}
        setOpenBet={setOpenBet}
        setSettled={setSettled}
        setActivities={setActivities}
        activities={activities}
        setActivities_g={setActivities_g}
      />
    </div>
  );
};

export default History;
