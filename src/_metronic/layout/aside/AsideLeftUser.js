import React from 'react';
import AsideMain from "./AsideMain";
import {List, ListItem} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const AsideLeftUser = ({open, setOpen}) => {
  return (
    <AsideMain open={open} setOpen={setOpen}>
      <List className="kt-menu__nav ">
        <NavLink to="/jobs/list" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className='kt-menu__link w-100'>
            <i className='kt-menu__link-icon fa fa-chart-bar'/>
            <span className="kt-menu__link-text">Jobs List</span>
          </ListItem>
        </NavLink>
        <NavLink to="/jobs/applied" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-briefcase'/>
            <span className="kt-menu__link-text">Jobs Applied</span>
          </ListItem>
        </NavLink>
        <NavLink to="/interviews" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-handshake'/>
            <span className="kt-menu__link-text">Interviews</span>
          </ListItem>
        </NavLink>
        <NavLink to="/tests" activeClassName='kt-menu__item--active' className="kt-menu__item">
          <ListItem className="kt-menu__link w-100" >
            <i className='kt-menu__link-icon fa fa-check-double'/>
            <span className="kt-menu__link-text">Tests</span>
          </ListItem>
        </NavLink>
      </List>
    </AsideMain>
  );
};

export default AsideLeftUser;