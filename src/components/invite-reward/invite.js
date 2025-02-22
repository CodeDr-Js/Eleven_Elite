import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import ArrowNav from "../arrowNav/ArrowNav";
import InviteCard from "./invite-card";
import { API } from "../api-service/api-service";
import { DataContext } from "../APIs/Api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../loader/loader";

const Invite = () => {
  const navigate = useNavigate();
  const { setActiveToken, invite, setInvite } = useContext(DataContext);
  const token = Cookies.get("auth-token");
  const [loadings, setLoadings] = useState(false)

  //console.log(invite);

  const currentLevel =
    invite !== null
      ? invite.activities.invite_reward_dir.invite_eaning_levels.active
      : "";

  const runningLevel =
    invite !== null
      ? invite.activities.invite_reward_dir.invite_eaning_levels["levels"][currentLevel]
      : "";
 // console.log(runningLevel.downline_required);

  useEffect(() => {
    if (!token) {
      Cookies.remove("auth-token")
      navigate("/login");
      setActiveToken("");
    } else {
      setActiveToken(token);
    }
  }, [token]);

  useEffect(() => {
    setLoadings(true);
    if(invite !== null) {
      setLoadings(false)
    }
   }, [invite])

  useEffect(() => {
  
    if (invite === null) {
      API.invite(token)
        .then((result) => {
         //console.log("Invite response:",result);
          if (result.success || result.message === "Success") {
        
            setInvite(result);
          } else if(result.detail === "Invalid token.") {
                        Cookies.remove("auth-token");
                        navigate("/login");
           }
        })
        .catch((err) => console.log(err));
    } else {
//      console.log(" Invite is found in useContext");
    }
  }, []);

  function trimTimestamp(timestamp) {
    const parts = timestamp.split('.'); // Splitting the timestamp string by '.'
    // Taking the part before the dot
    const trimmedTimestamp = parts[0];
    return trimmedTimestamp;
  }

  return (
    <div className="container">
      <div className="fixed-top ">
        <ArrowNav name="Invite Rewards" bg="main-color" />
      </div>
      {loadings?(<Loader/>):""}
      <div className=" mt-5 pt-4">
        <div className="orange pt-3 ps-3 pe-3 rounded-3">
          <div className="bg-transparent earn-card">
            <p className="bg-transparent">Work and Earn</p>

            {invite !== null ? (
              invite.activities.invite_reward_dir.invite_eaning_levels ? (
                <p className="bg-transparent pt-4 earn-card-color">
                  {invite.activities.invite_reward_dir.invite_eaning_levels.active}
                </p>
              ) : (
                <p className="bg-transparent pt-4 earn-card-color">0</p>
              )
            ) : (
              ""
            )}

            <small className="bg-transparent">Current Level</small>
          </div>

          <div className="bg-transparent pt-3 d-flex earn-card-1 earn-card-b pt-4 mt-3 w-100">
            <div translate="no" className="bg-transparent">
              {invite !== null ? (
                invite.activities.invite_reward_dir.invite_eaning_levels ? (
                  <p className="bg-transparent ">
                    {
                      runningLevel.reward
                    }{" "}
                    {invite.activities.init_currency.code}
                  </p>
                ) : (
                  <p translate="no" className="bg-transparent ">0 {invite.activities.init_currency.code}</p>
                )
              ) : (
                ""
              )}

              <small className="bg-transparent">Awaiting Payment</small>
            </div>
            <div translate="no" className="bg-transparent ms-auto ">
              {invite !== null ? (
                invite.activities.invite_reward_dir.invite_eaning_levels ? (
                  <p className="bg-transparent text-primary fw-bold ">
                    {invite.activities.invite_reward_dir.invite_eaning_levels.earnings}{" "}
                    {invite.activities.init_currency.code}
                  </p>
                ) : (
                  <p className="bg-transparent text-primary fw-bold ">0 {invite.activities.init_currency.code}</p>
                )
              ) : (
                ""
              )}

              <small className="bg-transparent">Total Paid</small>
            </div>
          </div>

          <div className="bg-transparent d-flex">
            <div className="bg-transparent text-center">
              <small className="bg-transparent e-font fw-bold text-dark">
                Total required friends for this level
              </small>

              <p className="bg-transparent">{runningLevel ?runningLevel.downline_required[1] : "" }</p>
            </div>
            <div className="bg-transparent text-center ms-auto earn-card-1 pt-3 pe-2">
              <p className="bg-transparent e-font fw-bold text-dark">
                My Active Friends
              </p>

              {invite !== null ? (
                invite.active ? (
                  <p className="bg-transparent ">{invite.active}</p>
                ) : (
                  <p className="bg-transparent  ">0</p>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
            {/* {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[1]?( <InviteCard level="Level 1" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].downline_required[1] }  status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].status} style="light-green-1"/>): ""):""}

            {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[2]?( <InviteCard level="Level 2" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].status} style="light-green-2"/>): ""):""}

            {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[3]?( <InviteCard level="Level 3" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].status} style="grey"/>): ""):""}

            {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[4]?( <InviteCard level="Level 4" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].status} style="grey"/>): ""):""}

            {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[5]?( <InviteCard level="Level 5" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].status} style="grey"/>): ""):""} */}
            

            {invite !== null ? Object.entries(invite.activities.invite_reward_dir.invite_eaning_levels.levels).map(([k,e]) => (<InviteCard key={k} required={e.team_deposit_required} level={`Level ${k}`}  amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].status} style="grey" currency={invite.activities.init_currency.symbol}/>)) : ""}

            {/* {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[6]?( <InviteCard level="Level 6" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].status} style="grey"/>): ""):""} */}

            

           
         
        </div>
        <br/>
        
      </div>
    </div>
  );
};

export default Invite;
