import React from "react";
import "./billdetails.css";


const Details = () => (
    <div className="details">
      <div className="header">
        <p>Bill Details</p>
        <img className="right" src="./icons/right-arrow.svg" alt="right" />
      </div>
      <div className="box1">
        <div className="treatment">
          <div className="treatment-head">
            <img
              className="bill-treatment"
              src="./icons/bill-treatment.svg"
              alt="treatment"
            />
            <p>Treatment(2)</p>
          </div>
          <div className="trtmnt-tot">
            <p>Total:</p>
            <img className="rupee" src="./icons/rupee.svg" alt="" />
            <p> 300.00</p>
          </div>
        </div>
        <div className="box1-part1">
          <div className="box1-part1-tf">
            <p className="tf-txt1">Tooth Filling</p>
            <p className="tf-txt2">2nd molar (18),3rd molar(17)</p>
          </div>
          <div className="box1-part1-amt">
            <img className="rupee" src="./icons/rupee.svg" alt="" />
            220.00
          </div>
        </div>
        <div className="box1-part2">
          <div className="box1-part2-tc">
            <p className="tc-txt1">Tooth Cleaning</p>
            <p className="tc-txt2">Maxilla, Mandible</p>
          </div>
          <div className="box1-part2-amt">
            <img className="rupee" src="./icons/rupee.svg" alt="" />
            <p>80.00</p>
          </div>
        </div>
      </div>
      <div className="box2">
        <div className="box2-head">
          <div className="box2-head-txt">
            <img
              className="component"
              src="./icons/component.svg"
              alt="component"
            />
            <p>Component used (2)</p>
          </div>
          <div className="box2-head-amt">
            <p>Total: </p>
            <img className="rupee" src="./icons/rupee.svg" alt="" />
            <p> 120.00</p>
          </div>
        </div>
        <div className="box2-anesthetic">
          <p className="an-txt1">Anesthetic(1)</p>
          <p className="an-txt2">Include in service</p>
        </div>
        <div className="box2-cp">
          <div className="box2-cp-txt">
            <p> Composite Porseline(5)</p>
          </div>
          <div className="box2-cp-amt">
            <img className="rupee" src="./icons/rupee.svg" alt="" />
            <p> 120.00</p>
          </div>
        </div>
      </div>
      <div className="box3">
        <div className="box3-head">
          <div className="box3-head-txt">
            <img
              className="medicine"
              src="./icons/medicine.svg"
              alt="medicine"
            />
            <p>Medicine(1)</p>
          </div>

          <div className="box3-head-amt">
            <p>Total:</p>
            <img className="rupee" src="./icons/rupee.svg" alt="" />
            <p>15.00</p>
          </div>
        </div>

        <div className="box3-content">
          <div className="box3-txt">
            <p className="box3-txt-txt1">Asam Menefamat(1)</p>
            <p className="box3-txt-txt2">Paid Medicine</p>
          </div>
          <div className="box3-amt">
            <p>
              <img className="rupee" src="./icons/rupee.svg" alt="" />
            </p>
            <p> 15.00 </p>
          </div>
        </div>
      </div>
    </div>
  );
export default Details;
