import React from 'react';
import './PtHeader.css';

const Header = ({title}) => {
  return (
    <div className="header">
      {/* <img src="./icons/left-arrow-circle-icon.svg" alt="Left Arrow" className="left-image"/> */}
      <h2 style={{padding: "2px 6px 2px 12px" ,fontWeight: 'bold', fontSize: '26px'}}>{title}</h2>
      <div className="header-actions">
        <input type="text" placeholder="Search" className="search-input" />
        <img src="./icons/bell.svg" alt="Icons"/>
        <div className="user-profile">
          <img src="./icons/Profile_icon.svg" alt="Profile"/>
          <div style={{display: 'inline-block'}}>
            <span style={{fontWeight: 'bolder'}}>User Name</span>
            <br/>
            <span className="user-role">Patient</span>
          </div>
          <img src="./icons/down_arrow.svg" alt="Down Arrow"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
