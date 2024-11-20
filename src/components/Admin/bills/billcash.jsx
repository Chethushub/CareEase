import React from "react";
import "./billcash.css";


const Cash = ({goToPayment}) =>  (
  
    <div className="cash">
      <div className="header">
        <p>Cash</p>
        <button><img src="./icons/right-arrow.svg" alt="right arrow" /></button>
      </div>
      <div className="body">
        <div className="cash-tp">
          <h5>Total Payment</h5>
          <h5 className="cash-tp-amt">
            <img className="cash-rupee" src="./icons/rupee.svg" alt="" /> <p>435.00</p>
          </h5>
        </div>
        <div className="cash-amt">
          <div className="cash-txt">
            <p>Cash</p>
          </div>
          <div className="ipt-amt">
            <p>Input Amount</p>
            <input className="ent-amt" type="amount" />
          </div>
          <div className="smp-amt">
            <button>
              <img className="cash-rupee" src="./icons/rupee.svg" alt="" />
              30.00
            </button>
            <button>
              <img className="cash-rupee" src="./icons/rupee.svg" alt="" />
              50.00
            </button>
            <button>
              <img className="cash-rupee" src="./icons/rupee.svg" alt="" />
              20.00
            </button>
            <button>
              <img className="cash-rupee" src="./icons/rupee.svg" alt="" />
              100.00
            </button>
          </div>
        </div>
      </div>
      <div className="foot">
        <button className="playbutton" onClick={goToPayment}>Pay</button>
      </div>
    </div>
  );

export default Cash;
