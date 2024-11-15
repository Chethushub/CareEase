import React, { useState } from "react";
import "./main.css";
import DetailsCard from "./billdetails";
import CashCard from "./billcash";
import PaymentCard from "./billpayment";
import BillCard from "./billcard";

const Main = () => {
  const [active, setActive] = useState(0);

  const openCard = (cardId) => {
    setActive(cardId);
  };

  const closeCard = () => {
    setActive(0);
  };

  return (
    <div>
      {active !== 0 && <div className="overlay" onClick={closeCard}></div>}

      <div className={active !== 0 ? "main blurred" : "main"}>
        <div className="main-head">
          <div className="revenue">
            <img className="revenue-img" src="./icons/revenue.svg" alt="Revenue" />
          </div>
          <div className="revenue-txt">
            <p className="txt txt1"> Revenue This month</p>
            <p className="txt txt2">
              <img className="r-rupee" src="./icons/rupee.svg" alt="" />
              <span>123456</span>
            </p>
          </div>
        </div>
        <div className="head-bill">
          <button className="bill-button">Bills</button>
          <button className="pr-button">Payment Recieved</button>
        </div>
        <div className="billpage">
            <div className="bill-header">
              <div className="search">
                <input type="text" placeholder="search" className="search-box" />
              </div>
              <div className="Export-button">
                <button className="export">
                  <img src="./icons/export.svg" alt="" />
                  Export
                </button>
              </div>
            </div>
          </div>
          <div className="table">
            <div className="table-head">
              <p>Reservation ID</p>
              <p>Patient Name</p>
              <p>Number of Bills</p>
              <p>Reservation Date</p>
              <p>Total Amount</p>
              <p>Payment </p>
              <img src="" alt="" />
              <img src="" alt="" />
            </div>
            <div className="table-content">
              <div className="table-col1">
                <p>#RSV001</p>
                <p>#RSV002</p>
                <p>#RSV003</p>
              </div>
              <div className="table-col2">
                <p>Albert Flores</p>
                <p>Esther Howard</p>
                <p>Kathryn Murphy</p>
              </div>
              <div className="table-col3">
                <p>0/2</p>
                <p>0/2</p>
                <p>0/2</p>
              </div>
              <div className="table-col4">
                <p>19/10/2024</p>
                <p>02/11/2024</p>
                <p>00/00/2024</p>
              </div>
              <div className="table-col5">
                <p>
                  <img className="r-rupee" src="./icons/rupee.svg" alt="" />
                  <span>2311</span>
                </p>
                <p>
                  <img className="r-rupee" src="./icons/rupee.svg" alt="" />
                  <span>535</span>
                </p>
                <p>
                  <img className="r-rupee" src="./icons/rupee.svg" alt="" />
                  <span>645</span>
                </p>
              </div>
              <div className="table-col6">
                <div className="bill-pp">
                  <p>PARTIALLY PAID</p>
                  <button onClick={() => openCard(1)} className="tbl-sp">
                    Set Payment
                  </button>
                </div>

                <div className="bill-pp">
                  <p>PARTIALLY PAID</p>
                  <button onClick={() => openCard(1)} className="tbl-sp">
                    Set Payment
                  </button>
                </div>
                <p>FULLY PAID</p>
              </div>
              <div className="table-col7">
                <p>
                  <button>
                    <img className="more" src="./icons/more.svg" alt="" />
                  </button>
                </p>
                <p>
                  <button>
                    <img className="more" src="./icons/more.svg" alt="" />
                  </button>
                </p>
                <p>
                  <button>
                    <img className="more" src="./icons/more.svg" alt="" />
                  </button>
                </p>
              </div>
              <div className="table-col8">
                <p>
                  <button>
                    <img src="./icons/down_arrow.svg" alt="" />
                  </button>
                </p>
                <p>
                  {" "}
                  <button>
                    <img src="./icons/down_arrow.svg" alt="" />
                  </button>
                </p>
                <p>
                  <button>
                    <img src="./icons/down_arrow.svg" alt="" />
                  </button>
                </p>
              </div>
            </div>
          </div>
      </div>

      {active !== 0 && (
        <div className="popup-container">
          {active === 1 && <BillCard goToCash={() => setActive(3)} goToDetails={() => setActive(2)} />}
          {active === 2 && <DetailsCard />}
          {active === 3 && <CashCard goToPayment={() => setActive(4)} />}
          {active === 4 && <PaymentCard />}
        </div>
      )}
    </div>
  );
};

export default Main;
