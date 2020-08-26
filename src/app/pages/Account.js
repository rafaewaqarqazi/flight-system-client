import React, {useState} from 'react';
import {connect} from "react-redux";
import AccountAside from "../Components/account/AccountAside";
import AccountContent from "../Components/account/AccountContent";

const Account = () => {
  const [selected, setSelected] = useState(0)
  return (
    <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
      <div className="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app">
        {/*Aside Started*/}
        <AccountAside selected={selected} setSelected={setSelected}/>
        {/* Content */}
        <AccountContent selected={selected}/>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({
  user
})
export default connect(mapStateToProps)(Account);