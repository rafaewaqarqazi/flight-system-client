import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import * as builder from "../../ducks/builder";
import {NavLink} from "react-router-dom";
import {List, ListItem} from '@material-ui/core'
import AsideMain from "./AsideMain";

function AsideLeftAdmin({open, setOpen}) {
  const { chat, user } = useSelector(
    ({ chat, auth: { user } }) => ({
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
    <AsideMain open={open} setOpen={setOpen}>
      <List className="kt-menu__nav ">
        <NavLink to="/dashboard" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className='kt-menu__link w-100'>
            <i className='kt-menu__link-icon fa fa-chart-bar'/>
            <span className="kt-menu__link-text">Dashboard</span>
          </ListItem>
        </NavLink>
        <NavLink to="/cases" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-briefcase'/>
            <span className="kt-menu__link-text">Cases</span>
          </ListItem>
        </NavLink>
        <NavLink to="/clients" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-users'/>
            <span className="kt-menu__link-text">Clients</span>
          </ListItem>
        </NavLink>
        <NavLink to="/chat" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-comment'/>
            <span className="kt-menu__link-text">Messages</span>
            {
              unseen && <i className='fa fa-dot-circle text-danger'/>
            }

          </ListItem>
        </NavLink>
      </List>
    </AsideMain>
  );
}

const mapStateToProps = store => ({
  disableAsideSelfDisplay:
    builder.selectors.getConfig(store, "aside.self.display") === false,
  asideClassesFromConfig: builder.selectors.getClasses(store, {
    path: "aside",
    toString: true
  }),
  menuCanvasOptions: {
    baseClass: "kt-aside",
    overlay: true,
    closeBy: "kt_aside_close_btn",
    toggleBy: {
      target: "kt_aside_mobile_toggler",
      state: "kt-header-mobile__toolbar-toggler--active"
    }
  }
});

export default connect(mapStateToProps)(AsideLeftAdmin);
