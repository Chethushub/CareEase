import React from 'react';
import './Header.css';
import Icons from './images/Icons.png';
import down from './images/down_arrow.png';
import profile from './images/Profile_icon.png';
import search from './images/search.png';
import left from './images/left-arrow-circle-icon.png';

const Header = () => {
  return (
    <div className="header">
      <img src={left} alt="Left Arrow" className="left-image"/>
      <h2 style={{fontWeight: 'bolder', fontSize: '30px'}}>Dashboard</h2>
      <div className="header-actions">
        <input type="text" placeholder="Search" className="search-input" />
        <img src={Icons} alt="Icons"/>
        <div className="user-profile">
          <img src={profile} alt="Profile"/>
          <div style={{display: 'inline-block'}}>
            <span style={{fontWeight: 'bolder'}}>User Name</span>
            <br/>
            <span className="user-role">Admin</span>
          </div>
          <img src={down} alt="Down Arrow"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
