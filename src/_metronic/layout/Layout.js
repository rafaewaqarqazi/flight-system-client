import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import objectPath from "object-path";
import Header from "./header/Header";
import {Link, withRouter} from "react-router-dom";
import HeaderMobile from "./header/HeaderMobile";
import AsideLeft from "./aside/AsideLeftAdmin";
import ScrollTop from "../../app/partials/layout/ScrollTop";
import HTMLClassService from "./HTMLClassService";
import LayoutConfig from "./LayoutConfig";
import MenuConfig from "./MenuConfig";
import LayoutInitializer from "./LayoutInitializer";
import KtContent from "./KtContent";
import "./assets/Base.scss";
import '../../_metronic/_assets/sass/global/layout/header/skins/base/light.scss'
import '../../_metronic/_assets/sass/global/layout/header/skins/menu/light.scss'
import '../../_metronic/_assets/sass/global/layout/brand/skins/dark.scss'
import '../../_metronic/_assets/sass/global/layout/aside/skins/dark.scss'
import clsx from "clsx";
import Hidden from "@material-ui/core/Hidden";
import {useLayoutStyles} from "../../utils/material-styles/layoutStyles";
import {Alert} from "react-bootstrap";
import io from "socket.io-client";
import * as chat from "../../app/store/ducks/chat.duck";
const htmlClassService = new HTMLClassService();

function Layout({children, layoutConfig, history, addChats, chat, user, socket, setSocket}) {
  useEffect(() => {
    if (user) {
      setSocket(io('localhost:3001'))
    }
  }, [user])
  useEffect(() => {
    if (socket) {
      socket.emit('get-chats', {userId: user._id}, (result) => {
        console.log('chats', result)
        if (result.length > 0) {
          socket.emit('join-room', {roomId: result.map(r => r._id)})
          addChats(result)
        }
      })
      socket.on('room-created', (data) => {
        if (data.users.filter(u => u._id === user._id).length > 0){
          console.log('room-created', data)
          socket.emit('get-chats', {userId: user._id}, (result) => {
            console.log('chats', result)
            if (result.length > 0) {
              socket.emit('join-room', {roomId: result.map(r => r._id)})
              addChats(result)
            }
          })
        }
      })
    }
  }, [socket])
  const classes = useLayoutStyles();
  const [open, setOpen] = useState(true)
  const [show, setShow] = useState(true);
  htmlClassService.setConfig(layoutConfig);
  // scroll to top after location changes
  window.scrollTo(0, 0);

  const handleClose = () => setShow(false)
  return (
    <LayoutInitializer
      styles={[]}
      menuConfig={MenuConfig}
      layoutConfig={LayoutConfig}
      htmlClassService={htmlClassService}
    >
      {/* <!-- begin:: Header Mobile --> */}
      <HeaderMobile />
      {/* <!-- end:: Header Mobile --> */}

      <div
        className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed "
        style={{background: '#f2f3f8', backgroundImage: 'url(/media/bg/bg-9.jpg)', backgroundSize: '100% 470px', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}
      >
        {/* <!-- begin::Body --> */}
        <HeaderMobile />
        <div className="d-flex kt-wrapper">
          <Hidden xsDown>
            <AsideLeft open={open} setOpen={setOpen}/>
          </Hidden>
          <div className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            [classes.appBarShiftLeft]: !open
          })}>
            <Header />

          </div>


          <main className={clsx(classes.content, classes.contentShift)}>
            <div className='container-md'>
              {
                user.role === '2' && history.location.pathname !== '/account' ?
                  user.lawyer_details ?
                    (user.lawyer_details.lawSchool === '' || user.lawyer_details.bio === '' || user.lawyer_details.practiceAreas.length === 0) &&
                <Alert show={show} variant="warning" onClose={handleClose} dismissible>
                  Please Complete your profile for better results
                  <Link to='/account' className='ml-2'> complete now!</Link>
                </Alert>
                    : <Alert show={show} variant="warning" onClose={handleClose} dismissible>
                      Please Complete your profile for better results
                      <Link to='/account' className='ml-2'> complete now!</Link>
                    </Alert>
                  : null
              }
              {children}
            </div>
          </main>
        </div>

        {/* <!-- end:: Body --> */}
      </div>
      <ScrollTop />
    </LayoutInitializer>
  )
}

const mapStateToProps = ({ builder: { layoutConfig }, auth: { user }, chat }) => ({
  user,
  chat,
  socket: chat.socket,
  layoutConfig,
  selfLayout: objectPath.get(layoutConfig, "self.layout"),
  asideDisplay: objectPath.get(layoutConfig, "aside.self.display")
});

export default withRouter(connect(mapStateToProps, chat.actions)(Layout));
