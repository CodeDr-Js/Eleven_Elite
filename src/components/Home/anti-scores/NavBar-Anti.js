import React from "react";
import NavBar_Logo from "../../NavBar/NavBar_Logo";
import Market from "../../../assets/images/0-statistics-of-inspection-results-48.png";
import "./index.css";
import IncentiveFund from "../../../assets/images/campus-3-16.png";
import "./index.css";
import ProtectivePlan from "../../../assets/images/eye-47.png";
import "./index.css";
import "../../largeScreen/largeHeader.css";

const NavBar_Anti = ({search, setSearch}) => {
  //console.log("searchNav-Anti", search);
  return (
    <div translate="no" className="fixed-top container main-color round-header pb-2">
      <NavBar_Logo search={search } setSearch={setSearch}  />
      <div className="d-flex g-main bg-transparent ">
        <div className="market-main-div bg-transparent">
          <div className="btn secondary-color market-div">
            <a href="" className="g-main-sp d-flex bg-transparent">
              <div className="me-1 ">
                <img
                  className="bg-transparent market-icon"
                  src={Market}
                  alt="market-logo"
                />
              </div>
              <div className=" g-main-sp bg-transparent fw-bold">Market</div>
            </a>
          </div>
        </div>

        <div className="market-main-div g-main-sp bg-transparent disabled ">
        <div className="position-absolute coming-soon-2"><p className="bg-transparent coming-soon-text-2">coming soon</p></div>
          <div className="btn transparent-color market-div border">
            <a href="" className="d-flex bg-transparent g-main-sp">
              <div className="me-1 bg-transparent">
                <img
                  className="bg-transparent market-icon"
                  src={IncentiveFund}
                  alt="IncentiveFund-logo"
                />
              </div>
              <div className="bg-transparent incensive-fund g-main-sp pe-3">
                Live
              </div>
            </a>
          </div>
        </div>

        <div className="market-main-div bg-transparent disabled">
          <div className="position-absolute coming-soon"><p className="bg-transparent coming-soon-text">coming soon</p></div>
          <div className="btn transparent-color market-div border">
            <a href="" className=" g-main-sp d-flex bg-transparent">
              <div className="me-1 bg-transparent">
                <img
                  className="bg-transparent market-icon"
                  src={ProtectivePlan}
                  alt="ProtectivePlan-logo"
                />
              </div>
              <div className=" g-main-sp bg-transparent incensive-fund">
                Finished
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar_Anti;
