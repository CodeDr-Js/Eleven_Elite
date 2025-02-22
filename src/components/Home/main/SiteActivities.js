import React, { useContext, useEffect, useState } from "react";
import profile from "../../../assets/images/profile.png";
import { DataContext } from "../../APIs/Api";
import "./index.css";
import won from "../../../assets/home-icons/soccer.svg";
import withdraw from "../../../assets/home-icons/withdraw.svg";
import deposit from "../../../assets/home-icons/deposit.svg";

export const SiteActivities = () => {
  const { result,
    getUserData,
    hasRunRetrieve } = useContext(DataContext);

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [index, setIndex] = useState(0);
  const [animations, setAnimations] = useState([]);

  //console.log(result);

  // useEffect(() => {
  //   if (!hasRunRetrieve) {
  //     getUserData();
  //   }
  // }, []);

  useEffect(() => {
    if (result && Object.keys(result).length) {
      const results = result.latest_transactions;
      setData(results);
      setDisplayData(results.slice(0, 5));
      setAnimations(new Array(5).fill(""));
    }
  }, [result]);

  useEffect(() => {
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

          // Calculate the new set of data to display
          const newDisplayData = [
            data[newIndex], // Add the new item at the top
            ...prevDisplayData.slice(0, 4), // Keep only the first four items
          ];

          // Reset animations after the animation duration
          setAnimations(["", "", "", "", ""]);

          return newDisplayData;
        });
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
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
  // // Example usage:
  // const timestamp = '2024-06-18T23:29:31.008Z';
  // console.log(timeAgo(timestamp));  // Output will depend on the current time

  //console.log(displayData);
  try {
  return (
    <div translate="no" className="" style={{marginBottom:"60px"}}>
      {displayData.length > 2
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
        : ""}
    </div>
  );
} catch (error) {
    
}
};

// SECOND METHOD
// import React, { useContext, useEffect, useState } from "react";
// import profile from "../../../assets/images/profile.png";
// import { DataContext } from "../../APIs/Api";
// import "./index.css";

// export const SiteActivities = () => {
//   const { result } = useContext(DataContext);

//   const [data, setData] = useState([]);
//   const [displayData, setDisplayData] = useState([]);
//   const [animations, setAnimations] = useState([]);

//   useEffect(() => {
//     if (result && Object.keys(result).length) {
//       const results = result.latest_transactions;
//       setData(results);
//       setDisplayData(results.slice(0, 5));
//       setAnimations(new Array(5).fill(''));
//     }
//   }, [result]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAnimations(['slide-in', 'move-down', 'move-down', 'move-down', 'slide-out']);

//       setTimeout(() => {
//         setDisplayData((prevDisplayData) => {
//           const newIndex = (prevDisplayData.length) % data.length;
//           const newDisplayData = [
//             data[newIndex],
//             ...prevDisplayData.slice(0, 4)
//           ];

//           return newDisplayData;
//         });

//         setAnimations(['', '', '', '', '']);
//       }, 500);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [data]);

//   return (
//     <div>
//       {displayData.map((item, idx) => (
//         <div key={idx} className={`activity-item ${animations[idx]}`}>
//           <div className="d-flex white rounded-5 pt-2 ms-3 me-3 mb-2">
//             <div className="bg-transparent d-flex ps-4">
//               <div className="bg-success rounded-circle" style={{ width: "30px", height: "30px" }}>
//                 <img
//                   src={profile}
//                   className="bg-transparent rounded-circle"
//                   style={{ width: "30px", height: "30px" }}
//                 />
//               </div>
//               <p className="bg-transparent text-dark fw-bold at-font ps-3 pt-2">
//                 {item.fields.user_id}
//               </p>
//             </div>
//             <div className="bg-transparent ms-5 ps-2 d-flex">
//               <div className="bg-success me-3 rounded-3" style={{ width: "50px", height: "30px" }}>
//                 <img className="bg-transparent" />
//               </div>
//               <div className="bg-transparent text-center at-line pt-2">
//                 <p className="bg-transparent text-dark fw-bold at-font">
//                   Receive $20
//                 </p>
//                 <p className="bg-transparent text-dark fw-bold at-font">
//                   Winning amount
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// OLD DATA FOR SITE ACTIVITIES

// import React, { useContext, useEffect, useState } from "react";
// import profile from "../../../assets/images/profile.png";
// import logo from "../../../assets/images/Logo.png";
// import { DataContext } from "../../APIs/Api";
// import "./index.css"

// export const SiteActivities = () => {
//   const {
//     allData,
//     activeToken,
//     setActiveToken,
//     activities,
//     activities_g,
//     user,
//     result,
//     getUserData,
//     hasRunRetrieve,
//     setHasRunRetrieve,
//     user_g,
//   } = useContext(DataContext);
//   //console.log(result);
//   const [data, setData] = useState([]);
//   const [displayData, setDisplayData] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [animations, setAnimations] = useState([]);
//   console.log(result);

