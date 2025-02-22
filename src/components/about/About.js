import React from "react";
import "./about.css";
import f1 from "../../assets/about/fli1.jpg";
import f2 from "../../assets/about/fli2.jpg";
import f3 from "../../assets/about/f3.jpeg";
import f4 from "../../assets/about/f4.jpeg";
import f5 from "../../assets/about/f5.jpeg";
import ArrowNav from "../arrowNav/ArrowNav";

const About = () => {
  return (
    <>
      <div className="fixed-top">
        <ArrowNav bg={"main-color"} name="About" />
      </div>

      <article className="container" style={{ marginTop: "85px" }}>
        <p className="fw-bold">R R T . C C  <span className="ms-3">F O O T B A L L</span> </p>

        <p>
          R R T . C C Football is a very popular reverse betting website that
          pays you to predict the final score of a football match. Punters have
          more than 96% chance of winning on the website. R R T . C C Football
          is a reverse betting website where you win a football match will not
          end when you predict the final score. For example, a punter may be
          asked to place a bet against the final score of a game between Arsenal
          and Spurs that ends at 0-0. If the game ends on a score other than
          0-0, the punter wins, giving the punter a more than 96% chance of
          winning.
        </p>

        <div>
          <div className=" rounded-4 mt-2 mb-3">
            <img className="rounded-4"  src={f1} alt="fliers" style={{ width: "100%" }} />
          </div>
          <p className="pb-4">
            <h3 className="fw-bold">R R T - C C </h3>

            <p>
              The co-operate reverse betting system with a sustainable development Goals
            </p>

            <p>
              Daily reward 2% - 2.5% daily
            </p>

            <h4 className="fw-bold">
              DETAILS
            </h4>

            <ul>
              <li>
                $2 welcome bonus
              </li>

              <li>
                $12 Min. Deposit
              </li>

              <li>
                $20 Min. Withdrawal
              </li>

              <li>
                $3 average betting
              </li>


              <li>
                6% withdrawal fee
              </li>
              <li>
                6 companies protected matches for withdrawal
              </li>

            </ul>

            <h4 className="fw-bold">
              CHARTS
            </h4>

            <p>
              <span className="text-danger fw-bold">Wrong guess</span> <span className="text-success fw-bold">wins</span>
            </p>

            <ul>
              <li>
                2 daily signals
              </li>
              <li>
                Rebates commission
              </li>
              <li>
                3 times deposit attracts bonuses
              </li>
              <li>
                Agent team build up attracts 5%
              </li>
            </ul>
            <ul>
              <li>
                5% of level 1 subordinates earnings
              </li>
              <li>
                3% of level 2 subordinates earnings
              </li>
              <li>
                1% of level 3 subordinates earnings
              </li>
            </ul>


            <p>Rebates and referrals are paid Tuesday's.</p>



          </p>
        </div>


        <div className=" rounded-4  mb-3">
            <img className="rounded-4"  src={f2} alt="fliers" style={{ width: "100%" }} />
          </div>
      



        <p className="">
        R R T . C C is a fully regulated gambling service licensed by National Lottery Regulatory Commission (NLRC) issued  No 14556533
          <br /><br />
          The R R T . C C team has united crypto-enthusiasts from all over the world. We are all bound up in the idea of developing crypto Gaming and do our best to serve you with a  smooth service.
          <br /><br />
          We are interested in creating a profitable and enjoyable gaming platform for everyone. Therefore, we take the maximum capability to develop a blockchain secured gaming system to provide a number of advantages: scaling of the platform, paltry commission, min bets and instant transactions.
          <br /><br />
          The R R T . C C group hopes to change the traditional sports and e-sports industry through blockchain technology, and constantly explore innovative game methods through the value application of digital currency round the globe
        </p>
      </article>
    </>
  );
};

export default About;
