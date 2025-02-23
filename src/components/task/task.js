import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import ArrowNav from "../arrowNav/ArrowNav";
import TaskCard from "./task-card";
import { API } from "../api-service/api-service";
import { DataContext } from "../APIs/Api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../loader/loader";

const Task = () => {
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
    if (invite !== null) {
      setLoadings(false)
    }
  }, [invite])

  useEffect(() => {
    API.task(token)
      .then((result) => {
        return //console.log("Task response:", result);
        if (result.success || result.message === "Success") {

          setInvite(result);
        }
      })
      .catch((err) => console.log(err));

    //     if (invite === null) {
    //       API.invite(token)
    //         .then((result) => {
    //          //console.log("Invite response:",result);
    //           if (result.success || result.message === "Success") {

    //             setInvite(result);
    //           }
    //         })
    //         .catch((err) => console.log(err));
    //     } else {
    // //      console.log(" Invite is found in useContext");
    //     }
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
      {loadings ? (<Loader />) : ""}
      <div className=" mt-5 pt-4">
        <div>
          <p className="" style={{ fontSize: "10px" }}><b>Tash your self:</b> Participate on any of the task by completing the required task befor each 7 days and get 5% of the total deposited amount.</p>
          <p style={{ fontSize: "10px" }}>NOTE: All task resets after 7 days base on the date new task was started.</p>
        </div>
        <div>

      
        <div className="orange d-flex w-100 pt-3 ps-3 pe-3 rounded-3">
          <div>

          <div className="bg-transparent earn-card">
            <p className="bg-transparent">Task Completed</p>
            {/* 
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
            )} */}

            {/* <small className="bg-transparent">Current Level</small> */}
          </div>

          <div className="bg-transparent pt-3  earn-card-1 earn-car pt-4 mt-3 w-100">
            <div className="bg-transparent">
              {invite !== null ? (
                invite.activities.invite_reward_dir.invite_eaning_levels ? (
                  <p className="bg-transparent ">
                    {
                      runningLevel.reward
                    }{" "}
                    {invite.activities.init_currency.code}
                  </p>
                ) : (
                  <p className="bg-transparent ">0 {invite.activities.init_currency.code}</p>
                )
              ) : (
                ""
              )}

              <small className="bg-transparent">Started</small>
            </div>
            <div className="bg-transparent mt-5 ">
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

              <small className="bg-transparent">Active Subordinates</small>
            </div>
          </div>
          </div>

        <div className="ms-auto"> 
          <div>
            <p>$0/0</p>
            <p>Total Paid:</p>
          </div>

          <div>
            <p>21-4-2024</p>
            <p>Reseting</p>
          </div>

          <div>
            <p>$8000</p>
            <p>Deposited Amount</p>
          </div>
        </div>

        </div>

        </div>

        <div className="mt-4">
          {/* {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[1]?( <InviteCard level="Level 1" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].downline_required[1] }  status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[1].status} style="light-green-1"/>): ""):""}

            {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[2]?( <InviteCard level="Level 2" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[2].status} style="light-green-2"/>): ""):""}

            {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[3]?( <InviteCard level="Level 3" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[3].status} style="grey"/>): ""):""}

            {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[4]?( <InviteCard level="Level 4" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[4].status} style="grey"/>): ""):""}

            {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[5]?( <InviteCard level="Level 5" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[5].status} style="grey"/>): ""):""} */}


          {invite !== null ? Object.entries(invite.activities.invite_reward_dir.invite_eaning_levels.levels).map(([k, e]) => (<TaskCard key={k} required={e.team_deposit_required} level={`Level ${k}`} amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].downline_required[1]} status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[k].status} style="grey" currency={invite.activities.init_currency.symbol} />)) : ""}

          {/* {invite !== null ?(invite.activities.invite_reward_dir.invite_eaning_levels.levels[6]?( <InviteCard level="Level 6" amount={invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].reward} date={Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].weekly_earning).length > 0 ? trimTimestamp(Object.keys(invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].weekly_earning)[0]) : invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].downline_required[1] } status={invite.activities.invite_reward_dir.invite_eaning_levels.levels[6].status} style="grey"/>): ""):""} */}





        </div>
        <br />

      </div>
    </div>
  );
};

export default Task;