//   useEffect(() => {
//     // Fetch the data from the API
//     const fetchData = async () => {
//     if(Object.keys(result)) {
//           const results = result.latest_transactions;
//           setData(results);
//           setDisplayData(results.slice(0, 5));
//           setAnimations(new Array(5).fill('')); // Initialize empty animations
//             // try{
//             //     const results = await result.latest_transactions;
//             //     setData(results);
//             //     setDisplayData(results.slice(0, 5)); // Initial five data items
//             // } catch (error) {
//             //   console.error('Error fetching data:', error);
//             // }
//         };
//     }

//      fetchData();
//   }, []);

//   console.log(data);
// //   useEffect(() => {
// //     // Set up the interval to update the displayed data
// //     const interval = setInterval(() => {
// //       setDisplayData((prevDisplayData) => {
// //         const newIndex = (index + 1) % data.length;
// //         setIndex(newIndex);

// //         // Calculate the new set of data to display
// //         const newDisplayData = [
// //           data[newIndex], // Add the new item at the top
// //           ...prevDisplayData.slice(0, 4) // Remove the last item to maintain length 5
// //         ];

// //         return newDisplayData;
// //       });
// //     }, 1000);

// //     // Clean up the interval on component unmount
// //     return () => clearInterval(interval);
// //   }, [index, data]);

// useEffect(() => {
//     // Set up the interval to update the displayed data
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => {
//         const newIndex = (prevIndex + 1) % data.length;

//         // Calculate the new set of data to display
//         const newDisplayData = [
//           data[newIndex], // Add the new item at the top
//           ...displayData.slice(0, 4) // Remove the last item to maintain length 5
//         ];

//         // Set animations for each item
//         const newAnimations = ['slide-in', ...new Array(3).fill('slide-down'), 'slide-out'];

//         setAnimations(newAnimations);

//         // Update the display data after the animation duration
//         setTimeout(() => setDisplayData(newDisplayData), 500); // Adjust timeout to match animation duration

//         return newIndex;
//       });
//     }, 1000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(interval);
//   }, [data, displayData]);

// //   useEffect(() => {
// //     // Set up the interval to update the displayed data
// //     const interval = setInterval(() => {
// //         if(displayData.length > 1){
// //             setDisplayData((prevDisplayData) => {
// //                 const newIndex = (index + 1) % data.length;
// //                 setIndex(newIndex);

// //                 // Calculate the new set of data to display
// //                 const newDisplayData = [
// //                   data[newIndex], // Add the new item
// //                   ...prevDisplayData.slice(0, 4) // Remove the last item to maintain length 5
// //                 ];

// //                 return newDisplayData;
// //               });

// //         }

// //     }, 1000);

// //     // Clean up the interval on component unmount
// //     return () => clearInterval(interval);
// //   }, [index, data]);

// //   return (
// //     <div>
// //       <h1>Dynamic Data Display</h1>
// //       <ul>
// //         {displayData.map((item, idx) => (
// //           <li key={idx} className={idx === 0 ? 'slide-in' : ''}>
// //             {item}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// //   useEffect(() => {
// //     // Set up the interval to update the displayed data
// //     const interval = setInterval(() => {
// //       setDisplayData((prevDisplayData) => {
// //         const newIndex = (index + 1) % data.length;
// //         setIndex(newIndex);

// //         // Calculate the new set of data to display
// //         const newDisplayData = [
// //           ...prevDisplayData.slice(1), // Remove the first item
// //           data[newIndex], // Add the new item
// //         ];

// //         return newDisplayData;
// //       });
// //     }, 1000);

// //     // Clean up the interval on component unmount
// //     return () => clearInterval(interval);
// //   }, [index, data]);

//   //   return (
//   //     <div>
//   //       <h1>Dynamic Data Display</h1>
//   //       <ul>
//   //         {displayData.map((item, idx) => (
//   //           <li key={idx}>{item}</li>
//   //         ))}
//   //       </ul>
//   //     </div>
//   //   );
//   // };

//   return (
//     <div>
//       {displayData.map((item, idx) => (
//         <div key={idx} className={animations[idx]}>

//         <div className="d-flex white rounded-5 pt-2  ms-3 me-3 mb-2">
//           <div className="bg-transparent d-flex ps-4 ">
//             <div
//               className="bg-success rounded-circle "
//               style={{ width: "30px", height: "30px" }}
//             >
//               <img
//                 src={profile}
//                 className="bg-transparent rounded-circle"
//                 style={{ width: "30px", height: "30px" }}
//               />
//             </div>
//             <p className="bg-transparent text-dark fw-bold at-font ps-3 pt-2 ">
//             {item.fields.user_id}
//             </p>
//           </div>
//           <div className="bg-transparent ms-5 ps-2 d-flex">
//             <div
//               className="bg-success me-3 rounded-3 "
//               style={{ width: "50px", height: "30px" }}
//             >
//               <img className="bg-transparent" />
//             </div>
//             <div className="bg-transparent text-center at-line pt-2">
//               <p className="bg-transparent text-dark fw-bold at-font">
//                 Receive $20
//               </p>
//               <p className="bg-transparent text-dark fw-bold at-font">
//                 Winning amount
//               </p>
//             </div>
//           </div>
//         </div>
//         </div>
//       ))}
//     </div>
//   );
// };
