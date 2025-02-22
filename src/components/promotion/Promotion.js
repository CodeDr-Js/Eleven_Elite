import React, { useContext, useEffect, useState } from "react";
import "../color/color.css";
import "./index.css";
import ArrowNav from "../arrowNav/ArrowNav";
import PromotionNav from "./PromotionNav/PromotionNav";
import PromotionCard from "./promotionCard";
import PromotionFC from "./PromotionFC";
import { API } from "../api-service/api-service";
import Cookies from "js-cookie";
import { DataContext } from "../APIs/Api";
import { host, hostname, origin } from "../search_dir/search_dir";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
import Footer from "../Home/anti-scores/footer";
import { convertToLocalTime } from "../qickfun/qickfun";

const hostName = `${origin}/register/?invited=`;

//console.log(hostName);

const Promotion = () => {
  const navigate = useNavigate();
  const { setActiveToken, setPromotion, promotion } = useContext(DataContext);
  const [activeButton1, setActiveButton1] = useState("level-1");
  const [message, setMessage] = useState();
  const token = Cookies.get("auth-token");
  const [loadings, setLoadings] = useState(false);
  const [activeButton, setActiveButton] = useState("promotion");

  
  if (!token) {
    navigate("/login");
  } else {
    setActiveToken(token);
  }

  const handlePromotion = () => {
    if(promotion !== null) {

    } else {
      API.retrievePromotion(token)
      .then((result) => {
        console.log("Promotion is :", result);
        if (result.success || result.message === "Success") {
          setPromotion(result);
        } else if (result.detail) {
          Cookies.remove("auth-token");
          setActiveToken("");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
    }
   
  };

  useEffect(() => {
    handlePromotion();
  }, []);

  //console.log(promotion);
  useEffect(() => {
    setLoadings(true);
    if (promotion !== null) {
      setLoadings(false);
    }
  }, [promotion]);

  // useEffect(() => {
  //   if (promotion === null) {
  //     API.promotion(token)
  //       .then((result) => {
  //         console.log("Promotion is:", result);
  //         if (result.success) {
  //           setPromotion(result);
  //         } else if (result.detail) {
  //           Cookies.remove("auth-token");
  //           setActiveToken("");
  //           navigate("/login");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     //console.log("Data is found in promotion..");
  //   }
  // }, []);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage("Invite address successfully copied to clipboard");
      })
      .catch((err) => {
        setMessage("Failed to copy text");
        console.error("Failed to copy text: ", err);
      });
  };

  setTimeout(() => {
    if (message) {
      setMessage("");
    }
  }, 3000);

  const handleInvite = () => {
    navigate("/invite");
  };

  const handlePending = () => {
    navigate("/pending");
  };

 

  return (
    <div className="mb-5">
      {" "}
      {activeButton === "promotion" ? (
        <div className="">
          <div className="fixed-top">
            <ArrowNav name="Promotion" bg="main-color" />
          </div>
          {loadings ? <Loader /> : ""}
          <div className=" mt-5 pt-5 container">
            <div className="d-flex flex-column align-items-center invite-div ">
              <p>Invite Friends.</p>
              <p>Earn Money Together</p>
              {message ? (
                <p className="alert alert-success alert-text f-italic">
                  {message}
                </p>
              ) : (
                ""
              )}
              <div className="ref-link d-flex flex-column align-items-center">
                <div className="bg-transparent d-flex w-100">
                  {promotion !== null ? (
                    <p className="opacity-50 pe-4 ref-link-1">
                      {hostName + promotion.activities.teams_dir.invite_url}
                    </p>
                  ) : (
                    <p className="opacity-50 pe-4">{hostName}</p>
                  )}

                  <i
                    onClick={() =>
                      handleCopy(hostName + promotion.activities.teams_dir.invite_url)
                    }
                    id=""
                    className="fa fa-copy fa-fw fa-lg opacity-50 d-flex-1 bg-transparent ms-auto pt-1 "
                  ></i>
                </div>
              </div>
            </div>

            <div className="mt-4 commission-div rounded-4 p-3">
              <div className="bg-transparent d-flex">
                <p className="bg-transparent">Commission</p>
                <button
                  className="btn white rounded-5 commission-btn ms-auto pe-1 "
                  onClick={handleInvite}
                >
                  {" "}
                  REWARDS{" "}
                  <i
                    id=""
                    className="fa fa-chevron-right bg-transparent fa-fw fa-lg icon-color "
                  ></i>
                </button>
              </div>

              <div className="bg-transparent amt-div mt-3 ">
                {promotion !== null ? (
                  promotion.activities.teams_dir.next_pay_date ? (
                    <p className="bg-transparent text-warning">
                      {
                        convertToLocalTime(promotion.activities.teams_dir.next_pay_date)
                      }
                    </p>
                  ) : (
                    <p className="bg-transparent text-warning"></p>
                  )
                ) : (
                  ""
                )}

                <small className="bg-transparent">Next Pay </small>
              </div>
              <div className="bg-transparent d-flex w-100 pb-4 av-border ">
                <div className="bg-transparent d-flex w-100  ">
                  <div className="bg-transparent amt-div mt-wg me-auto">
                    {promotion !== null ? (
                      promotion.activities.teams_dir ? (
                        <p translate="no" className="bg-transparent ">
                          {Math.floor(Number(promotion.activities.teams_dir.unpaid))} {promotion.activities.init_currency.code}
                        </p>
                      ) : (
                        <p translate="no" className="bg-transparent ">0.0 {promotion.activities.init_currency.code}</p>
                      )
                    ) : (
                      ""
                    )}

                    <small className="bg-transparent fw-bold" style={{color:"black"}}>Frozen Commission</small>
                  </div>
                  <div className="bg-transparent amt-div mt-wg ms-auto">
                    {promotion !== null ? (
                      promotion.activities.teams_dir.total_paid ? (
                        <p translate="no" className="bg-transparent txt-color fw-bold ">
                          {Math.floor(Number(promotion.activities.teams_dir.total_paid))} {promotion.activities.init_currency.code}
                        </p>
                      ) : (
                        <p translate="no" className="bg-transparent txt-color fw-bold ">
                          0.0 {promotion.activities.init_currency.code}
                        </p>
                      )
                    ) : (
                      ""
                    )}

                    <small className="bg-transparent">Total Cashed</small>
                  </div>
                </div>
              </div>

              <div className="bg-transparent mt-3 d-flex justify-content-around amt-div">
                {/* <div className="bg-transparent pt-2">Friends</div> */}
                <div className="bg-transparent d-flex flex-column align-items-center">
                  <p className="bg-transparent txt-color1">Total</p>
                  {promotion !== null ? (
                    promotion.activities.teams_dir.active || promotion.activities.teams_dir.inactive ? (
                      <small className="bg-transparent">
                        {promotion.activities.teams_dir.active + promotion.activities.teams_dir.inactive}
                      </small>
                    ) : (
                      <small className="bg-transparent">0</small>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="bg-transparent d-flex flex-column align-items-center">
                  <p className="bg-transparent txt-color1">Active</p>
                  {promotion !== null ? (
                    promotion.activities.teams_dir.active ? (
                      <small className="bg-transparent">
                        {promotion.activities.teams_dir.active}
                      </small>
                    ) : (
                      <small className="bg-transparent">0</small>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className="bg-transparent d-flex flex-column align-items-center"
                  onClick={handlePending}
                >
                  <p className="bg-transparent txt-color1">Pending</p>
                  {promotion !== null ? (
                    promotion.activities.teams_dir.inactive ? (
                      <small className="bg-transparent">
                        {promotion.activities.teams_dir.inactive}
                      </small>
                    ) : (
                      <small className="bg-transparent">0</small>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <PromotionNav
                activeButton={activeButton1}
                setActiveButton={setActiveButton1}
              />
            </div>
        

            {activeButton1 === "level-1" ? (
              <div className="mt-3">
                {promotion !== null ? (
                  promotion.activities.teams_dir["a_level1"] ? (
                    promotion.activities.teams_dir.generation_track ? (
                      promotion.activities.teams_dir.generation_track[1] ? (
                        <PromotionCard
                          style="main-color"
                          deposited={
                            promotion.activities.teams_dir.generation_track[1]
                              .gen_deposit
                              ? Number(promotion.activities.teams_dir
                                  .generation_track[1].gen_deposit.amount).toFixed(2)
                              : "0.0"
                          }
                          registered={
                            promotion.activities.teams_dir.generation_track[1]
                              .registered
                              ? promotion.activities.teams_dir
                                  .generation_track[1].registered.count
                              : "0"
                          }
                          withdrawn={
                            promotion.activities.teams_dir.generation_track[1]
                              .gen_withdrawal
                              ? Math.floor(Number(promotion.activities.teams_dir
                                  .generation_track[1].gen_withdrawal.amount))
                              : "0.0"
                          }
                          total={
                            promotion.activities.teams_dir.generation_track[1]
                              .commission
                              ? Math.floor(Number(promotion.activities.teams_dir
                                  .generation_track[1].commission.amount))
                              : "0.0"
                          }

                          active={
                            promotion.activities.teams_dir.generation_track[1]
                              .commission
                              ? Math.floor(Number(promotion.activities.teams_dir
                                  .generation_track[1].active_user.count))
                              : "0.0"
                          }

                          currency={
                            promotion.activities.init_currency.symbol
                              ? promotion.activities.init_currency.symbol
                              : ""
                          }

                          code={
                            promotion.activities.init_currency.code
                              ? promotion.activities.init_currency.code
                              : ""
                          }

                          level={"1"}
                        />
                      ) : (
                        <PromotionCard
                          style="main-color"
                          deposited={0}
                          registered={0}
                          withdrawn={0}
                          total={0}
                          active={0}
                          currency={""}
                          code={""}
                          level={"1"}
                        />
                      )
                    ) : (
                      <PromotionCard
                        style="main-color"
                        deposited={0}
                        registered={0}
                        withdrawn={"0.00"}
                        total={"0.0"}
                        active={0}
                        currency={""}
                        code={""}
                        level={"1"}
                      />
                    )
                  ) : (
                    <PromotionCard
                      style="main-color"
                      deposited={0}
                      registered={0}
                      withdrawn={"0.00"}
                      total={"0.0"}
                      active={0}
                      currency={""}
                      code={""}
                      level={"1"}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {activeButton1 === "level-2" ? (
              <div className="mt-3">
                {promotion !== null ? (
                  promotion.activities.teams_dir["a_level2"] ? (
                    promotion.activities.teams_dir.generation_track ? (
                      promotion.activities.teams_dir.generation_track[2] ? (
                        <PromotionCard
                          style="main-color-1"
                          deposited={
                            promotion.activities.teams_dir.generation_track[2]
                              .gen_deposit
                              ? Math.floor(Number(
                                  promotion.activities.teams_dir
                                    .generation_track[2].gen_deposit.amount
                                ))
                              : "0.0"
                          }
                          registered={
                            promotion.activities.teams_dir.generation_track[2]
                              .registered
                              ? promotion.activities.teams_dir
                                  .generation_track[2].registered.count
                              : "0"
                          }
                          withdrawn={
                            promotion.activities.teams_dir.generation_track[2]
                              .gen_withdrawal
                              ? Math.floor(Number(
                                  promotion.activities.teams_dir
                                    .generation_track[2].gen_withdrawal.amount
                                ))
                              : "0.0"
                          }
                          total={
                            promotion.activities.teams_dir.generation_track[2]
                              .commission
                              ? Math.floor(promotion.activities.teams_dir.generation_track[2].commission.amount)
                              : "0.0"
                          }

                          active={
                            promotion.activities.teams_dir.generation_track[2]
                              .commission
                              ? (Number(promotion.activities.teams_dir
                                  .generation_track[2].active_user.count))
                              : "0.0"
                          }

                          currency={
                            promotion.activities.init_currency.symbol
                              ? promotion.activities.init_currency.symbol
                              : ""
                          }

                          code={
                            promotion.activities.init_currency.code
                              ? promotion.activities.init_currency.code
                              : ""
                          }
                          
                          level={2}
                        />
                      ) : (
                        <PromotionCard
                          style="main-color-1"
                          deposited={0}
                          registered={0}
                          withdrawn={0}
                          total={0}
                          active={0}
                          currency={""}
                          code={""}
                        />
                      )
                    ) : (
                      <PromotionCard
                        style="main-color-1"
                        deposited={0}
                        registered={0}
                        withdrawn={0}
                        total={"0.0"}
                        active={0}
                        currency={""}
                        code={""}
                      />
                    )
                  ) : (
                    <PromotionCard
                      style="main-color-1"
                      deposited={0}
                      registered={0}
                      withdrawn={0}
                      total={"0.0"}
                      active={0}
                      currency={""}
                      code={""}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {activeButton1 === "level-3" ? (
              <div className="mt-3">
                {promotion !== null ? (
                  promotion.activities.teams_dir["a_level3"] ? (
                    promotion.activities.teams_dir.generation_track ? (
                      promotion.activities.teams_dir.generation_track[3] ? (
                        <PromotionCard
                          style="main-color-2"
                          deposited={
                            promotion.activities.teams_dir.generation_track[3]
                              .gen_deposit
                              ? Math.floor(Number(
                                  promotion.activities.teams_dir
                                    .generation_track[3].gen_deposit.amount
                                ))
                              : "0.0"
                          }
                          registered={
                            promotion.activities.teams_dir.generation_track[3]
                              .registered
                              ? promotion.activities.teams_dir
                                  .generation_track[3].registered.count
                              : "0"
                          }
                          withdrawn={
                            promotion.activities.teams_dir.generation_track[3]
                              .gen_withdrawal
                              ? Math.floor(Number(
                                  promotion.activities.teams_dir
                                    .generation_track[3].gen_withdrawal.amount
                                ))
                              : "0.0"
                          }
                          total={
                            promotion.activities.teams_dir.generation_track[3]
                              .commission
                              ? Math.floor(Number(
                                  promotion.activities.teams_dir
                                    .generation_track[3].commission.amount
                                ))
                              : "0.0"
                          }

                          active={
                            promotion.activities.teams_dir.generation_track[3]
                              .commission
                              ? Math.floor(Number(promotion.activities.teams_dir
                                  .generation_track[3].active_user.count))
                              : "0.0"
                          }

                          currency={
                            promotion.activities.init_currency.symbol
                              ? promotion.activities.init_currency.symbol
                              : ""
                          }

                          code={
                            promotion.activities.init_currency.code
                              ? promotion.activities.init_currency.code
                              : ""
                          }

                          level={3}
                        />
                      ) : (
                        <PromotionCard
                          style="main-color-2"
                          deposited={0}
                          registered={0}
                          withdrawn={0}
                          total={0}
                          active={0}
                          currency={""}
                          code={""}
                        />
                      )
                    ) : (
                      <PromotionCard
                        style="main-color-2"
                        deposited={0}
                        registered={0}
                        withdrawn={0}
                        total={"0.0"}
                        active={0}
                        currency={""}
                        code={""}
                      />
                    )
                  ) : (
                    <PromotionCard
                      style="main-color-2"
                      deposited={0}
                      registered={0}
                      withdrawn={0}
                      total={"0.0"}
                      active={0}
                      currency={""}
                      code={""}
                    />
                  )
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            <div className="mt-3 mb-3">
              <PromotionFC
                promotion={promotion !== null ? promotion : ""}
                activeButton={activeButton1}
              />
            </div>
            <br/>
            <br/>
            
          </div>

          <Footer
            activeButton={activeButton}
            setActiveButton={setActiveButton}
          />
        </div>
      ) : (
        navigate(`/${activeButton}`)
      )}
    </div>
  );
};

export default Promotion;
