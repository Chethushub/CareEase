import React from "react";
import "./billpayment.css";


const PaymentCard = () => (
    <div className="payment-card">
      <div className="payment-header">
        <div className="icon">
         <img src="./icons/success.svg" alt="" />
        </div>
        <h2>Payment success</h2>
        <p className="amount">435.00</p>
        <p className="date">12 May 2022 · Bill ID: #BILL00123</p>
      </div>
      <div className="payment-details">
        <div className="detail-item">
          <p>Treatment (2)</p>
          <p className="detail-price">300.00</p>
        </div>
        <div className="detail-item">
          <p>Component used (1)</p>
          <p className="detail-price">120.00</p>
        </div>
        <div className="detail-item">
          <p>Medicine (1)</p>
          <p className="detail-price">15.00</p>
        </div>
      </div>
      <div className="transaction-details">
        <div className="detail-item">
          <p>Amount paid</p>
          <p className="detail-price">435.00</p>
        </div>
        <div className="detail-item">
          <p>Change money</p>
          <p className="detail-price">0.00</p>
        </div>
        <div className="detail-item">
          <p>Payment method</p>
          <p className="detail-price">Cash</p>
        </div>
      </div>
      <div className="actions">
        <button className="calendar-button">Back to calendar</button>
        <button className="receipt-button">Print Receipt</button>
      </div>
    </div>
  );

export default PaymentCard;
