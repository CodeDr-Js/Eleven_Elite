import React, { useContext, useEffect, useState } from "react";
import profile from "../../../assets/images/profile.png";
import { DataContext } from "../../APIs/Api";
import "./index.css";
import won from "../../../assets/home-icons/soccer.svg";
import withdraw from "../../../assets/home-icons/withdraw.svg";
import deposit from "../../../assets/home-icons/deposit.svg";
import NoData from "../../noData/noData";

export const SiteActivities = () => {
  const { result,
    getUserData,
    hasRunRetrieve,SiteActivitiesData } = useContext(DataContext);

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(0);
  const [animations, setAnimations] = useState([]);
        

  useEffect(() => {
    if (SiteActivitiesData[0]) {
      const results = SiteActivitiesData;
      setData(results);
      setDisplayData(results.slice(0, 5));
      setAnimations(new Array(5).fill(""));
    }
  }, [SiteActivitiesData]);

  useEffect(() => {
      if(SiteActivitiesData&&SiteActivitiesData.length>5){
      const interval = setInterval(() => {
        setAnimations([
          "slide-in",
          "move-down",
          "move-down",
          "move-down",
          "slide-out",
        ]);

        setTimeout(() => {
          setDisplayData((prevDisplayData) => {
            const newIndex = (index + 1) % data.length;
            setIndex(newIndex);

            // console.log({prevDisplayData});
            
            // Calculate the new set of data to display
            if(!prevDisplayData){prevDisplayData=[]}
            if(newIndex){
              const newDisplayData = [
                data[newIndex], // Add the new item at the top
                ...prevDisplayData.slice(0, 4), // Keep only the first four items
              ]
              // :0;

              // Reset animations after the animation duration
              setAnimations(["", "", "", "", ""]);            
              return newDisplayData;
            }else{
              return prevDisplayData
              // console.log('NO INDEX');
            }
          });
        }, 500);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [data, index]);

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const units = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "week", seconds: 604800 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];

    for (const unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return interval === 1
          ? `${interval} ${unit.name} ago`
          : `${interval} ${unit.name}s ago`;
      }
    }

    return "just now";
  }

  const shortID = (name) => {
    if (name.length > 6) {
      return name.toString().substr(0, 6) + "***";
    } else {
      return name;
    }
  };
  
 try {
  return (
    <div translate="no" className="" style={{marginBottom:"60px"}}>
      {displayData&& displayData.length >= 1
        ? displayData.map((item, idx) => (
            <div key={idx} className={`activity-item ${animations[idx]}`}>
              <div className="d-flex white rounded-5 pt-2 ms-3 me-3 mb-3">
                <div className="bg-transparent d-flex ps-4">
                  <div
                    className="bg-success rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  >
                    <img
                      src={profile}
                      className="bg-transparent rounded-circle"
                      style={{ width: "30px", height: "30px" }}
                    />
                  </div>
                  {item.fields ? <p className="bg-transparent text-dark fw-bold at-font ps-3 pt-2 me-3">
                    {item.fields ? shortID(item.fields.user_id) : ""}
                  </p>:""}
                  
                </div>
                <div className="bg-transparent  ps-2 d-flex  ">
                  {item.fields.type === "won" ? (
                    <div
                      className="bg-transparent me-3 rounded-3"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <img
                        className="bg-transparent"
                        src={won}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {item.fields.type === "withdraw" ? (
                    <div
                      className="bg-transparent me-3 rounded-3"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <img
                        className="bg-transparent"
                        src={withdraw}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  {item.fields.type === "deposit" ? (
                    <div
                      className="bg-transparent me-3  rounded-3"
                      style={{ width: "auto", height: "30px" }}
                    >
                      <img
                        className="bg-transparent"
                        src={deposit}
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex w-100 ms-3">
                    <div className=""></div>

                    <div className="bg-transparent text-center at-line pt-2 ms-auto">
                      {item.fields.type === "won" ? (
                        <p className="bg-transparent text-success fw-bold at-font">
                          Won ${item.fields.amount}
                        </p>
                      ) : (
                        ""
                      )}
                      {item.fields.type === "withdraw" ? (
                        <p className="bg-transparent text-primary fw-bold at-font">
                          Withdraw ${item.fields.amount}
                        </p>
                      ) : (
                        ""
                      )}
                      {item.fields.type === "deposit" ? (
                        <p className="bg-transparent text-warning fw-bold at-font ">
                          Deposit ${item.fields.amount}
                        </p>
                      ) : (
                        ""
                      )}

                      <p className="bg-transparent text-dark fw-bold at-font time-ago">
                        {timeAgo(item.fields.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : <p className="text-center vip-text-2"></p>}
    </div>
  );
} catch (error) {
  
}

};

