/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import {connect, useSelector} from "react-redux";
import {toAbsoluteUrl} from "../../../_metronic";
import HeaderDropdownToggle from "../content/CustomDropdowns/HeaderDropdownToggle";

function UserProfile(props) {
  // const {user} = props;
  const {chat, user} = useSelector(
    ({chat, auth: {user}}) => ({
      chat,
      user
    })
  );
  const [unseen, setUnseen] = useState(false)
  const unseenMsg = (chatList) => {
    let bool = false
    chatList.map(list => {
      list.messages.map(msg => {
        if (msg.receiver?._id === user._id && !msg.seen) {
          bool = true
        }
      })
    })
    return bool
  }
  useEffect(() => {
    if (unseenMsg(chat.chatList)) {
      setUnseen(true)
    } else {
      setUnseen(false)
    }
  }, [chat])
  return (
    <>

        <div className='d-flex align-items-center justify-content-center mr-3 '>
          <div className='position-relative'>
            <Link to='/chat'>
              <i className="fa fa-comment kt-icon-lg"/>
            </Link>
            {
              unseen && <i className='fa fa-dot-circle kt-icon-sm text-danger position-absolute' style={{top: -10, right: -5}}/>
            }
          </div>

        </div>



      <Dropdown
        className="kt-header__topbar-item kt-header__topbar-item--user"
        drop="down"
        alignRight
      >
        <Dropdown.Toggle
          as={HeaderDropdownToggle}
          id="dropdown-toggle-user-profile"
        >
          <div
            className="kt-header__topbar-wrapper"
            data-toggle="dropdown"
            data-offset="10px,0px"
          >
            <div className='kt-header__topbar-user'>
              <span className="kt-header__topbar-welcome kt-hidden-mobile">
                Hi,
              </span>
              <span className="kt-header__topbar-username kt-hidden-mobile">
                {user.firstName}
              </span>

              {
                user.profileImage && user.profileImage.filename ?
                  <img alt="Pic" src={`/images/${user.profileImage.filename}`}/>
                  : <span
                    className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bold">
                    <b>{user && user.firstName[0]}</b>
                  </span>
              }
            </div>
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
          {/** ClassName should be 'dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
          <div
            className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
            style={{
              backgroundImage: `url(${toAbsoluteUrl("/media/misc/bg-1.jpg")})`
            }}
          >
            <div className="kt-user-card__avatar">
              {
                user.profileImage && user.profileImage.filename ?
                  <img alt="Pic" src={`/images/${user.profileImage.filename}`}/>
                  : <span className="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">
                {user && user.firstName[0]}
              </span>
              }

            </div>
            <div className="kt-user-card__name">{user.firstName}</div>
          </div>
          <div className="kt-notification">
            <Link to={'/account'} className="kt-notification__item">
              <div className="kt-notification__item-icon">
                <i className="flaticon2-calendar-3 kt-font-success"/>
              </div>
              <div className="kt-notification__item-details">
                <div className="kt-notification__item-title kt-font-bold">
                  My Profile
                </div>
                <div className="kt-notification__item-time">
                  Account settings and more
                </div>
              </div>
            </Link>
            <div className="kt-notification__custom">
              <Link
                to="/logout"
                className="btn btn-label-brand btn-sm btn-bold"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
  user
});

export default connect(mapStateToProps)(UserProfile);
