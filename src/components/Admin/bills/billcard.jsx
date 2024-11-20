import React, { useState } from "react";
import "./BillCard.css";


const BillCard = ({goToCash,goToDetails }) =>(
    <div>
      <div className="bill-card">
        <div className="bill-header">
          <div className="header1">
            <p className="id">BILL ID</p>
            <h3>#BILL00124</h3>
          </div>
          <div className="header2">
            <button className="history-comment">
              <img src="./icons/comment.svg" alt="icon" />
              History & comment
            </button>
            <button className="menu">
              <img src="./icons/sleeping_menu.svg" alt="Menu icon" />
            </button>
            <button className="close">
              <img src="./icons/close.svg" alt="Close icon" />
            </button>
          </div>
        </div>

        <div className="account-selection">
          <p>Select Account:</p>
          <select name="account" id="account">
            <option value="free-cash">Free cash</option>
            <option value="drug-purchase">Drug Purchase</option>
            <option value="treatment-fund">Treatment Fund</option>
            <option value="stock-fund">Stock Fund</option>
          </select>
        </div>

        <div className="bill-info">
          <div className="bill-to">
            <p className="bill-info-head">Bill to</p>
            <h4>Esther Howard</h4>
            <p className="bill-info-adrs">
              Jl. PuloRaya X No.14, Kebayoran Baru, Jakarta Selatan 12110
            </p>
          </div>
          <div className="bill-date">
            <p className="bill-date-head">Bill Date</p>
            <p>12/06/2022</p>
            <span className="status unpaid">UNPAID</span>
          </div>
        </div>

        <div className="bill-items">
          <div className="bill-items-head">
            <span className="bill-name-head">Bill Name</span>
            <span className="amount">Amount</span>
          </div>
          <div className="biil-box">
            <div className="item">
              <span className="bill-name">Treatment (2)</span>
              <span className="item-amount">
                <img className="rupee" src="./icons/rupee.svg" alt="" />
                300.00
              </span>
            </div>
            <div className="item">
              <span className="bill-name">Component used (1)</span>
              <span className="item-amount">
                <img className="rupee" src="./icons/rupee.svg" alt="" />
                120.00
              </span>
            </div>
            <div className="item medicine">
              <span className="bill-name">Medicine (1)</span>
              <button onClick={goToDetails} className="view-details">
                View Details
              </button>
              <span className="item-amount">
                <img className="rupee" src="./icons/rupee.svg" alt="" />
                15.00
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="note">
            <p>Add Note</p>
            <span>(optional)</span>
          </div>
          <textarea className="txt-box" placeholder="Type a Message"></textarea>
        </div>

        <div className="bill-totals">
          <div className="total-line">
            <span className="total-line-txt">Subtotal</span>
            <span>
              <img className="rupee" src="./icons/rupee.svg" alt="" />
              435.00
            </span>
          </div>
          <div className="total-line">
            <span className="total-line-txt">Tax</span>
            <span>
              <img className="rupee" src="./icons/rupee.svg" alt="" />
              0.00
            </span>
          </div>
          <div className="total-line grand-total">
            <span>Total</span>
            <span>
              <img className="rupee" src="./icons/rupee.svg" alt="" />
              435.00
            </span>
          </div>
        </div>
        <p className="secure-txt">
          <img src="./icons/secure.svg" alt="secure" />
          All your transactions are secure and fast
        </p>
        <div className="payment-method">
          <p>Select a payment method</p>
          <button className="payment-option" onClick={goToCash}> Cash</button>
          <button className="payment-option"> Credit card</button>
        </div>
      </div>
    </div>
  );

export default BillCard;
