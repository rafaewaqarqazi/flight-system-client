/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {connect} from "react-redux";
import objectPath from "object-path";
import {withRouter} from "react-router-dom";
import * as builder from "../../ducks/builder";
import {LayoutContextConsumer, useLayoutContext} from "../LayoutContext";
import BreadCrumbs from "./components/BreadCrumbs";

const SubHeader = ({subheaderCssClasses, subheaderContainerCssClasses, subheaderMobileToggle}) => {
  const { subheader: { title } } = useLayoutContext();
  console.log('title', title)
  return (
    <div
      className='kt-subheader  kt-grid__item'
    >
      <div className={`kt-container ${subheaderContainerCssClasses}`}>
        <div className="kt-subheader__main">
          <LayoutContextConsumer>
            {({subheader: {title, breadcrumb}}) => (
              <>
                <h3 className="kt-subheader__title">
                  {subheaderMobileToggle && (
                    <button
                      className="kt-subheader__mobile-toggle kt-subheader__mobile-toggle--left"
                      id="kt_subheader_mobile_toggle"
                    >
                      <span/>
                    </button>
                  )}
                  {title}
                </h3>
                <BreadCrumbs items={breadcrumb}/>
              </>
            )}
          </LayoutContextConsumer>
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = store => ({
  subheaderCssClasses: builder.selectors.getClasses(store, {
    path: "subheader",
    toString: true
  }),
  subheaderContainerCssClasses: builder.selectors.getClasses(store, {
    path: "subheader_container",
    toString: true
  }),
  config: store.builder.layoutConfig,
  menuConfig: store.builder.menuConfig,
  subheaderMobileToggle: objectPath.get(
    store.builder.layoutConfig,
    "subheader.mobile-toggle"
  )
});

export default withRouter(connect(mapStateToProps)(SubHeader));
