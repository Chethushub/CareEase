import React from "react";
import "./mainContent.css";

const MainContent = () => {
  return (
    <div className="pa-main-content">
      <div className="box filters">Filters</div>
      <div className="box box2">
        <div className="categories">CATEGORIES</div>
        <div className="doctors">
          <img src="./icons/left-arrow.svg" alt="left arrow" /> <p>Doctors</p>
        </div>
      </div>
      <div className="box box3">
        <div className="hospital">Hospital</div>
        <div className="down-arrow">
          <img src="./icons/down_arrow.svg" alt="down arrow" />
        </div>
      </div>
      <div className="box box4">
        <div className="availability">Availability</div>
        <div className="down-arrow">
          <img src="./icons/down_arrow.svg" alt="down arrow" />
        </div>
      </div>
      <div className="box box5">
        <div className="fees">Fees</div>
        <div className="down-arrow">
          <img src="./icons/down_arrow.svg" alt="down arrow" />
        </div>
      </div>
      <div className="box box6">
        <div className="experience">Experience</div>
        <div className="down-arrow">
          <img src="./icons/down_arrow.svg" alt="down arrow" />
        </div>
      </div>
      <div className="box box7">
        <div className="gender">Gender</div>
        <div className="down-arrow">
          <img src="./icons/down_arrow.svg" alt="down arrow" />
        </div>
      </div>
      <div className="box box8">
        <div className="language">Language</div>
        <div className="down-arrow">
          <img src="./icons/down_arrow.svg" alt="down arrow" />
        </div>
      </div>
      <div className="box box9">
        <div className="sort-by">Sort By</div>
        <div className="down-arrow">
          <img src="./icons/down_arrow.svg" alt="down arrow" />
        </div>
      </div>
    </div>
  );
};
export default MainContent;

