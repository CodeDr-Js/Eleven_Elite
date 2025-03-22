import React, { useContext, useEffect, useState } from 'react';
import LeaderCard from './LeaderCard';
import LeaderFC from './LeaderFC';
import ArrowNav from '../arrowNav/ArrowNav';
import { DataContext } from '../APIs/Api';
import Cookies from "js-cookie";
import Loader from '../loader/loader';
import { useNavigate } from 'react-router-dom';
import { API } from '../api-service/api-service';

function Leaders() {
     const navigate = useNavigate();
    const { setActiveToken, setPromotion, promotion,setResult } = useContext(DataContext);
    const token = Cookies.get("auth-token");
      const [loadings, setLoadings] = useState(false);


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
              //console.log("Promotion is :", result);
              if (result.success || result.message === "Success") {
                setResult(result);
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
  return (
    <div>
          <div className="fixed-top">
                    <ArrowNav name="Leader" bg="main-color" />
                  </div>
                  {loadings ? <Loader /> : ""}

        <div className='mt-5 pt-4 container'>
        {/* <LeaderCard 
        style="vip-gold"
        deposited={
            promotion.activities.teams_dir.leaders_bonus
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
              .gen_withdraw
              ? Number(promotion.activities.teams_dir
                  .generation_track[1].gen_withdraw.amount).toFixed(2)
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


        /> */}

{promotion !== null ? (
                  promotion.activities.teams_dir ? (
                    promotion.activities.teams_dir.leaders_bonus
                    ? (
                      promotion.activities.teams_dir.leaders_bonus
                      ? (
                        <LeaderCard
                          style="vip-gold"
                          deposited={
                            promotion.activities.teams_dir.leaders_bonus
                              .frozen_amount
                              ? Number(promotion.activities.teams_dir
                                  .leaders_bonus.frozen_amount).toFixed(2)
                              : "0.0"
                          }
                          registered={
                            promotion.activities.teams_dir.leaders_bonus
                              .total_users_required
                              ? promotion.activities.teams_dir
                                  .leaders_bonus.total_users_required
                              : "0"
                          }
                          
                          total={
                            promotion.activities.teams_dir.leaders_bonus.total_withdrawn
                              ? Math.floor(Number(promotion.activities.teams_dir
                                  .leaders_bonus.total_withdrawn))
                              : "0.0"
                          }

                          active={
                            promotion.activities.teams_dir.leaders_bonus.total_active
                              ? Math.floor(Number(promotion.activities.teams_dir
                                  .leaders_bonus.total_active))
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

                        
                        />
                      ) : (
                        <LeaderCard
                          style="vip-gold"
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
                      <LeaderCard
                        style="vip-gold"
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
                    <LeaderCard
                        style="vip-gold"
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

        <div className='container mt'>

        <LeaderFC promotion={promotion !== null ? promotion : ""}/>
        </div>

    </div>
  )
}

export default Leaders