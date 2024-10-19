import React from 'react';
import './Header.css';

const Header = ({title}) => {
  return (
    <div className="header">
      <img src="/src/public/icons/left-arrow-circle-icon.svg" alt="Left Arrow" className="left-image"/>
      <h2 style={{fontWeight: 'bolder', fontSize: '30px'}}>{title}</h2>
      <div className="header-actions">
        <input type="text" placeholder="Search" className="search-input" />
        <img src="/src/public/icons/Icons.svg" alt="Icons"/>
        <div className="user-profile">
          <img src="/src/public/icons/Profile_icon.svg" alt="Profile"/>
          <div style={{display: 'inline-block'}}>
            <span style={{fontWeight: 'bolder'}}>User Name</span>
            <br/>
            <span className="user-role">Admin</span>
          </div>
          <img src="/src/public/icons/down_arrow.svg" alt="Down Arrow"/>
        </div>
      </div>
    </div>
  );
};

export default Header;
