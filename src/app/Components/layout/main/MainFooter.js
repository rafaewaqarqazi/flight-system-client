import React from 'react';
import {Link} from "react-router-dom";

const MainFooter = () => {
  return (
    <div className="kt-footer  kt-footer--extended  kt-grid__item" id="kt_footer"
         style={{backgroundImage: 'url(/media/bg/bg-2.jpg)'}}>
      <div className='kt-container'>
        <div className="kt-footer__bottom">
          <div >
            <div className="kt-footer__wrapper">
              <div className="kt-footer__logo">
                <div className="kt-footer__copyright">
                  {new Date().getFullYear()}&nbsp;&copy;&nbsp;
                  <Link to="/">Flights System Limited</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;