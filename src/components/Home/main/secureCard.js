import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../APIs/Api";
import { useNavigate } from "react-router-dom";
import Secure from "./Secure";
import BetSecure from "./betSecure";





const SecureCard = () => {
  const { result, activities_g } = useContext(DataContext);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //console.log("s",result);

  const handleCloseModal = (e) => {
      setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(true);
  }
  
 let games = {};

let timestamp1, status1, home1, away1, homeName1, awayName1, league1, score1, odd1, leagueFlag1, startDate1, id1 ;
let timestamp2, status2, home2, away2, homeName2, awayName2, league2, score2, odd2, leagueFlag2, startDate2, id2;

const company_game = Array.isArray(result.company_game) ? result.company_game : [];

company_game.map((item, index) => {
  games[index] = {}

  let data = JSON.parse(item.fields.data);
  games[index]["timestamp"] = data.market.startDate;
  games[index]["team"] = data.market.teams;
  games[index]["logo"] = data.market.img_url;
  games[index]["league"] = data.market.league;
  games[index]["odd"] = data.market.odd;
  games[index]["score"] = data.market.pick;
  games[index]["id"] = data.id;
  



})

//Sort game by timestamp
games = Object.values(games);
//console.log(games);
games.sort((a, b) => {
  // Convert the timestamps to Date objects
  var dateA = new Date(Number(a.timestamp * 1000));
  var dateB = new Date(Number(b.timestamp * 1000));

  // Compare the dates and return either -1, 0, or 1
  // depending on whether dateA is before, the same as,
  // or after dateB
  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
});

let gameCard =  <Secure style={"disabled "} FS={"fs-4 text-danger"} text={"No game"} e="bg-warning" s="bg-success"/>;
let betSecure = <BetSecure 
onClick={handleCloseModal}
/>

for (let i = 0; i < games.length; i++) {
  let item = games[i]
  // console.log({item});
  // console.log(new Date(Number(item.timestamp * 1000)));
  if (new Date() < new Date(Number(item.timestamp * 1000))) { 
    //console.log("breaking", item);
    gameCard = <Secure league={item.league.name} home={item.team.home} away={item.team.away} time={convertTimestampToRealTime(item.timestamp).split(" ")[1]} hflag={item.logo.home} aflag={item.logo.away} odd={item.odd} score={item.score} text={"Play 🎲"} FS={""} e="bg-transparent" s="bg-transparent" onClick={handleClick}
    />

    betSecure= <BetSecure correctScore={item.score}
    oddPer={item.odd}
    profit={item.odd}
    leagueName={item.league.name}
    homeName={item.team.home}
    awayName={item.team.away}
    homeLogo={item.logo.home}
    awayLogo={item.logo.away}
    leagueFlag={item.league.flag}
    startDate={item.timestamp}
    id={item.id}
    onClick={handleCloseModal}
    />
    break; 
  } else {
    //console.log("No game");
    if(games.length === i+1) {
      gameCard = <Secure league={item.league.name} home={item.team.home} away={item.team.away} time={convertTimestampToRealTime(item.timestamp).split(" ")[1]} hflag={item.logo.home} aflag={item.logo.away} odd={item.odd} score={item.score}  style={"bg-transparent disabled"} FS={"fs-4 text-danger"} text={"Expired"} e="bg-warning" s="bg-success"
      />

    }
  } 
} 


//console.log(games);


//const data1 = company_game ? JSON.parse(company_game.fields.data) : "";
//console.log("data1 is:", data1);


//Assigning Data 1
// timestamp1 = data1 ? data1.response[0].fixture.timestamp : "";
// home1 = data1 ? data1.response[0].teams.home.logo : "";
// away1 = data1 ? data1.response[0].teams.away.logo : "";
// homeName1 = data1 ? data1.response[0].teams.home.name : "";
// awayName1 = data1 ? data1.response[0].teams.away.name : "";
// league1 = data1 ? data1.response[0].league.name : "";

// odd1 = company_game ? company_game.fields.odd : "";
// score1 = company_game ? company_game.fields.score1 + ":" + company_game.fields.score2 : "";
// startDate1 = data1 ? data1.response[0].fixture.date : "";
// leagueFlag1 = data1 ? data1.response[0].league.flag : "";
// id1 = company_game ? company_game.fields.fixture: "";



//game 2

// const company_game2 = Array.isArray(result.company_game) ? result.company_game[1] : "";

// const data2 = company_game2 ? JSON.parse(company_game2.fields.data) : "";
//console.log("company game 2 is:", company_game2, "1 is", company_game);
//console.log("data2 is:", data2);

//console.log(company_game);

//Assigning Data 2
// timestamp2 = data2 ? data2.response[0].fixture.timestamp : "";
// home2 = data2 ? data2.response[0].teams.home.logo : "";
// away2 = data2 ? data2.response[0].teams.away.logo : "";
// homeName2 = data2 ? data2.response[0].teams.home.name : "";
// awayName2 = data2 ? data2.response[0].teams.away.name : "";
// league2 = data2 ? data2.response[0].league.name : "";

// odd2 = company_game2 ? company_game2.fields.odd : "";
// score2 = company_game2 ? company_game2.fields.score1 + ":" + company_game2.fields.score2 : "";
// startDate2 = data2 ? data2.response[0].fixture.date : "";
// leagueFlag2 = data2 ? data2.response[0].league.flag : "";
// id2 = company_game2 ? company_game2.fields.fixture: "";



//   const companyGame

//   const companyGameMap = Array.isArray(company_game)
//     ? company_game.map((result) => {
//         console.log(result);
   
//       })
//     : "";


function convertTimestampToRealTime(timestamp) {
  // Convert the timestamp to milliseconds
  var timestampInMillis = timestamp * 1000;

  // Create a new Date object using the timestamp
  var date = new Date(timestampInMillis);

  // Extract the various components of the date
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Months are zero-based
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // Format the date and time components
  var formattedTime =
    year +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day +
    " " +
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;

  return formattedTime;
}

const userDate = Date.now();

//console.log(userDate, convertTimestampToRealTime(timestamp1), timestamp1 * 1000, timestamp2 * 1000);

// const newTimestamp1 = timestamp1 * 1000;
// const newTimestamp2 = timestamp2 * 1000;

// useEffect(()=>{
//   if(userDate < newTimestamp1) {
//     setLoading1(true);
//     setLoading2(false);
//     setLoading3(false);
//   } else if (userDate < newTimestamp2) {
//     setLoading2(true)
//     setLoading1(false);
//     setLoading3(false);
//   } else if(userDate > newTimestamp1 && userDate > newTimestamp2) {
//     setLoading3(true);
//     setLoading2(false);
//     setLoading1(false);
//   }
// },[result])
  return (
    <>
    {gameCard}
    {/* <div>
      {loading1? (<Secure league={league1} home={homeName1} away={awayName1} time={convertTimestampToRealTime(timestamp1).split(" ")[1]} hflag={home1} aflag={away1} odd={odd1} score={score1} text={"Play 🎲"} FS={""} e="bg-transparent" s="bg-transparent" onClick={handleClick} />): ""}
      {loading2? (<Secure league={league2} home={homeName2} away={awayName2} time={convertTimestampToRealTime(timestamp2).split(" ")[1]} hflag={home2} aflag={away2} odd={odd2} score={score2} text={"Play 🎲"} FS={""} e="bg-transparent" s="bg-transparent" onClick={handleClick} />): ""}
      {loading3? (<Secure league={league2 || league1} home={homeName2 || homeName1} away={awayName2||awayName1} time={"Expired"} hflag={home2 || home1} aflag={away2 || away1} odd={odd2 || odd1} score={score2 || score1} style={"disabled "} FS={"fs-4 text-danger"} text={"Expired"} e="bg-warning" s="bg-success"  />): ""}
    
    </div> */}
    {isOpen ? (<div className="modal-overlay z-indexs">
    {betSecure}

    
     </div>) : "" }

    {/* 
    {loading2 ? (isOpen ? (<div className="modal-overlay">
    <BetSecure correctScore={score2}
    oddPer={odd2}
    profit={odd2}
    leagueName={league2}
    homeName={homeName2}
    awayName={awayName2}
    homeLogo={home2}
    awayLogo={away2}
    leagueFlag={leagueFlag2}
    startDate={timestamp2}
    id={id2}
    onClick={handleCloseModal}
    />

    
     </div>) : "") : ""} */}

    </>
  );
};

export default SecureCard;
